// @/app/(scheduling)/_components/Column.tsx

import { Order, TypedColumn } from "@/typings";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import OrderCard from "@/app/scheduling/_components/schedule-orders/OrderCard";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type Properties = {
    id: TypedColumn,
    columns: Order[],
    index: number
}

const columnNames = {
    "P": "Unscheduled",
    "delayed": "Delayed",
    "scheduled": "Scheduled"
};

const Column = ({id, columns, index}: Properties) => {

    const { theme } = useTheme();
    const isDarkMode = theme === "light";

    return ( 
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                className="overflow-y-auto"
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                // style={{ maxHeight: '60vh'}} // Set max height and enable vertical scrollbar
                
            >
                {/* render droppable orders in the column*/}
                <Droppable droppableId={index.toString()} type="card">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`pb-2 p-2 rounded-sm shadow-sm md:min-h-[70vh] ${snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"}`
                            }
                        >
                            <h2 className={cn("pb-3 font-bold", isDarkMode ? "text-gray-500" : "text-slate-800")}>{columnNames[id]}</h2>
                            <div className="space-y-2">
                                {columns.map((order: any, index: any) => (
                                    <Draggable
                                        key={order.orderNumber.toString()}
                                        draggableId={order.orderNumber.toString()}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <OrderCard
                                                order={order}
                                                index={index}
                                                id={order.orderNumber}
                                                innerRef={provided.innerRef}
                                                draggableProps={provided.draggableProps}
                                                dragHandleProps={provided.dragHandleProps}
                                            />
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        </div>
                    )}
                </Droppable>
            </div>
            )}
        </Draggable>
     );
}
 
export default Column;