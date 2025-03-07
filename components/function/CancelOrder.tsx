import { useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PropertiesTypes {
    disabled?: boolean;
    orderId?: string;
    orderNumber?: number;
}

const CancelOrder: React.FC<PropertiesTypes> = ({ disabled = false, orderId, orderNumber }: PropertiesTypes) => {
    
    const classchange = disabled ? "bg-destructive/30 text-foreground/50 select-none" : "";

    const [isContinuePressed, setIsContinuePressed] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleContinueClick = () => {
        setIsContinuePressed(true);
    };

    const handleSheetClose = () => {
        if (inputValue.trim() !== '') {
            // Proceed with closing the sheet or any other action
            // For now, let's just log a message
            console.log('Closing sheet...');
        } else {
            // Prevent the close action
            // console.log('Input is empty. Close action prevented.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Set inputValue only when at least three characters are entered
        if (e.target.value.length >= 3) {
            setInputValue(e.target.value);
        } else {
            // Clear inputValue if less than three characters are entered
            setInputValue('');
        }
    };

    const isInputEmpty = inputValue.trim() === '';

    return ( 
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"destructive"} disabled={disabled} className={`${classchange}`}>Cancel Order</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action will permanently cancel this order from the schedule. <br />
                    This action cannot be undone. <br />
                    <br />
                    <span className=" text-card-alternative font-semibold">OrderId:</span> <span className="font-semibold italic">{orderId}</span><br />
                    <span className=" text-card-alternative font-semibold">OrderNumber:</span> <span className="font-extrabold">{orderNumber}</span><br />
                    <br />
                    <span className="pl-3 italic">Cancelation Reason:</span>
                    <Input
                        placeholder="(required)"
                        className="mt-1 text-card-alternative"
                        required={isContinuePressed}
                        onChange={handleChange}
                    />
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Back</AlertDialogCancel>
                <AlertDialogAction
                        className="border border-destructive bg-destructive text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive hover:font-semibold"
                        asChild
                        onClick={handleContinueClick}
                    >
                        <SheetClose disabled={isInputEmpty} onClick={handleSheetClose}>Continue</SheetClose>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
     );
}
 
export default CancelOrder;