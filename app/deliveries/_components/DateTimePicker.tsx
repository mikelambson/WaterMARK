import React from "react";

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
}

export const DatePicker: React.FC<DateTimePickerProps> = ({className, inputClassName, gap}) => {
    const [date, setDate] = React.useState<Date>()
 
  return (
        <Popover>
        <PopoverTrigger asChild>
            <Button
            variant={"outline"}
            className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
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

export const TimePicker: React.FC<DateTimePickerProps> = ({className, inputClassName, gap}) => {
    // Add your component logic here

    return (
        <div className={`flex items-center gap-${gap}`}>
            <div className={`inline-flex items-center gap-${gap}`}>
                <p className="">Time:</p> 
                <InputOTP
                    className={`inline-flex items-center gap-[${gap ? gap/2 : 1}]`}
                    maxLength={4}
                    pattern={REGEXP_ONLY_DIGITS}
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