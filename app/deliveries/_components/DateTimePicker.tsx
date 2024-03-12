import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  import { REGEXP_ONLY_DIGITS } from "input-otp"
  

interface DateTimePickerProps {
    className?: string;
    inputClassName?: string;
    gap?: number;
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

export default TimePicker;