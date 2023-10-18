// @/app/(scheduling)/_components/Column.tsx

import { Order, TypedColumn } from "@/typings";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import OrderCard from "./OrderCard";

type Properties = {
    id: TypedColumn,
    columns: Order[],
    index: number
}

const Column = ({id, columns, index}: Properties) => {
    return ( 
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                className='grid grid-cols-1 md:grid-cols-3 gap-1 max-w-7xl mx-auto'
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                {/* render droppable orders in the column*/}
                <Droppable droppableId={index.toString()} type="card">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`pb-2 p-2 rounded-2xl shadow-sm w-64 ${snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"}`
                            }
                        >
                            <h2>{id}</h2>
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