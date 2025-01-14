// @/app/(scheduling)/_components/OrderCard.tsx
"use client"
import React, { useState, useEffect, useRef, useCallback } from "react";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "@hello-pangea/dnd";
import { format } from "date-fns";
import { cn } from "@/lib/utils/GeneralUtils";
import { Order, TypedColumn } from "@/typings";
import DragIcon from "@/features/scheduling/board/DragIcon";
import { Button } from "@/components/ui/button";
import { 
    Sheet, 
    SheetClose, 
    SheetContent, 
    SheetDescription, 
    SheetFooter, 
    SheetHeader, 
    SheetTitle, 
    SheetTrigger } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TbGridDots } from "react-icons/tb";
import { PiDotsThreeDuotone } from "react-icons/pi";
import CancelOrder from "@/components/function/CancelOrder";
import { useSchedulingStore } from "@/lib/store/schedulingStore";
import DelayOrderButton from "../../../../features/scheduling/board/DelayOrder";

type Properties = {
    order: Order;
    index: TypedColumn;
    id: number
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};



const OrderCard = ({
    order,
    id,
    innerRef,
    draggableProps,
    dragHandleProps,
}: Properties) => {
    
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const toggleDetailsVisibility = () => {
        setIsDetailsVisible(!isDetailsVisible);
    };
    const [date, setDate] = React.useState<Date>()
    const { updateOrderStatus, selectedSheet, selectedHead } = useSchedulingStore();

    const updateStatus = useCallback((orderId: string, newStatus: string) => {
        // Fetch data based on the updated district
        updateOrderStatus(orderId, newStatus);
    }, [updateOrderStatus]);

       
    const iconStyle = `cursor-pointer transition ease-in-out duration-100 text-xl text-stone-100 dark:text-gray-400 group-hover:text-amber-400/60 dark:group-hover:text-amber-400 group-hover:animate-pulse transform-gpu mr-1`;

    const handleClickOutside = (event: MouseEvent) => {
        if (
            cardRef.current &&
            !((cardRef.current as unknown) as HTMLElement).contains(event.target as Node)
          ) {
            setIsDetailsVisible(false);
          }
        };
    
      // useEffect to add click event listener on mount
      useEffect(() => {
        document.addEventListener("click", handleClickOutside);
    
        // Cleanup the event listener on unmount
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
      }, []);


    return ( 
        <div
            ref={(node) => {
                cardRef.current = node;
                innerRef(node);
            }}
            className={ cn("mx-[2px] rounded-md drop-shadow-md", order.status === "delayed" 
            ? "bg-green-900/60 dark:bg-green-950/75" 
            : "bg-neutral-700/90 dark:bg-zinc-800/90")}
            {...draggableProps} 
            {...dragHandleProps} 
            
        >
            <Sheet>
            <div 
            onClick={toggleDetailsVisibility} 
            className="group grid grid-flow-row grid-rows-4 grid-cols-[2rem,1fr,2fr,1fr] 
            gap-0 rounded-sm align-text-bottom"
            >
                <div className={cn("col-start-1 row-start-1 row-span-4 pt-6 text-gray-400/60 dark:text-gray-600/80")}>
                    <DragIcon />
                </div>
                <div className="col-span-3 text-bottom pt-1 pr-1 row-start-1 col-start-2 text-sm lg:text-[1em] text-emerald-50 dark:text-gray-300/95 truncate font-semibold">{order.laterals.join(', ')}</div>
                <div className={cn("col-span-3 text-bottom row-start-2 border-b-2 font-semibold truncate text-amber-300/70 dark:text-amber-400/60 border-gray-200/60  dark:border-gray-600")}>{order.remarks}</div>
                <div className="col-start-1 row-start-4"></div>
                <div className={cn("row-span-2 col-start-2 row-start-3 border-r-2 text-sm pt-2 text-gray-200 dark:text-foreground border-gray-200/60 dark:border-gray-600 " )}>{order.ordertimestamp}</div>
                <div className={cn("col-start-3 row-start-3 border-r-2 pl-1 font-medium text-gray-200 dark:text-foreground border-gray-200/60 dark:border-gray-600" )}>Order# {id}</div>
                <div className={cn("col-span-4 row-start-3 pl-1 font-medium text-gray-200 dark:text-foreground border-gray-200/60 dark:border-gray-600" )}>{order.approxCfs} CFS</div>
                <div className={cn("col-start-3 row-start-4 border-r-2 pl-1 text-gray-200 dark:text-foreground border-gray-200/60 dark:border-gray-600" )}>{order.district} | {order.status === "P" ? "pending" : order.status}</div>
                <div className={cn(`flex justify-between col-start-4 row-start-4 px-1 font-medium relative 
                text-gray-200 dark:text-foreground border-gray-200/60 dark:border-gray-600` )}>
                    {order.approxHrs} hrs 
                    <PiDotsThreeDuotone className={`hover:scale-125 ${iconStyle}`} />   
                </div>
                <div className={`col-start-1 col-span-4 row-start-5 relative overflow-hidden ${isDetailsVisible ? cn("h-auto opacity-100 border-t-2 rounded-b-md drop-shadow-md border-gray-200 dark:border-gray-600") : 'h-0 opacity-0'}`}>
                    <div className={cn("p-1 bg-stone-400/70 dark:bg-stone-800/60")}>
                    OrderID: {order.id}<br />
                    Irrigator: {order.details.irrigatorsName}<br />
                    Owner: {order.details.ownersName}<br />
                    Ordered AF: {order.details.approxAf}<br />
                    Balance: {order.details.balance}<br />
                    </div>
                    <SheetTrigger asChild>
                        <Button variant={"outline"} size={"icon"} className="absolute bottom-2 right-2 text-xl bg-neutral-300/90 dark:bg-slate-500/80 border-gray-600 dark:border-gray-500 shadow-md hover:animate-pulse font-semibold transform-gpu">
                            <TbGridDots />
                        </Button>
                    </SheetTrigger>
                </div>
            </div>
                <SheetContent className={"w-11/12 sm:w-[600px]"} side="left">
                    <SheetHeader>
                    <SheetTitle className="text-card-alternative">Edit Order #{order.orderNumber}</SheetTitle>
                    <SheetDescription className="flex flex-col w-full gap-2">
                        Laterals: {order.laterals.join(' | ')} <br />
                        Remarks: {order.remarks} <br />
                        Irrigator: {order.details.irrigatorsName}<br />
                        Owner: {order.details.ownersName}<br />
                        Ordered AF: {order.details.approxAf}<br />
                        Balance: {order.details.balance}<br />
                        {order.approxCfs} CFS for {order.approxHrs} HRS
                    </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4 pr-4">
                    <div className="grid grid-cols-6 items-center gap-2">
                        <Label htmlFor="name" className="text-right">
                        Line
                        </Label>
                        <Input id="traveltime" defaultValue={selectedSheet.name} className="col-span-2" disabled />
                        <Label htmlFor="name" className="text-right">
                        Head
                        </Label>
                        <Input id="traveltime" defaultValue={selectedHead} className="col-span-2" disabled />
                    </div>
                    <div className="grid grid-cols-6 items-center gap-4">
                            <Label htmlFor="startdate" className="text-right">
                            Start Date
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[236px] justify-start text-left font-normal",
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
                        </div>

                        <div className="grid grid-cols-6 items-center gap-2">
                            <Label htmlFor="starttime" className="text-right">
                            Start Time
                            </Label>
                            <Input id="starttime" defaultValue={new Date().toLocaleString('en-US', {
                                hour: 'numeric',
                                minute: 'numeric',
                                hour12: false,
                                })} 
                                className="col-span-2"
                            />
                            <Label htmlFor="traveltime" className="text-right">
                            Travel Time
                            </Label>
                            <Input id="traveltime" 
                                defaultValue={`0 hrs`} 
                                className="col-span-2" 
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-2">
                            <Label htmlFor="watermasterNote" className="col-span-2">
                            Watermaster Note: 
                            </Label>
                            <Input id="watermasterNote" defaultValue={order.schedule.watermasterNote || "Enter Note"} className="col-span-4" />
                        </div>
                    </div>
                    <SheetFooter>
                        <CancelOrder 
                            orderId={order.id} 
                            orderNumber={order.orderNumber} 
                        />
                        <DelayOrderButton 
                            orderId={order.id}
                            currentStatus={order.status}
                            onUpdate={updateStatus}
                        />
                        <SheetClose asChild>
                            <Button type="submit">Save Changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
     );
}
 
export default OrderCard;