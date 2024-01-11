// UnscheduledTest.jsx
import { Order, TypedColumn } from "@/typings";
import { IoSearch } from "react-icons/io5";
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import OrderCard from "@/app/scheduling/_components/board/OrderCard";
import { cn } from "@/lib/utils";

type Properties = {
    id: TypedColumn,
    columns: Order[],
    index: number,  
}

const columnNames = {
  "unscheduled": "Unscheduled",
  "scheduled": "Scheduled"
};

const UnscheduledTest = ({id, columns, index}:Properties) => (
    <div className="relative w-full h-[33rem] bg-foreground/10 dark:bg-foreground/75 rounded-md pt-2 shadow-md">
    <Tabs defaultValue="unscheduled" className=" w-full h-full flex flex-col justify-center">
        <TabsList className={"w-[96%] mx-auto inline-flex flex-nowrap justify-between px-1 bg-stone-400 dark:bg-zinc-800 cursor-default"}>
            <div className="inline-flex">
            <TabsTrigger 
            key={1} 
            value={"unscheduled"}>
                {columnNames[id]}
            </TabsTrigger>
            
            <TabsTrigger 
            key={2} 
            value={"2"}>
                Delayed
            </TabsTrigger>
            </div>
            <div className="inline-flex">
            <IoSearch className="self-center -mr-5" /> 
            <Input type="filter" placeholder={"Filter Line"} className="pl-5 h-7 w-32 bg-background/60 self-center uppercase" />
            </div>
        </TabsList>
        <Droppable droppableId={index.toString()} type="card" >
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={cn("rounded-md h-[95%] shadow-md ", snapshot.isDraggingOver ? "bg-yellow-200/50" : "bg-transparent")}
                        
                    >
                        <TabsContent key={"1"} value={"unscheduled"}>
                            <div className="text-center -mt-2 text-sm font-bold italic text-foreground/50 dark:text-secondary/50 tracking-widest">
                            {columnNames[id]} Orders
                            </div>
{/* change Height below ==>  */}
                            <ScrollArea className="h-[28.5em] px-[0.5rem] rounded-md">
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
                            </ScrollArea>
                        </TabsContent>
                    </div>
                )}
        </Droppable>
        <TabsContent key={2} value={"2"}>
            <h2 className={" text-center text-2xl font-semibold text-foreground dark:text-secondary"}>
                Delayed
            </h2>
            
        </TabsContent>
    </Tabs>
    </div>
);

export default UnscheduledTest;
