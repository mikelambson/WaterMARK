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
    const [timeSelected, setTimeSelected] = useState(false);

    // Function to handle time selection
    const handleTimeSelect = (time: string) => {
        // Update the state to indicate time selection
        setTimeSelected(!!time); // Convert time to boolean
    };

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
            <TimePicker gap={2} onChange={handleTimeSelect} />
            <div className="flex justify-end mt-4 gap-2">
            <DialogClose>
                <Button>Cancel</Button>
            </DialogClose>
            <DialogClose disabled={!timeSelected}>
                <Button variant={"destructive"} disabled={!timeSelected}>Finalize Order</Button>
            </DialogClose>
            </div>
            {/* Add your component content here */}
        </DialogContent>
    );
};

export default EndRun;