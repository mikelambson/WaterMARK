import React, { useState } from 'react';
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Button } from "@/components/ui/button";
  import { DatePicker, TimePicker } from "./DateTimePicker";

interface EndRunProps {
    // Define the props for the component here
}

const EndRun: React.FC<EndRunProps> = (props) => {
    // Define the state variables here
    const [value, setValue] = useState('');

    // Define any event handlers or helper functions here

    return (
        // JSX code for the component goes here
        <DialogContent>
            <DialogHeader>
                <DialogTitle>End Run</DialogTitle>
                <DialogDescription>Set the end date and time for the run</DialogDescription>
            </DialogHeader>
            <DatePicker 
                defaultDate={true} 
                className="mb-4"
            />
            <TimePicker />
            <DialogClose>
                <Button>Finalize Order</Button>
            </DialogClose>
            {/* Add your component content here */}
        </DialogContent>
    );
};

export default EndRun;