// @/app/(scheduling)/_components/Column.tsx

import { Order, TypedColumn } from "@/typings";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import OrderCard from "@/app/scheduling/_components/schedule-orders/OrderCard";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import TabbedColumn from "./TabbbedColumn";
import { Input } from "@/components/ui/input";



type Properties = {
    id: TypedColumn,
    columns: Order[],
    index: number,
    tabnumber: number,
}

const columnNames = {
    "P": "Unscheduled",
    "delayed": "Delayed",
    "scheduled": "Scheduled"
};

const Column = ({id, columns, index, tabnumber}: Properties) => {


    return ( 
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                className="overflow-y-auto h-full"
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
                            className={cn("pb-2 p-2 rounded-md shadow-md h-70dvh md:min-h-[70vh]", snapshot.isDraggingOver ? "bg-yellow-200/50" : "bg-foreground/10 dark:bg-foreground/80")}
                            
                        >
                            {index === 0 ? 
                                <div className="h-5 flex flex-row gap-2 mb-2">
                                    <h2 className={"pb-3 font-bold text-gray-500 dark:text-slate-800"}>
                                        {columnNames[id]}:
                                    </h2>
                                    <Input type="filter" placeholder="Filter Orders" className="h-5 w-40 bg-background/60" />
                            </div> : 
                            index ===1 ? <TabbedColumn tabs={tabnumber} /> : 
                            <div className="h-5 flex flex-row gap-2 mb-2">
                                    <h2 className={"pb-3 font-bold text-gray-500 dark:text-slate-800"}>
                                        {columnNames[id]}:
                                    </h2>
                                    <Input type="filter" placeholder="Filter Orders" className="h-5 w-40 bg-background/60" />
                            </div> }

                            <div className="space-y-2"> 
                                {/* {index ===1 ? <TabbedColumn tabs={tabnumber} /> : <></>} */}
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