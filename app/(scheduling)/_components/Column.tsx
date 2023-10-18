// @/app/(scheduling)/_components/Column.tsx

import { Order, TypedColumn } from "@/typings";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import OrderCard from "./OrderCard";

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
    return ( 
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                className='border'
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                style={{ maxHeight: '60vh'}} // Set max height and enable vertical scrollbar
                
            >
                {/* render droppable orders in the column*/}
                <Droppable droppableId={index.toString()} type="card">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`pb-2 p-2 rounded-2xl shadow-sm h-full overflow-y-auto ${snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"}`
                            }
                        >
                            <h2 className="pb-3">{columnNames[id]}</h2>
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