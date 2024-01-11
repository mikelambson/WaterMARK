// @/app/(scheduling)/_components/Column.tsx

import { Order, TypedColumn } from "@/typings";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import OrderCard from "@/app/scheduling/_components/board/OrderCard";
import { cn } from "@/lib/utils";
import ScheduledColumn from "./ScheduledColumn";
import { Input } from "@/components/ui/input";
import UnscheduledColumn from "./UnscheduledColumn";
import { ScrollArea } from "@/components/ui/scroll-area";



type Properties = {
    id: TypedColumn,
    columns: Order[],
    index: number,
    
}

const columnNames = {
    "unscheduled": "Unscheduled",
    "scheduled": "Scheduled"
};

const Columns = ({id, columns, index }: Properties) => {


    return ( 
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                className="overflow-hidden h-full"
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                // style={{ maxHeight: '60vh'}} // Set max height and enable vertical scrollbar
                
            >
                {/* render droppable orders in the column*/}
               
                <Droppable droppableId={index.toString()} type="card" >
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={cn(" rounded-md shadow-md h-[82dvh] relative", snapshot.isDraggingOver ? "bg-yellow-200/50" : "bg-foreground/10 dark:bg-foreground/80")}
                            
                        >
                            {index === 0 ? 
                                <UnscheduledColumn id={id} /> : 
                            <ScheduledColumn /> }
                             <ScrollArea className="h-full rounded-md absolute p-2 -top-[74.5dvh]">
                            <div className=" space-y-2">
                                 
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
                            </ScrollArea>
                        </div>
                    )} 
                </Droppable>
                
            </div>
            )}
        </Draggable>
     );
}
 
export default Columns;