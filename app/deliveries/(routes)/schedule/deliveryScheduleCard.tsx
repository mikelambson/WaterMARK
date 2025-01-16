// @/app/(scheduling)/_components/ScheduleCard.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { parseISO  } from 'date-fns';
import { cn } from "@/lib/utils/GeneralUtils";
import { Schedule } from "@/typings";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerTrigger,
    } from "@/components/ui/drawer"
import { FaHandHoldingWater } from "react-icons/fa";
import { PiDotsThreeDuotone } from "react-icons/pi";
import { formatPhoneNumber } from "@/lib/utils/GeneralUtils";
import UpdateMeasurements from "@/features/delivery/schedule/updateMeasurements";
import EndRun from "@/features/delivery/schedule/EndRun";
import ManageDelivery from "@/features/delivery/schedule/ManageDeliveries";
import OrderDetails from "@/features/delivery/schedule/orderDetails";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";



type Properties = {
    schedule: Schedule;
    index: any;
    innerRef: (element: HTMLElement | null) => void;
    
};

const ScheduledDeliveryCard = ({
    index,
    schedule,
    innerRef,
    
}: Properties) => {    
    const cardRef = useRef<HTMLDivElement | null>(null);
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [currentAFCalc, setCurrentAFCalc] = useState(0);
    const toggleVisibility = () => {
        setIsDetailsVisible(!isDetailsVisible);
    };
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

   
    const borderColors = schedule.order.status !== "running"
        ? "border-gray-200/60 dark:border-gray-600" 
        : "border-neutral-200/60 dark:border-stone-600";
    const iconStyle = `cursor-pointer transition ease-in-out duration-100 text-xl text-stone-100 dark:text-gray-400 group-hover:text-amber-400/60 dark:group-hover:text-amber-400 group-hover:animate-pulse transform-gpu mr-1`;

    const capitalizedStatus = schedule.order.status.charAt(0).toUpperCase() + schedule.order.status.slice(1);

    const spreadStatus = schedule.order.remarks && schedule.order.remarks.toLowerCase().includes("spread") 
    ? "Spread" 
    : "";
    const spreadStatusColor = schedule.order.remarks && schedule.order.remarks.toLowerCase().includes("spread")
    ? "text-lime-200 dark:text-lime-100/90 font-semibold"
    : "text-gray-200/60 dark:text-foreground/60";

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
    
    useEffect(() => {
        const updateCalculation = () => {
            if (schedule.order.status !== "running") return;
            if (deliveriesArray.length === 0) return;

            // Build an array of indexes [0, 1, ..., n-1]
            const indexes = Array.from({ length: deliveriesArray.length }, (_, index) => index);
            
            // Calculate the total delivery AF for all items in the array and round each value to two decimal places
            const newAFCalc = indexes.reduce((totalAF, index) => {
                const deliveryAFValue = deliveryAF(index) ?? 0;
                const roundedDeliveryAF = deliveryAFValue;
                return totalAF + roundedDeliveryAF;
            }, 0);
            
            setCurrentAFCalc(parseFloat(newAFCalc.toFixed(2)));
        };

        // Update the calculation every second
        const intervalId = setInterval(updateCalculation, 1000);
    
        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
      }, [schedule]);
    
      
    return ( 
        <div
            ref={(node) => {
                cardRef.current = node;
                innerRef(node);
            }}
            className={ cn("mx-[2px] rounded-md drop-shadow-md", schedule.order.status === "running" 
            ? currentAFCalc > schedule.order.details.approxAf 
                ? "bg-amber-900/75 dark:bg-amber-950/75" 
                : "bg-emerald-900/75 dark:bg-emerald-950/75" 
            : "bg-slate-700/90 dark:bg-gray-800/90")}
        >
            <div className="group grid grid-flow-row grid-rows-5 grid-cols-[2rem,1fr,1fr,2fr] md:grid-cols-[2.25rem,2fr,3fr,2fr] lg:grid-cols-[2.75rem,2fr,3fr,2fr]
            gap-0 rounded-sm align-text-bottom">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div 
                                className={cn(`group col-start-1 row-start-1 row-span-5 flex justify-center items-center cursor-pointer ${schedule.order.status !== "running" 
                                ? "text-gray-400 dark:text-gray-500"
                                : "text-neutral-400 dark:text-stone-500"}`)}
                                onClick={toggleVisibility}
                                style={{ writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '-0.2em' }}>
                                <span 
                                    className={`border-y pt-[0.5em] pb-[0.525em] bg-black/20 dark:bg-black/30 rounded-sm cursor-pointer group-hover:text-yellow-500/50 group-hover:border-yellow-500/50 hover:text-yellow-500 hover:border-yellow-500 dark:hover:border-yellow-500 hover:scale-110 transition ease-in-out duration-100 
                                    ${schedule.order.status !== "running" 
                                    ? "border-gray-400 dark:border-gray-500"
                                    : "border-neutral-400 dark:border-stone-500"}`}
                                    onClick={toggleVisibility}>
                                {schedule.order.orderNumber}
                                </span>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" align="end">
                            <p>Toggle Details</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <div className="col-span-2 text-bottom pt-1 pr-1 row-start-1 col-start-2 text-sm lg:text-[1em] text-emerald-50 dark:text-gray-300/95 truncate font-semibold">
                    {schedule.order.laterals.join(', ')}
                </div>
                <div className={`flex justify-end text-bottom pt-1 pr-1 row-start-1 col-start-4 text-sm lg:text-[1em] font-semibold row-span-3 border-b-2 z-10 ${borderColors}`}>
                    {schedule.order.status === "scheduled" ? (
                        <UpdateMeasurements 
                            variant="secondary"
                            className="mt-4 mr-4 bg-green-950 active:bg-black/50 border dark:border-foreground/50 text-background dark:text-foreground"
                            buttonText="Start Run"
                        />
                    ) : (
                    <div className={"flex justify-between text-emerald-50 dark:text-gray-300/95 text-bottom pt-1 pr-1 row-start-1 col-start-4 text-sm lg:text-[1em] font-semibold"}>
                        <p className="relative drop-shadow-md">
                            <span className={cn("absolute left-0", schedule.order.status === "running" 
                                && currentAFCalc > schedule.order.details.approxAf
                                ? "animate-ping transform-gpu"
                                : "animate-pulse transform-gpu"
                            )}>
                                _________
                            </span>
                            <span className={cn("absolute top-0 left-0", currentAFCalc > schedule.order.details.approxAf 
                                ? "text-red-400 drop-shadow-md dark:text-red-500" 
                                : "text-blue-300/90 dark:text-blue-400/80")}>
                                {currentAFCalc} 
                                <span className="pl-1">
                                    AF
                                </span> 
                            </span>
                        </p>
                        <EndRun variant="destructive" className="absolute top-14 right-2 sm:top-2 animate-none border dark:border-foreground/50  dark:text-foreground" buttonText="End Run" />
                    </div>
                )}
                </div>
                <div className="col-span-2 text-bottom pt-1 pr-1 row-start-2 col-start-2 flex flex-wrap text-sm lg:text-md text-emerald-50 dark:text-gray-300/95">
                    <p className="mr-1 after:content-['|'] after:ml-1">
                        {schedule.order.details.irrigatorsName
                            ? schedule.order.details.irrigatorsName
                            : schedule.order.details.ownersName}
                    </p>
                    
                        {schedule.order.phoneNumbers.map((phoneNumber, index) => (
                            <p key={index} className="mr-1 after:content-['|'] after:ml-1">
                                {formatPhoneNumber(phoneNumber)}
                            </p>
                        ))}
                    
                    <span className={`${spreadStatusColor}`}>
                        {spreadStatus}
                    </span>
                </div>
                <div 
                    className={
                        `absolute top-7 right-10 sm:relative sm:right-0 sm:top-2 pr-1 row-start-2 col-start-4 text-sm lg:text-md z-0
                        ${schedule.order.status === "scheduled" 
                        ? "text-transparent" 
                        : "text-emerald-50 dark:text-gray-300/95 after:content-['hrs'] after:ml-1 after:text-emerald-50/80 dark:after:text-gray-300/75"
                        }`
                    }
                >
                    {hoursCalc(99)}
                </div>
                <div className={cn(`col-span-2 text-bottom row-start-3 border-b-2 text-sm sm:text-md font-semibold flex flex-wrap text-amber-300/80 dark:text-amber-400/60 ${borderColors}`)}>
                    Instructions: {schedule.instructions}
                </div>
                {/* <div className="col-start-1 row-start-4"></div> */}
                <div className={cn(`row-span-2 col-start-2 row-start-4 border-r-2 text-sm py-1 text-gray-200 dark:text-foreground ${borderColors}`)}><span className={"text-gray-200/60 dark:text-foreground/60"} >{schedule.order.status === "running" ? "Started At:" : "Scheduled:"}</span>
                <br />{schedule.order.status !== "running" ? 
                    new Date(index).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                    }) :
                    new Date(deliveriesArray[0]?.startTime).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                    })    
                }
                </div>
                <div className={cn(`col-start-3 row-start-4 border-r-2 px-1 font-medium text-gray-200 dark:text-foreground ${borderColors}`)}>
                    <div className="w-full flex gap-1 ">
                        <p>Status:</p>
                        <p className={cn("mx-1 drop-shadow-md", 
                            schedule.order.status !== "running" 
                            ? "text-cyan-300/90 dark:text-cyan-200/70"
                            : currentAFCalc > schedule.order.details.approxAf 
                                ? "text-red-400  dark:text-red-500 animate-pulse transform-gpu" 
                                : "text-green-500 animate-pulse transform-gpu"
                        )}>
                            {currentAFCalc > schedule.order.details.approxAf 
                                ? "Over Delivered" : capitalizedStatus}
                        </p>
                        <p>
                            {Math.round((currentAFCalc / schedule.order.details.approxAf) * 100)}%
                        </p>
                    </div>
                </div>
                <div className={cn(`col-start-3 row-start-5 border-r-2 pl-1 text-gray-200 dark:text-foreground ${borderColors}` )}>
                    Travel: {schedule.travelTime} hrs
                </div>

                <div className={cn(`relative col-span-4 row-start-4 row-span-2 pl-1 font-medium text-gray-200 dark:text-foreground ${borderColors}` )}>
                    {schedule.order.approxCfs} CFS
                    <div className={cn(`flex justify-between px-1 font-medium text-gray-200 dark:text-foreground ${borderColors}`)}>
                    {schedule.order.approxHrs} hrs 
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className={"absolute bottom-2 right-2 cursor-pointer sm:relative hover:scale-125 transition ease-in-out duration-100"}>
                                    <PiDotsThreeDuotone onClick={toggleVisibility}  className={ "cursor-pointer transition ease-in-out duration-100 text-2xl rounded text-stone-100 dark:text-gray-400 group-hover:text-amber-400/60 dark:group-hover:text-amber-400 group-hover:animate-pulse transform-gpu mr-1"} />
                                </TooltipTrigger>
                                <TooltipContent side="left" align="end">
                                    <p>Toggle Details</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
{/* //////////////////////////////////////// Hidden Details //////////////////////////////////////// */}
                <div className={`col-start-1 col-span-4 row-start-6 relative overflow-hidden transition-all ${isDetailsVisible ? cn(`h-auto opacity-100 border-t-2 rounded-b-md drop-shadow-md ${borderColors}`) : 'h-0 opacity-0'} duration-300 ease-in-out`}>
                    <div className={cn(`p-2 flex flex-col bg-stone-400/60 dark:bg-stone-800/70`)}>
                        <div className="pl-4">
                            <p className="before:content-['Serial_Number:'] before:mr-2 before:text-foreground/50">    
                                {schedule.order.tcidSn}
                            </p>
                            <p className="before:content-['Acres_Given:'] before:mr-2 before:text-foreground/50">
                                {schedule.order.remarks?.match(/A\s*[\/\\]?\s*(\d+)/)?.[1]}
                            </p>
                            <p className="before:content-['Current_Balance:'] before:mr-2 before:text-foreground/50">
                                {schedule.order.details.balance}
                            </p>
                            <p className="before:content-['Total_AF:'] after:content-['AF_Scheduled'] before:mr-2 before:text-foreground/50 after:ml-2 after:text-foreground/50">
                                {currentAFCalc} / {schedule.order.details.approxAf}
                            </p>
                            <div className={deliveriesArray.length !== 0 ? "grid my-1 gap-2" : "before:content-['Deliveries:'] before:mr-1 before:text-foreground/50"}>
                                {deliveriesArray.length === 0 ? "Start the delivery to add details..." : null}
                                {deliveriesArray?.map((delivery, index) => (
                                    <div key={index} className="mx-2 grid border-y border-foreground rounded-md pb-1 bg-black/25">
                                        <div className="py-1 mb-1 flex flex-col justify-center align-middle text-center bg-black/25">
                                            <p className="text-sm">
                                                -- DELIVERY {index + 1} --
                                            </p>
                                        </div>
                                        <div className="px-2">
                                            <div className="flex flex-col justify-between md:flex-row">
                                                <p>
                                                    <span className="text-sm mr-1">Start Time:</span>
                                                    {new Date(delivery.startTime).toLocaleTimeString('en-US', {
                                                        year: 'numeric',
                                                        month: 'numeric',
                                                        day: 'numeric',
                                                        hour: 'numeric',
                                                        minute: 'numeric',
                                                        hour12: false,
                                                    })}
                                                </p>
                                                <p>
                                                    <span className="text-sm mr-1">
                                                        Stop Time:
                                                    </span>
                                                    {delivery.stopTime 
                                                        ? new Date(delivery.stopTime).toLocaleString('en-US', {
                                                            year: 'numeric',
                                                            month: 'numeric',
                                                            day: 'numeric',
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                            hour12: false,
                                                        }) 
                                                    : "Running..."}
                                                </p>
                                                <p className="after:content-['HRS'] after:ml-1 after:text-sm">
                                                    {hoursCalc(index)}
                                                </p>
                                                <p className="after:content-['CFS'] after:ml-1 after:text-sm">  
                                                    {schedule.order.approxCfs}
                                                </p>
                                                <p className="after:content-['AF'] after:ml-1 after:text-sm">
                                                    {deliveryAF(index)}
                                                </p>
                                            </div>
                                            <p className="">
                                                <span className="text-sm mr-1">
                                                    Delivery Note:
                                                </span>
                                                {delivery.deliveryNote}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="mt-2 flex justify-center gap-8">
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <Button variant={"outline"} size={"sm"} className="md:text-xl bg-neutral-300/90 dark:bg-slate-600/80 border-gray-600 dark:border-gray-500 shadow-md hover:animate-pulse font-semibold transform-gpu">
                                        Manage Deliveries 
                                        <FaHandHoldingWater className={"ml-1"} />
                                    </Button>
                                </DrawerTrigger>
                                <ManageDelivery
                                    schedule={schedule}
                                    className="md:text-xl"
                                />
                            </Drawer>
                            <OrderDetails schedule={schedule} className="text-sm md:text-xl" />
                        </div>
                    </div>    
                </div>
            </div>
        </div>
     );
}
 
export { ScheduledDeliveryCard };

function Number(startTime: Date) {
    throw new Error("Function not implemented.");
}
