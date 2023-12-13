// @/app/(scheduling)/_components/OrderCard.tsx
"use client"
import { Order, TypedColumn } from "@/typings";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "@hello-pangea/dnd";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import DragIcon from "@/app/scheduling/_components/schedule-orders/DragIcon";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useState } from "react";

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
            className={ cn(" rounded-md drop-shadow-md", isDarkMode ? "bg-gray-300" :"bg-slate-800")}
            {...draggableProps} {...dragHandleProps} ref={innerRef}
        >
            <div 
            className="grid grid-flow-row grid-rows-4 grid-cols-[2rem,1fr,1fr,1fr] 
            gap-0 rounded-sm align-text-bottom">
                
                <div className="col-start-1 row-start-1 row-span-4 pt-2">
                    {/* <RxDragHandleVertical className="align-middle" style={{ width: '28px', height: '100%', viewBox: '0 0 20 20' }} /> */}
                    <DragIcon className="h-full" />
                </div>
                {/* <div className="col-start-1 row-start-3 align-middle"><PiDotsSixVerticalBold size="28px" className="align-middle" /></div> */}

                <div className="col-span-3 text-bottom row-start-1 col-start-2 font-semibold">{order.laterals}</div>
                <div className={cn("col-span-3 text-bottom row-start-2 border-b-2 font-semibold", isDarkMode ? "text-lime-900/95" : " text-lime-400/50")}>{order.remarks}</div>

                
                <div className="col-start-1 row-start-4"></div>
                <div className={cn("row-span-2 col-start-2 row-start-3 border-r-2", isDarkMode ? "border-gray-200" : "border-gray-600" )}>{order.orderTimestamp}</div>
                <div className={cn("col-start-3 row-start-3 border-r-2 pl-1 font-medium", isDarkMode ? "border-gray-200" : "border-gray-600" )}>Order# {id}</div>
                <div className={cn("col-span-4 row-start-3 pl-1 font-medium", isDarkMode ? "border-gray-200" : "border-gray-600" )}>{order.approxCfs} CFS</div>
                <div className={cn("col-start-3 row-start-4 border-r-2 pl-1", isDarkMode ? "border-gray-200" : "border-gray-600" )}>{order.district} | {order.status}</div>
                
                <div
                    className={cn("col-start-4 row-start-4 pl-1 font-medium relative", isDarkMode ? "border-gray-200" : "border-gray-600" )}>{order.approxHrs} HRS <IoIosArrowDropdownCircle onClick={toggleDetailsVisibility} className="absolute bottom-1 right-1 cursor-pointer" />
                </div>
                <div className={`col-start-2 col-span-3 row-start-5 border-t-2 ${isDetailsVisible ? '' : 'hidden'}`}>
                    Irrigator: {order.details.irrigatorsName}<br />
                    Owner: {order.details.ownersName}<br />
                    Ordered AF: {order.details.approxAf}<br />
                    Balance: {order.details.balance}<br />
                </div>
                
                
                
            </div>
        </div>
     );
}
 
export default OrderCard;