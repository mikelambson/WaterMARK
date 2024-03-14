import React, { ChangeEvent, useEffect, useState } from "react";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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

    const enteredDate = typeof defaultDate === "string" ? new Date(defaultDate) : new Date();
    const defaultDateValue = defaultDate ? new Date(enteredDate) : "";
    
    const [date, setDate] = React.useState<Date>();
    useEffect(() => { 
        if (defaultDate) setDate(defaultDateValue as Date);
    }, [defaultDateValue]);

  return (
        <Popover>
        <PopoverTrigger asChild>
            <Button
            variant={"outline"}
            className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground", className
            )}
            >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
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
    const [time, setTime] = useState(defaultTime || ''); // State to track the selected time


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
                    className={cn(`inline-flex items-center gap-[${gap ? gap/2 : 1}]`, className)}
                    maxLength={4}
                    pattern={REGEXP_ONLY_DIGITS}
                    onChange={(newValue: string) => handleTimeChange({ target: { value: newValue } } as ChangeEvent<HTMLInputElement>)}
                    render={({ slots }) => (
                        <>
                        <InputOTPGroup>
                            {slots.slice(0, 2).map((slot, index) => (
                            <InputOTPSlot className={inputClassName} key={index} {...slot} />
                            ))}
                        </InputOTPGroup>
                        <span className="text-2xl">:</span>
                        <InputOTPGroup>
                            {slots.slice(2).map((slot, index) => (
                            <InputOTPSlot className={inputClassName} key={index} {...slot} />
                            ))}
                        </InputOTPGroup>
                        </>
                    )}
                />
            </div>
        </div>
    );
};

export default {DatePicker, TimePicker};