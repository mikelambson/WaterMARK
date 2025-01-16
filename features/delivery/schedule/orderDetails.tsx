"use client";
import React, { useState } from "react";
import { format, parseISO  } from 'date-fns';
import { 
    Sheet, 
    SheetClose, 
    SheetContent, 
    SheetDescription, 
    SheetFooter, 
    SheetHeader, 
    SheetTitle, 
    SheetTrigger 
} from "@/components/ui/sheet";
import {
    Drawer,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FaHandHoldingWater } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Schedule } from "@/typings";
import CancelOrder from "@/components/function/CancelOrder";
import ManageDelivery from "@/features/delivery/schedule/ManageDeliveries";
import { cn } from "@/lib/utils/GeneralUtils";
import { TbGridDots } from "react-icons/tb";



interface OrderDetailsProps {
    schedule: Schedule;
    className?: string;

}


const OrderDetails: React.FC<OrderDetailsProps> = ({ schedule, className }) => {
    const [date, setDate] = useState<Date>()
    const parsedDate = parseISO(schedule.scheduledDate);
    const deliveriesArray = schedule.deliveries;
    const hoursCalc = (index: number) => {
        if (deliveriesArray.length === 0) return;
    
        if (index === 99) {
            const indexes = Array.from({ length: deliveriesArray.length }, (_, idx) => idx);
            const newHrsCalc = indexes.reduce((totalHrs, idx) => {
                const start = new Date(deliveriesArray[idx].startTime).getTime();
                const stop = deliveriesArray[idx].stopTime
                    ? new Date(deliveriesArray[idx].stopTime).getTime()
                    : new Date().getTime();
                const hrs = (stop - start) / (1000 * 60 * 60);
                return totalHrs + hrs;
            }, 0);
    
            return +(Math.round(newHrsCalc * 100) / 100);
        }
    
        const start = new Date(deliveriesArray[index].startTime).getTime();
        const stop = deliveriesArray[index].stopTime
            ? new Date(deliveriesArray[index].stopTime).getTime()
            : new Date().getTime();
        const hrs = (stop - start) / (1000 * 60 * 60);
    
        return +(Math.round(hrs * 100) / 100);
    };
    
    
    const deliveryAF = (index: number) => {
        if (deliveriesArray.length === 0) return;
        if (!deliveriesArray[index]) return;
        const start = new Date(deliveriesArray[index].startTime).getTime();
        const stop = deliveriesArray[index].stopTime 
            ? new Date(deliveriesArray[index].stopTime).getTime() 
            : new Date().getTime();
        const hrs = ((stop - start) / (1000 * 60 * 60));
        const cfs = schedule.order.approxCfs;
        const afcalc = hrs * cfs * 0.0825;  
        return parseFloat(afcalc.toFixed(2))
        
    }

    return ( 
        <Sheet>
            <SheetTrigger asChild>
                <Button 
                    variant={"outline"} 
                    size={"sm"} 
                    className={cn("bg-neutral-300/90 dark:bg-slate-600/80 border-gray-600 dark:border-gray-500 shadow-md hover:animate-pulse font-semibold transform-gpu", className)}>
                        <TbGridDots className={"mr-1"} />
                        Order Details
                </Button>
            </SheetTrigger>
            <SheetContent className={"w-11/12 sm:w-[800px]"} side="right">
                <SheetHeader>
                <SheetTitle className="text-card-alternative">Schedule #{schedule.order.orderNumber} Details</SheetTitle>
                <SheetDescription className="flex flex-col w-full gap-2">
                    Laterals: {schedule.order.laterals.join(' | ')} <br />
                    Remarks: {schedule.order.remarks} <br />
                    Irrigator: {schedule.order.details.irrigatorsName}<br />
                    Owner: {schedule.order.details.ownersName}<br />
                    Scheduleed AF: {schedule.order.details.approxAf}<br />
                    Balance: {schedule.order.details.balance}<br />
                    {schedule.order.approxCfs} CFS for {schedule.order.approxHrs} HRS
                </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-2">
                        <Label>Scheduled:</Label>
                        <span className="pl-1 border rounded-md col-span-3">{
                            new Date(schedule.scheduledDate).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false,
                            
                        })}
                        </span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-2">
                        <Label htmlFor="instructions" className="col-span-2">
                        Instructions: 
                        </Label>
                        <div className="row-start-2 col-span-4 text-left">{schedule.instructions}</div>
                        {/* <Input id="instructions" defaultValue={schedule.instructions || "Enter Instructions"} className="row-start-2 col-span-4 text-left" /> */}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-2">
                        <Label htmlFor="deliverynotes" className="col-span-2 flex items-center gap-2">
                            {schedule.deliveries.length > 1 
                                ? "Deliveries:" 
                                : "Delivery:"}
                        <Drawer>
                            <DrawerTrigger asChild>
                                <Button variant={"outline"} size={"pagination"} className="text-xl bg-neutral-300/90 dark:bg-slate-600/80 border-gray-600 dark:border-gray-500 shadow-md hover:animate-pulse font-semibold transform-gpu">
                                <FaHandHoldingWater className={""} />
                                
                                </Button>
                            </DrawerTrigger>
                            <ManageDelivery
                                schedule={schedule}
                            />
                            </Drawer>
                        </Label>
                        <div className="col-span-4">
                            {schedule.deliveries.map((delivery, index) => (
                                <div key={index} className="grid text-sm">
                                    <div className="flex justify-between">
                                        <p>{index + 1}:</p>
                                        <p>{hoursCalc(index)} hrs</p>
                                        <p className="after:content-['cfs'] after:ml-1">
                                            {delivery.measurment ? delivery.measurment : schedule.order.approxCfs}
                                        </p>
                                        <p className="after:content-['af'] after:ml-1">
                                            {deliveryAF(index)}
                                        </p>
                                    </div>
                                    <p>{delivery.deliveryNote ? delivery.deliveryNote : "No note..."}</p>
                                </div>
                                
                            ))}
                        </div>
                        
                    </div>
                    <div className="grid grid-cols-4 items-center gap-2">
                        <Label htmlFor="specialRequest" className="col-span-2">
                            Special Request:
                        </Label>
                        <input
                            id="specialRequest"
                            defaultValue={schedule.specialRequest 
                                ? schedule.specialRequest 
                                : "No Special Requests"}
                            className="flex flex-wrap col-span-4 px-2"
                        />
                    </div>
                    <div className="grid grid-cols-6 items-center gap-4">
                        <Label htmlFor="startdate" className="text-right">
                        Start Date
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                id="startdate"
                                variant={"outline"}
                                className={cn(
                                    "col-span-4 justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                                disabled={schedule.order.status === "running"}
                                >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {parsedDate ? format(parsedDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                mode="single"
                                selected={parsedDate}
                                onSelect={setDate}
                                initialFocus
                                />
                                
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="grid grid-cols-6 items-center gap-2">
                        <Label htmlFor="starttime" className="text-right">
                        Start Time
                        </Label>
                        <Input id="starttime" defaultValue={new Date(schedule.scheduledDate).toLocaleString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false,
                            })} 
                            className="col-span-2"
                            disabled={schedule.order.status === "running"} 
                        />
                        <Label htmlFor="traveltime" className="text-right">
                        Travel Time
                        </Label>
                        <Input id="traveltime" 
                            defaultValue={`${schedule.travelTime} hrs`} 
                            className="col-span-2" 
                            disabled={schedule.order.status === "running"}
                        />
                    </div>
                </div>
                <SheetFooter>
                    <CancelOrder 
                        disabled={schedule.order.status === "running" ? true : false}
                        orderId={schedule.orderId}
                        orderNumber={schedule.order.orderNumber}
                    />
                <Button variant={"secondary"} type="reset">Reset</Button>
                <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
 
export default OrderDetails;