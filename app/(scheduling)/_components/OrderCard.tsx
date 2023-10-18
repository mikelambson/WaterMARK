// @/app/(scheduling)/_components/OrderCard.tsx
"use client"
import { Order, TypedColumn } from "@/typings";
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from "@hello-pangea/dnd";

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
            className="bg-slate-800 rounded-md space-y-2 drop-shadow-md"
            {...draggableProps} {...dragHandleProps} ref={innerRef}
        >
            <h1>{order.orderTimestamp} | Index-{index} | Order# {id} | {order.laterals} | {order.district} | {order.approxCfs} cfs | {order.approxHrs} hrs</h1>
        </div>
     );
}
 
export default OrderCard;