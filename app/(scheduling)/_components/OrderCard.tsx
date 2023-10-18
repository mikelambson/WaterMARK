// @/app/(scheduling)/_components/OrderCard.tsx
"use client"
import { Order, TypedColumn } from "@/typings";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "@hello-pangea/dnd";
import { PiDotsSixVerticalBold } from "react-icons/pi";

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
    return ( 
        <div
            className="bg-slate-800 rounded-md drop-shadow-md"
            {...draggableProps} {...dragHandleProps} ref={innerRef}
        >
            <div 
            className="grid grid-flow-row grid-rows-4 grid-cols-[2rem,1fr,1fr,1fr] gap-0 rounded-sm align-text-bottom"
            >
                <div></div>
                <div className="col-start-1 row-start-2 row-span-2 pt-[.6rem]"><PiDotsSixVerticalBold size="28px" className="align-middle" /></div>
                {/* <div className="col-start-1 row-start-3 align-middle"><PiDotsSixVerticalBold size="28px" className="align-middle" /></div> */}
                <div className="col-start-1 row-start-4"></div>
                <div className="row-span-2 col-start-2 row-start-1 border-r-2 border-b-2 border-gray-400 ">{order.orderTimestamp}</div>
                <div className="border-r-2 border-gray-400 col-start-3 row-start-1 pl-1">Order# {id}</div>
                <div className="border-b-1 border-gray-400 col-span-4 row-start-1 pl-1">{order.approxCfs} CFS</div>
                <div className="border-r-2 border-b-2 border-gray-400 col-start-3 row-start-2 pl-1">{order.district} | {order.status}</div>
                <div className="border-b-2 border-gray-400 col-start-4 row-start-2 pl-1">{order.approxHrs} HRS</div>
                <div className="col-span-3 text-bottom row-start-3">{order.laterals}</div>
                <div className="col-span-3 text-bottom row-start-4">{order.remarks}</div>
                
            </div>
        </div>
     );
}
 
export default OrderCard;