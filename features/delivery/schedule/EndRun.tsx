import React, { useState } from 'react';
import {
    Dialog,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { DatePicker, TimePicker } from "@/features/delivery/schedule/DateTimePicker";

interface EndRunProps {
    variant?: "link" | "destructive" | "secondary" | "default" | "outline" | "ghost" | null;
    className?: string;
    buttonText?: string;
}

const EndRun: React.FC<EndRunProps> = (props) => {
    const [timeSelected, setTimeSelected] = useState(false);

    // Function to handle time selection
    const handleTimeSelect = (time: string) => {
        // Update the state to indicate time selection
        setTimeSelected(!!time); // Convert time to boolean
    };

    // Define any event handlers or helper functions here

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    variant={props.variant}
                    className={props.className}>
                    {props.buttonText}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>End Run</DialogTitle>
                    <DialogDescription>Set the end date and time for the run</DialogDescription>
                </DialogHeader>
                <DatePicker 
                    defaultDate={true} 
                    className="mb-4"
                />
                <TimePicker gap={2} onChange={handleTimeSelect} />
                <div className="flex justify-end mt-4 gap-2">
                <DialogClose>
                    <Button>Cancel</Button>
                </DialogClose>
                <DialogClose asChild disabled={!timeSelected}>
                    <Button variant={"destructive"} disabled={!timeSelected}>Finalize Order</Button>
                </DialogClose>
                </div>
                {/* Add your component content here */}
            </DialogContent>
        </Dialog>
    );
};

export default EndRun;