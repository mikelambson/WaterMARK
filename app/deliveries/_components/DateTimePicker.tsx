import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
  import { REGEXP_ONLY_DIGITS } from "input-otp"
  

interface DateTimePickerProps {
    className?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({className}) => {
    // Add your component logic here

    return (
        <InputOTP
            className={className}
            maxLength={4}
            pattern={REGEXP_ONLY_DIGITS}
            render={({ slots }) => (
                <>
                <InputOTPGroup>
                    {slots.slice(0, 2).map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} />
                    ))}{" "}
                </InputOTPGroup>
                :
                <InputOTPGroup>
                    {slots.slice(2).map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} />
                    ))}
                </InputOTPGroup>
                </>
            )}
            />

    );
};

export default DateTimePicker;