// @/app/(scheduling)/_components/OrderCard.tsx
"use client"
import { Order, TypedColumn } from "@/typings";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "@hello-pangea/dnd";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import DragIcon from "@/app/scheduling/_components/schedule-orders/DragIcon";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { Button } from "@/components/ui/button";

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
    index,
    id,
    innerRef,
    draggableProps,
    dragHandleProps,
}: Properties) => {

    const { theme } = useTheme();
    const isDarkMode = theme === "light";
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    const toggleDetailsVisibility = () => {
        setIsDetailsVisible(!isDetailsVisible);
    };

    return ( 
        <div
            className={ cn(" rounded-md drop-shadow-md", isDarkMode ? "bg-slate-300" :"bg-gray-800")}
            {...draggableProps} {...dragHandleProps} ref={innerRef}
        >
            <div className="grid grid-flow-row grid-rows-4 grid-cols-[2rem,1fr,2fr,1fr] 
            gap-0 rounded-sm align-text-bottom">
                <div className={cn("col-start-1 row-start-1 row-span-4 pt-6", isDarkMode ? "text-gray-400" : "text-gray-700")}>
                    <DragIcon />
                </div>
                <div className="col-span-3 text-bottom row-start-1 col-start-2 text-foreground/80 font-semibold">{order.laterals}</div>
                <div className={cn("col-span-3 text-bottom row-start-2 border-b-2 font-semibold", isDarkMode ? "text-lime-900/95 border-gray-200" : " text-lime-400/40 border-gray-600")}>{order.remarks}</div>
                <div className="col-start-1 row-start-4"></div>
                <div className={cn("row-span-2 col-start-2 row-start-3 border-r-2 text-sm pt-2", isDarkMode ? "border-gray-200" : "border-gray-600" )}>{order.orderTimestamp}</div>
                <div className={cn("col-start-3 row-start-3 border-r-2 pl-1 font-medium", isDarkMode ? "border-gray-200" : "border-gray-600" )}>Order# {id}</div>
                <div className={cn("col-span-4 row-start-3 pl-1 font-medium", isDarkMode ? "border-gray-200" : "border-gray-600" )}>{order.approxCfs} CFS</div>
                <div className={cn("col-start-3 row-start-4 border-r-2 pl-1", isDarkMode ? "border-gray-200" : "border-gray-600" )}>{order.district} | {order.status}</div>
                <div
                    className={cn("col-start-4 row-start-4 pl-1 font-medium relative", isDarkMode ? "border-gray-200" : "border-gray-600" )}>{order.approxHrs} HRS 
                        <div  onClick={toggleDetailsVisibility} 
                        className={cn("absolute bottom-1 right-1 hover:text-xl cursor-pointer", isDarkMode ? "hover:text-amber-700": "hover:text-amber-400")}>
                            {isDetailsVisible ? (<IoIosArrowDropupCircle />) : (<IoIosArrowDropdownCircle />)}
                        </div>
                </div>
                <div className={`col-start-1 col-span-4 row-start-5 relative overflow-hidden transition-all ${isDetailsVisible ? cn("h-auto opacity-100 border-t-2 rounded-b-md drop-shadow-md", isDarkMode ? "border-gray-200" : "border-gray-600") : 'h-0 opacity-0'} duration-300 ease-in-out`}>
                    <div className={cn("p-1 ", isDarkMode ? "bg-stone-300" :"bg-stone-800/40")}>
                    Irrigator: {order.details.irrigatorsName}<br />
                    Owner: {order.details.ownersName}<br />
                    Ordered AF: {order.details.approxAf}<br />
                    Balance: {order.details.balance}<br />
                    </div>
                    <Button variant={"secondary"} size={"icon"} className="absolute bottom-2 right-2 bg-slate-700/20">
                        <IoIosArrowForward />
                    </Button>
                </div>
            </div>
        </div>
     );
}
 
export default OrderCard;