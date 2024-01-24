// @/app/(scheduling)/_components/OrderCard.tsx
"use client"
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "@hello-pangea/dnd";
import { useTheme } from "next-themes";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Order, TypedColumn } from "@/typings";
import DragIcon from "@/app/scheduling/_components/board/DragIcon";
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
    // index,
    id,
    innerRef,
    draggableProps,
    dragHandleProps,
}: Properties) => {
   
    const cardRef = useRef<HTMLDivElement | null>(null);
    
    const { theme } = useTheme();
    const isDarkMode = theme === "light";
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const toggleDetailsVisibility = () => {
        setIsDetailsVisible(!isDetailsVisible);
    };
    const [date, setDate] = React.useState<Date>()

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
            className={ cn("mx-[2px] rounded-md drop-shadow-md", isDarkMode ? "bg-slate-600" :"bg-gray-800")}
            {...draggableProps} {...dragHandleProps} 
            // ref={innerRef}
        >
            <Sheet>
            <div onClick={toggleDetailsVisibility} className="group grid grid-flow-row grid-rows-4 grid-cols-[2rem,1fr,2fr,1fr] 
            gap-0 rounded-sm align-text-bottom">
                <div className={cn("col-start-1 row-start-1 row-span-4 pt-6 text-gray-400 dark:text-gray-700")}>
                    <DragIcon />
                </div>
                <div className="col-span-3 text-bottom pt-1 pr-1 row-start-1 col-start-2 text-sm lg:text-[1em] text-emerald-50 dark:text-gray-300/95 truncate font-semibold">{order.laterals.join(' ')}</div>
                <div className={cn("col-span-3 text-bottom row-start-2 border-b-2 font-semibold truncate text-amber-300/70 dark:text-amber-400/60 border-gray-200/60  dark:border-gray-600")}>{order.remarks}</div>
                <div className="col-start-1 row-start-4"></div>
                <div className={cn("row-span-2 col-start-2 row-start-3 border-r-2 text-sm pt-2 text-gray-200 dark:text-foreground border-gray-200/60 dark:border-gray-600 " )}>{order.orderTimestamp}</div>
                <div className={cn("col-start-3 row-start-3 border-r-2 pl-1 font-medium text-gray-200 dark:text-foreground border-gray-200/60 dark:border-gray-600" )}>Order# {id}</div>
                <div className={cn("col-span-4 row-start-3 pl-1 font-medium text-gray-200 dark:text-foreground border-gray-200/60 dark:border-gray-600" )}>{order.approxCfs} CFS</div>
                <div className={cn("col-start-3 row-start-4 border-r-2 pl-1 text-gray-200 dark:text-foreground border-gray-200/60 dark:border-gray-600" )}>{order.district} | {order.status}</div>
                <div
                    className={cn("col-start-4 row-start-4 pl-1 font-medium relative text-gray-200 dark:text-foreground border-gray-200/60 dark:border-gray-600" )}>{order.approxHrs} hrs 
                        <div   
                        className={"absolute bottom-1 right-1 cursor-pointer transition ease-in-out duration-100 text-xl text-stone-100 dark:text-gray-400 group-hover:text-amber-400/60 dark:group-hover:text-amber-400 group-hover:animate-pulse transform-gpu"}>
                            {isDetailsVisible ? (<IoIosArrowDropupCircle className={"hover:scale-125"} />) : (<IoIosArrowDropdownCircle />)}
                        </div>
                </div>
                <div className={`col-start-1 col-span-4 row-start-5 relative overflow-hidden transition-all ${isDetailsVisible ? cn("h-auto opacity-100 border-t-2 rounded-b-md drop-shadow-md", isDarkMode ? "border-gray-200" : "border-gray-600") : 'h-0 opacity-0'} duration-300 ease-in-out`}>
                    <div className={cn("p-1 ", isDarkMode ? "bg-stone-400" :"bg-stone-800/40")}>
                    Irrigator: {order.details.irrigatorsName}<br />
                    Owner: {order.details.ownersName}<br />
                    Ordered AF: {order.details.approxAf}<br />
                    Balance: {order.details.balance}<br />
                    </div>
                    <SheetTrigger asChild>
                        <Button variant={"outline"} size={"icon"} className="absolute bottom-2 right-2 text-xl bg-slate-700/30 dark:bg-slate-500/80 border-neutral-500 dark:border-gray-500 shadow-md hover:animate-pulse font-semibold transform-gpu">
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
                    <div className="grid grid-cols-4 items-center gap-2">
                        <Label htmlFor="name" className="text-right">
                        Travel Time
                        </Label>
                        <Input id="traveltime" defaultValue="Hours" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
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
                    </div>
                    <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
     );
}
 
export default OrderCard;