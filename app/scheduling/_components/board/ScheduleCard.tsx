// @/app/(scheduling)/_components/ScheduleCard.tsx
"use client"
import React, { useState, useEffect, useRef } from "react";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "@hello-pangea/dnd";
import { useTheme } from "next-themes";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Schedule, TypedSchedule } from "@/typings";
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
import { parse, isValid } from 'date-fns';


type Properties = {
    schedule: Schedule;
    index: any;
    id: number
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

const ScheduleCard = ({
    schedule,
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

    const newdate = schedule.scheduledDate;
    const formatted = newdate.replace(", ", "T");
    const parsedDate = parse(formatted, "MM/dd/yyyy'T'HH:mm:ss", new Date());

   
    return ( 
        <div
            ref={(node) => {
                cardRef.current = node;
                innerRef(node);
            }}
            className={ cn("mx-[2px] rounded-md drop-shadow-md", schedule.order.status === "running" 
            ? "bg-amber-800/80 dark:bg-amber-950/80" 
            : "bg-slate-700/90 dark:bg-gray-800/90")}
            {...(schedule.order.status === "running" ? {} : draggableProps)}
            {...(schedule.order.status === "running" ? {} : dragHandleProps)}
            
        >
            <Sheet>
            <div onClick={toggleDetailsVisibility} className="group grid grid-flow-row grid-rows-4 grid-cols-[2rem,1fr,2fr,1fr] 
            gap-0 rounded-sm align-text-bottom">
                <div className={cn("col-start-1 row-start-1 row-span-4 pt-6 text-gray-400 dark:text-gray-700")}>
                    <DragIcon />
                </div>
                <div className="col-span-3 text-bottom pt-1 pr-1 row-start-1 col-start-2 text-sm lg:text-[1em] text-emerald-50 dark:text-gray-300/95 truncate font-semibold">{schedule.order.laterals.join(' ')}</div>
                <div className={cn(`col-span-3 text-bottom row-start-2 border-b-2 font-semibold truncate 
                text-sky-300/90 dark:text-sky-400/80 border-gray-200/60  dark:border-gray-600`)}>
                    Instructions: {schedule.instructions}
                </div>
                <div className="col-start-1 row-start-4"></div>
                <div className={cn("row-span-2 col-start-2 row-start-3 border-r-2 text-sm py-1 text-gray-200 dark:text-foreground border-gray-200/60 dark:border-gray-600 " )}><span className={"text-gray-200/50 dark:text-foreground/50"} >Scheduled:</span>
                <br />{new Date(schedule.scheduledDate).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                    })}
                </div>
                <div className={cn("col-start-3 row-start-3 border-r-2 pl-1 font-medium text-gray-200 dark:text-foreground border-gray-200/60 dark:border-gray-600" )}>Status: {schedule.order.status}</div>
                <div className={cn("col-span-4 row-start-3 pl-1 font-medium text-gray-200 dark:text-foreground border-gray-200/60 dark:border-gray-600" )}>{schedule.order.approxCfs} CFS</div>
                <div className={cn("col-start-3 row-start-4 border-r-2 pl-1 text-gray-200 dark:text-foreground border-gray-200/60 dark:border-gray-600" )}>Travel: {schedule.travelTime} hrs</div>
                <div
                    className={cn("col-start-4 row-start-4 pl-1 font-medium relative text-gray-200 dark:text-foreground border-gray-200/60 dark:border-gray-600" )}>{schedule.order.approxHrs} hrs 
                        <div   
                        className={"absolute bottom-1 right-1 cursor-pointer transition ease-in-out duration-100 text-xl text-stone-100 dark:text-gray-400 group-hover:text-amber-400/60 dark:group-hover:text-amber-400 group-hover:animate-pulse transform-gpu"}>
                            {isDetailsVisible ? (<IoIosArrowDropupCircle className={"hover:scale-125"} />) : (<IoIosArrowDropdownCircle />)}
                        </div>
                </div>
                <div className={`col-start-1 col-span-4 row-start-5 relative overflow-hidden transition-all ${isDetailsVisible ? cn("h-auto opacity-100 border-t-2 rounded-b-md drop-shadow-md", isDarkMode ? "border-gray-200" : "border-gray-600") : 'h-0 opacity-0'} duration-300 ease-in-out`}>
                    <div className={cn("p-1 ", isDarkMode ? "bg-stone-400/75" :"bg-stone-800/60")}>
                    Order #: {schedule.order.orderNumber}<br />
                    Irrigator: {schedule.order.details.irrigatorsName}<br />
                    Owner: {schedule.order.details.ownersName}<br />
                    Watermaster Note: {schedule.watermasterNote}<br />
                    Special Request: {schedule.specialRequest}<br />
                    </div>
                    <SheetTrigger asChild>
                        <Button variant={"outline"} size={"icon"} className="absolute bottom-2 right-2 text-xl bg-slate-700/30 dark:bg-slate-500/80 border-neutral-500 dark:border-gray-500 shadow-md hover:animate-pulse font-semibold transform-gpu">
                            <TbGridDots />
                        </Button>
                    </SheetTrigger>
                </div>
            </div>
            
                
                <SheetContent className={"w-11/12 sm:w-[800px]"} side="right">
                    <SheetHeader>
                    <SheetTitle className="text-card-alternative">Edit Schedule #{schedule.order.orderNumber}</SheetTitle>
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
                            <Input id="instructions" defaultValue={schedule.instructions || "Enter Instructions"} className="row-start-2 col-span-4 text-left" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-2">
                            <Label htmlFor="watermasterNote" className="col-span-2">
                            Watermaster Note: 
                            </Label>
                            <Input id="watermasterNote" defaultValue={schedule.watermasterNote || "Enter Note"} className="col-span-4" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-2">
                            <Label htmlFor="specialRequest" className="col-span-2">
                            Special Request:
                            </Label>
                            <Input id="specialRequest" defaultValue={schedule.specialRequest || "Enter Request"} className="col-span-4" />
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
                            />
                            <Label htmlFor="traveltime" className="text-right">
                            Travel Time
                            </Label>
                            <Input id="traveltime" defaultValue={`${schedule.travelTime} hrs`} className="col-span-2" />
                        </div>
                        
                    </div>
                    <SheetFooter>
                    <Button variant={"secondary"} type="reset">Reset</Button>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
     );
}
 
export default ScheduleCard;