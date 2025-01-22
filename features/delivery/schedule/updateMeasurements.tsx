"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { KeyboardEventHandler } from "react"; // Import the KeyboardEventHandler type
import { DatePicker, TimePicker } from "@/features/delivery/schedule/DateTimePicker";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast"
import { cn } from "@/lib/utils/GeneralUtils";
import { title } from "process";

interface UpdateMeasurementsProps {
    variant?: "link" | "destructive" | "secondary" | "default" | "outline" | "ghost" | null;
    className?: string;
    buttonText?: string;
    size?: "default" | "sm" | "lg" | "icon" | "pagination" | null;
}

type SubmissionStructure = {
    date: string;
    measurement: number;
};

const UpdateMeasurements: React.FC<UpdateMeasurementsProps> = (props) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [saveMeasurement, setSaveMeasurement] = useState<number | null>(null);
    const [saveDate, setSaveDate] = useState<string | null>(null);
    const [dataPacket, setDataPacket] = useState<SubmissionStructure | null>(null);
    const { toast } = useToast();

    const handleDateChange = (newDate: string) => {
        setSelectedDate(new Date(newDate));
    }

    const handleTimeChange = (newTime: string) => {
        setSelectedTime(newTime);
    };

    const handleDateTime = () => {
        // console.log("Selected Date:", selectedDate);
        // console.log("Selected Time:", selectedTime);
        if (!selectedDate || isNaN(new Date(selectedDate).getTime())) {
            toast({
                variant: "destructive",
                title: "Invalid Date",
                description: "Please enter a valid date and time to proceed.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
              })
            return;
        }
        const date = new Date(selectedDate);
        const hours = parseInt(selectedTime.slice(0, 2), 10);
        const minutes = parseInt(selectedTime.slice(2, 4), 10);
        date.setHours(hours, minutes);
        
        // console.log("Date and Time:", date);
        const utcDate = date.toISOString();
        setSaveDate(date.toString());
        // console.log("Local Date and Time:\n", date);
        // console.log("UTC Date and Time:\n", utcDate);
        // toast({
        //     // variant: "success",
        //     title: "Date and Time Submitted",
        //     description: date.toString() + "\nUTC Time: " + utcDate,
        //     })

        // Perform submission logic here
    };
    const handleNumberEntry: KeyboardEventHandler<HTMLInputElement> = (event) => { // Update the type of handleNumberEntry
        const key = event.key;
        // Allow digits, backspace, delete, tab, and a single decimal point
        if (
            key !== "." && // Decimal point
            key !== "Backspace" &&
            key !== "Delete" &&
            key !== "Tab" &&
            (key < "0" || key > "9") // Digits
        ) {
            event.preventDefault();
        }
    };

    const handleSubmit = () => {
        if (!saveDate || isNaN(new Date(saveDate).getTime())) {
            toast({
                variant: "destructive",
                title: "Invalid Date",
                description: "Please enter a valid date and time to proceed.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
              })
            return;
        }
        if (!saveMeasurement) {
            toast({
                variant: "destructive",
                title: "Invalid Measurement",
                description: "Please enter a valid measurement to proceed.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
              })
            return;
        }
        const submission: SubmissionStructure = {
            date: saveDate || "",
            measurement: saveMeasurement || 0,
        };
        setDataPacket(submission);
        // console.log("Data Packet:", dataPacket);
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button 
                    variant={props.variant}
                    className={props.className}
                    size={props.size}    
                >
                    {props.buttonText}
                    
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-[95%] h-full md:h-[95%] overflow-y-auto dark:border-gray-600">
                <Tabs defaultValue="est" className="w-full h-full">
                    <DialogHeader>
                        <DialogTitle className="text-center text-card-alternative text-xl">
                            Update Measurements
                        </DialogTitle>
                        <DialogDescription className="flex justify-center">
                            Select the type of measurement you would like to update.
                        </DialogDescription>
                        <div className="flex justify-center">
                            <TabsList>
                                <TabsTrigger value="est">Est</TabsTrigger>
                                <TabsTrigger value="poly">Polystick</TabsTrigger>
                                <TabsTrigger value="overTheBoards">OTB</TabsTrigger>
                                <TabsTrigger value="submerged">Submerged</TabsTrigger>
                                <TabsTrigger value="jet">Jet Flow</TabsTrigger>
                                
                            </TabsList>
                        </div>
                    </DialogHeader>
                    <div className="pt-2 flex justify-center gap-2 flex-wrap">
                        <DatePicker defaultDate={true} onChange={handleDateChange} />
                        <TimePicker gap={1} defaultTime={true} onChange={handleTimeChange} />
                        
                            <Button 
                            variant={"secondary"}
                            onClick={() => {
                                handleDateTime();
                            }}>
                                Save Date/Time
                            </Button>
                    </div>
                    <div className={cn(saveDate === null ? "hidden" : "flex justify-center gap-2")}>
                        {/* Saved Date */}
                        <p className="text-center text-lg">Date/Time:</p>
                        <p className="text-center text-lg text-card-alternative">{saveDate}</p>


                    </div>
                    <TabsContent value="est">
                        <p className="text-center text-lg -mb-2">Estimation</p>
                        <div className="grid grid-cols-2 gap-2 w-72 mx-auto pt-3 items-center">
                            <Label htmlFor="estCFS">Estimated CFS:</Label>
                            <Input id="estCFS" defaultValue={"0.00"} onChange={(e) => setSaveMeasurement(parseFloat(e.target.value))} />
                        </div>
                        <p className="mt-2 border-t-2 pt-2 text-center text-md -mb-2">Timed Flow</p>
                        <div className="grid grid-cols-2 gap-2 w-72 mx-auto pt-3 items-center">
                            <Label htmlFor="estD">Distance ft:</Label>
                            <Input id="estD" defaultValue={"10.00"} />
                            <Label htmlFor="estS">Time in seconds:</Label>
                            <Input id="estS" defaultValue={"15.00"} />
                            <Label htmlFor="estH">Water Height</Label>
                            <Input id="estH" defaultValue={"3.00"} />
                            <Label htmlFor="estW">Average Width</Label>
                            <Input id="estW" defaultValue={"15.00"} />
                        </div>
                        <div className="flex border-2 text-lg my-2 h-8 px-2 w-fit min-w-[8rem] mx-auto justify-center items-center rounded-md">
                            <p id="estcalc">Enter timed estimation...
                                {/* {(() => {
                                    const estCFS = document.getElementById("estCFS") as HTMLInputElement;
                                    return parseFloat(estCFS.value) > 0 ? `The flow is: ${estCFS.value} CFS.` : "Enter estimation.";
                                })()} */}
                            </p>
                        </div>
                        <div className="flex mt-2 justify-center gap-4">
                            <Button variant={"secondary"} className="mt-2" onClick={() => {
                                
                                const estD = document.getElementById("estD") as HTMLInputElement;
                                const estS = document.getElementById("estS") as HTMLInputElement;
                                const estH = document.getElementById("estH") as HTMLInputElement;
                                const estW = document.getElementById("estW") as HTMLInputElement;
                                const estcalc = document.getElementById("estcalc") as HTMLParagraphElement;
                                const result = Math.round((parseFloat(estD.value) * parseFloat(estH.value) * parseFloat(estW.value) / parseFloat(estS.value)) * 100 ) / 100;
                                estcalc.innerHTML = `The flow is: ${result} CFS.`;
                            }}>Calculate</Button>
                            
                            
                        </div>
                        <div className=" border-t-2 mt-4 text-sm text-center">
                            <p>
                                Use a float or a stick to measure the water velocity along a distance of at least ten feet.
                            </p>
                        </div>
                    </TabsContent>
                    <TabsContent value="poly">
                        <p className="text-center text-lg">Polystick</p>
                        
                        <div className="grid grid-cols-2 gap-2 w-72 mx-auto pt-3 items-center">
                            <Label htmlFor="polyread">Polystick Reading:</Label>
                            <Input id="polyread" defaultValue={"3.96"} />
                            <Label htmlFor="polywidth">Width:</Label>
                            <Input id="polywidth" defaultValue={"5.00"} />
                        </div>

                        <div className="flex border-2 text-lg my-2 h-8 px-2 w-fit min-w-[8rem] mx-auto justify-center items-center rounded-md">
                            <p id="polycalc" className="text-lg">Enter polystick reading...</p>
                        </div>

                        <div className="mt-2 text-center text-lg">
                            <Button variant={"secondary"} className="mt-2" onClick={() => {
                                const polyread = document.getElementById("polyread") as HTMLInputElement;
                                const polywidth = document.getElementById("polywidth") as HTMLInputElement;
                                const polycalc = document.getElementById("polycalc") as HTMLParagraphElement;
                                const result = Math.round((parseFloat(polyread.value) * parseFloat(polywidth.value)) * 100 ) / 100;
                                polycalc.innerHTML = `The CFS is: ${result}`;
                            }}>Calculate</Button>
                            
                        </div>
                        <div className=" border-t-2 mt-4 text-sm text-center">
                            <p>
                                NOTE: Place, hold, and remove the stick in the water while keeping it completely vertical.
                            </p>
                            <p>
                                Use dust on the stick to get a good reading, while maintaining the positioning. 
                            </p>
                            <p>    
                                The water will wash away the dust to the measurement mark. This is the reading.
                            </p>
                        </div>
                    </TabsContent>
                    <TabsContent value="overTheBoards">
                        <p className="text-center text-lg">Over The Boards</p>
                        <div className="grid grid-cols-2 gap-2 w-72 mx-auto pt-3 items-center">
                            <Label htmlFor="otbU">Upstream:</Label>
                            <Input id="otbU" defaultValue={"2.00"} onKeyDown={handleNumberEntry} />
                            <Label htmlFor="otbB">Boards:</Label>
                            <Input id="otbB" defaultValue={"3.00"} pattern="^\d+(\.\d{1,2})?$" />
                            <Label htmlFor="otbL">Length:</Label>
                            <Input id="otbL" defaultValue={"4.00"} pattern="^\d+(\.\d{1,2})?$" />
                        </div>

                        <div className="flex border-2 text-lg my-2 h-8 px-2 w-fit min-w-[8rem] mx-auto justify-center items-center rounded-md">
                            <p id="otbcalc" className="text-lg">Enter over the boards measurements...</p>
                        </div>
                        <div className="mt-2 text-center text-lg">
                            <Button variant={"secondary"} className="mt-2" onClick={() => {
                                const otbU = document.getElementById("otbU") as HTMLInputElement;
                                const otbB = document.getElementById("otbB") as HTMLInputElement;
                                const otbL = document.getElementById("otbL") as HTMLInputElement;
                                const otbcalc = document.getElementById("otbcalc") as HTMLParagraphElement;
                                const result = Math.round(
                                    ( 3.33 * parseFloat(otbL.value) * Math.pow(
                                        ( parseFloat(otbB.value) - parseFloat(otbU.value) ), 1.5 ) ) * 100 ) / 100;
                                otbcalc.innerHTML = `The flow over the boards is: ${result} CFS.`;
                            }}>Calculate</Button>
                        </div>
                        
                        <div className=" border-t-2 mt-4 text-sm text-center">
                            <p>
                                Measure down from ref point to the measurement points.
                            </p>
                        </div>
                    </TabsContent>
                    <TabsContent value="submerged">
                        <p className="text-center text-lg">Submerged</p>
                        <div className="grid grid-cols-2 gap-2 w-72 mx-auto pt-3 items-center">
                            <Label htmlFor="subU">Upstream:</Label>
                            <Input id="subU" defaultValue={"2.00"} />
                            <Label htmlFor="subD">Downstream:</Label>
                            <Input id="subD" defaultValue={"3.00"} />
                            <Label htmlFor="subG">Gate:</Label>
                            <Input id="subG" defaultValue={"4.00"} />
                            <Label htmlFor="subS">Sill:</Label>
                            <Input id="subS" defaultValue={"5.00"} />
                            <Label htmlFor="subL">Length:</Label>
                            <Input id="subL" defaultValue={"6.00"} />
                        </div>

                        <div className="flex border-2 text-lg my-2 h-8 px-2 w-fit min-w-[8rem] mx-auto justify-center items-center rounded-md">
                            <p id="subcalc" className="text-lg">Enter submerged measurements...</p>
                        </div>
                        <div className="mt-2 text-center text-lg">
                            <Button variant={"secondary"} className="mt-2" onClick={() => {
                                const subU = document.getElementById("subU") as HTMLInputElement;
                                const subD = document.getElementById("subD") as HTMLInputElement;
                                const subG = document.getElementById("subG") as HTMLInputElement;
                                const subS = document.getElementById("subS") as HTMLInputElement;
                                const subL = document.getElementById("subL") as HTMLInputElement;
                                const subcalc = document.getElementById("subcalc") as HTMLParagraphElement;
                                const result = Math.round(
                                    ( 0.67 * ( parseFloat(subS.value) - parseFloat(subG.value) ) * parseFloat(subL.value) * Math.sqrt( 64.4 * (parseFloat(subD.value) - parseFloat(subU.value))) ) * 100 ) / 100;
                                subcalc.innerHTML = `The flow is: ${result} CFS.`;
                            }}>Calculate</Button>
                        </div>
                        <div className=" border-t-2 mt-4 text-sm text-center">
                            <p>
                                NOTE: Difference between up & downstream must be &gt; 0.2 feet (2.4 in)
                            </p>
                            <p>
                                Measure down from ref point to the measurement points.
                            </p>
                        </div>
                    </TabsContent>
                    <TabsContent value="jet">
                        <p className="text-center text-lg">Jet Flow</p>
                        <div className="grid grid-cols-2 gap-2 w-72 mx-auto pt-3 items-center">
                            <Label htmlFor="jetU">Upstream:</Label>
                            <Input id="jetU" defaultValue={"1.00"} />
                            <Label htmlFor="jetG">Gate:</Label>
                            <Input id="jetG" defaultValue={"2.00"} />
                            <Label htmlFor="jetS">Sill:</Label>
                            <Input id="jetS" defaultValue={"3.00"} />
                            <Label htmlFor="jetL">Length:</Label>
                            <Input id="jetL" defaultValue={"4.00"} />
                        </div>

                        <div className="flex border-2 text-lg my-2 h-8 px-2 w-fit min-w-[8rem] mx-auto justify-center items-center rounded-md">
                            <p id="jetcalc" className="text-lg">Enter jet flow gate measurements...</p>
                        </div>
                        <div className="mt-2 text-center text-lg">
                            <Button variant={"secondary"} className="mt-2" onClick={() => {
                                const jetU = document.getElementById("jetU") as HTMLInputElement;
                                const jetG = document.getElementById("jetG") as HTMLInputElement;
                                const jetS = document.getElementById("jetS") as HTMLInputElement;
                                const jetL = document.getElementById("jetL") as HTMLInputElement;
                                const jetcalc = document.getElementById("jetcalc") as HTMLParagraphElement;
                                const result = Math.round(
                                    ( 0.6 * (parseFloat(jetS.value) - parseFloat(jetG.value)) * parseFloat(jetL.value) * Math.sqrt( 64.4 * ( ( parseFloat(jetG.value) + parseFloat(jetS.value) )  / 2 - parseFloat(jetU.value) ) ) ) * 100 ) / 100;
                                jetcalc.innerHTML = `The flow is: ${result} CFS.`;
                            }}>Calculate</Button>
                            
                        </div>

                        <div className=" border-t-2 mt-4 text-sm text-center">
                            <p>
                                NOTE: There must be space under the downstream flow to be considered a jet flow condition.
                            </p>
                            <p>
                                Measure down from ref point to the measurement points.
                            </p>
                        </div>
                    </TabsContent>
                    <div className="mt-2 flex justify-end gap-2">
                        <Button 
                            disabled={!saveDate || !saveMeasurement}
                            variant={"default"}
                            onClick={() => {

                                handleSubmit();
                                alert("Submitted" + "\nDate: " + saveDate  + "\nMeasurement: " + saveMeasurement + " CFS" + "\nMeasurment Type: " + "Estimation");
                            }}>
                                Submit
                            </Button>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateMeasurements;