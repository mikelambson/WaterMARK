// @/app/(scheduling)/_components/OrderCard.tsx
"use client"
import { Order, TypedColumn } from "@/typings";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "@hello-pangea/dnd";
import { PiDotsSixVerticalBold } from "react-icons/pi";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

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

    return ( 
        <div
            className={ cn(" rounded-md drop-shadow-md", isDarkMode ? "bg-gray-400" :"bg-slate-800")}
            {...draggableProps} {...dragHandleProps} ref={innerRef}
        >
            <div 
            className="grid grid-flow-row grid-rows-4 grid-cols-[2rem,1fr,1fr,1fr] gap-0 rounded-sm align-text-bottom"
            >
                <div></div>
                <div className="col-start-1 row-start-2 row-span-2 pt-[.6rem]"><PiDotsSixVerticalBold size="28px" className="align-middle" /></div>
                {/* <div className="col-start-1 row-start-3 align-middle"><PiDotsSixVerticalBold size="28px" className="align-middle" /></div> */}
                <div className="col-start-1 row-start-4"></div>
                <div className={cn("row-span-2 col-start-2 row-start-1 border-r-2 border-b-2", isDarkMode ? "border-gray-200" : "border-gray-600" )}>{order.orderTimestamp}</div>
                <div className={cn("border-r-2 col-start-3 row-start-1 pl-1", isDarkMode ? "border-gray-200" : "border-gray-600" )}>Order# {id}</div>
                <div className={cn("border-b-1 col-span-4 row-start-1 pl-1", isDarkMode ? "border-gray-200" : "border-gray-600" )}>{order.approxCfs} CFS</div>
                <div className={cn("border-r-2 border-b-2 col-start-3 row-start-2 pl-1", isDarkMode ? "border-gray-200" : "border-gray-600" )}>{order.district} | {order.status}</div>
                <div className={cn("border-b-2 col-start-4 row-start-2 pl-1", isDarkMode ? "border-gray-200" : "border-gray-600" )}>{order.approxHrs} HRS</div>
                <div className="col-span-3 text-bottom row-start-3">{order.laterals}</div>
                <div className={cn("col-span-3 text-bottom row-start-4 font-bold", isDarkMode ? "text-green-900" : "text-green-600")}>{order.remarks}</div>
                
            </div>
        </div>
     );
}
 
export default OrderCard;