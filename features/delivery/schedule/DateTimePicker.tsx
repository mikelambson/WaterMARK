import React, { ChangeEvent, useEffect, useState } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/GeneralUtils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

  

interface DateTimePickerProps {
    className?: string;
    inputClassName?: string;
    gap?: number;
    defaultDate?: boolean | Date;
    defaultTime?: boolean | string;
    onChange?: (value: string) => void;
}

export const DatePicker: React.FC<DateTimePickerProps> = ({className, defaultDate}) => {
    const [date, setDate] = React.useState<Date>();

    useEffect(() => { 
        let isMounted = true;
        const enteredDate = typeof defaultDate === "string" ? new Date(defaultDate) : new Date();
        const defaultDateValue = defaultDate ? new Date(enteredDate) : "";

        if (isMounted) { 
            setDate(defaultDateValue as Date); 
        }

        return () => { 
            isMounted = false; 
        };

    }, [defaultDate]);

  return (
        <Popover>
        <PopoverTrigger asChild>
            <Button
            variant={"outline"}
            className={cn(
                "w-[280px] justify-start text-left font-semibold text-md",
                !date && "text-muted-foreground", className
            )}
            >
            <CalendarIcon className="mr-2 h-4 w-4 " />
                <span className="text-yellow-700">
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </span>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
            <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            />
        </PopoverContent>
        </Popover>
    );
}

export const TimePicker: React.FC<DateTimePickerProps> = ({className, inputClassName, gap, defaultTime, onChange}) => {
    const resolvedInputClassName = inputClassName || "w-8 h-8 text-xl text-yellow-700 font-bold";
    const currentTime = new Date();
    const initialTime = defaultTime
        ? `${currentTime.getHours().toString().padStart(2, "0")}${currentTime.getMinutes().toString().padStart(2, "0")}`
        : "";

    const [time, setTime] = useState(initialTime); // State to track the selected time

    // Notify parent of initial time on mount
    useEffect(() => {
        if (onChange) {
        onChange(initialTime); // Send initial value to the parent
        }
    }, [initialTime]);

    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = event.target.value;
        setTime(newTime);
        if (onChange) {
        onChange(newTime); // Notify the parent component of the time change
        }
    };

    return (
        <div className={`flex items-center gap-${gap}`}>
            <div className={`inline-flex items-center gap-${gap}`}>
                <p className="">Time:</p> 
                <InputOTP
                    className={cn(`inline-flex items-center text-yellow-700 font-bold gap-[${gap ? gap/2 : 1}]`, className)}
                    maxLength={4}
                    pattern={REGEXP_ONLY_DIGITS}
                    value={time}
                    onChange={(newValue: string) => handleTimeChange({ target: { value: newValue } } as ChangeEvent<HTMLInputElement>)}
                    render={({ slots }) => (
                        <>
                        <InputOTPGroup>
                            {slots.slice(0, 2).map((slot, index) => (
                            <InputOTPSlot className={resolvedInputClassName} key={index} {...slot} />
                            ))}
                        </InputOTPGroup>
                        <span className="text-xl text-foreground px-1">:</span>
                        <InputOTPGroup>
                            {slots.slice(2).map((slot, index) => (
                            <InputOTPSlot className={resolvedInputClassName} key={index} {...slot} />
                            ))}
                        </InputOTPGroup>
                        </>
                    )}
                />
            </div>
        </div>
    );
};

