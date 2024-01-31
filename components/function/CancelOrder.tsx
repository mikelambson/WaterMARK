import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface PropertiesTypes {
    disabled?: boolean;
    orderId?: String;
}

const CancelOrder: React.FC<PropertiesTypes> = ({ disabled = false, orderId }: PropertiesTypes) => {
    
    const classchange = disabled ? "bg-destructive/30 text-foreground/50 select-none" : "";

    return ( 
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={"destructive"} disabled={disabled} className={`${classchange}`}>Cancel Order</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. <br />
                    This action will permanently cancel this order from the schedule. <br />
                    OrderId: {orderId}
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Back</AlertDialogCancel>
                <AlertDialogAction className="border border-destructive bg-destructive text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive hover:font-semibold" asChild><SheetClose>Continue</SheetClose></AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
     );
}
 
export default CancelOrder;