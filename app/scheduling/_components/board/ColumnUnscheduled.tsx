// UnscheduledColumn.jsx
import { useSchedulingStore } from "@/lib/store/schedulingStore";
import { Order, Schedule } from "@/typings";
import { IoSearch } from "react-icons/io5";
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/app/scheduling/_components/board/scroll-area";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import OrderCard from "@/app/scheduling/_components/board/OrderCard";
import { cn } from "@/lib/utils";
import { useState } from "react";
import PaginationComponent from "./getPage";


type Properties = {
    id: string; // Adjust type based on your data
    columns: (Order | Schedule)[]; // Adjust type based on your data
    index: number;
  };

  const columnNames: { [key: string]: string } = {
    unscheduled: 'Pending',
    delayed: 'Delayed',
  };


const pageNumbers = Array.from({ length: 6 }, (_, index) => index + 1);



const UnscheduledColumn = ({ id, columns, index }: Properties) => {
    const { page, setPage, } = useSchedulingStore();

    // Step 1: Add State for Filter Value
    const [filterValue, setFilterValue] = useState('');
    const currentPage = page;
  
    const handlePageChange = (page:number) => {
      setPage(page);
    };
    
    // Step 2: Update Order Mapping

     // Separate arrays for "unscheduled" and "delayed" orders
    const unscheduledOrders: Order[] = [];
    const delayedOrders: Order[] = [];

    // Loop through columns and categorize orders based on status
    columns.forEach((item) => {
        if ('status' in item) {
            if (item.status === 'P') {
                unscheduledOrders.push(item);
            } else if (item.status === 'delayed') {
                delayedOrders.push(item);
            }
        } else if ('status' in item.order) {
            if (item.order.status === 'P') {
                unscheduledOrders.push(item.order);
            } else if (item.order.status === 'delayed') {
                delayedOrders.push(item.order);
            }
        }
        // Handle other cases if necessary
    });

    // Step 3: Update Order Filtering
    // Apply additional filtering based on lateral and create separate filtered arrays
    const filteredUnscheduledOrders = filterValue
        ? unscheduledOrders.filter((order) =>
            order.laterals.some((lateral: string) =>
            lateral.toUpperCase().startsWith(filterValue.toUpperCase())
            )
        )
        : unscheduledOrders;

    const filteredDelayedOrders = filterValue
        ? delayedOrders.filter((order) =>
            order.laterals.some((lateral: string) =>
            lateral.toUpperCase().startsWith(filterValue.toUpperCase())
            )
        )
        : delayedOrders;

    
    return (
        <div className="relative w-full min-h-96 h-[84svh] p-2 px-2 overflow-visible bg-foreground/10 dark:bg-foreground/75 rounded-md shadow-md">
            <Tabs defaultValue="unscheduled" className="w-full h-full pb-8">
                <TabsList className={'w-full inline-flex flex-nowrap justify-between px-1 bg-stone-400 dark:bg-zinc-800 cursor-default'}>
                <div className="inline-flex">
                    <TabsTrigger key={`trigger-unscheduled`} value={"unscheduled"}>
                        {`${columnNames.unscheduled} (${filteredUnscheduledOrders.length})`}
                    </TabsTrigger>
                    <TabsTrigger key={`trigger-delayed`} value={"delayed"}>
                        {`${columnNames.delayed} (${filteredDelayedOrders.length})`}
                    </TabsTrigger>
                    {/* Add additional tabs as needed */}
                </div>
                <div className="inline-flex">
                    <IoSearch className="self-center -mr-5" />
                    <Input
                    id={`filter-${id}`}
                    type="filter"
                    placeholder={'Filter Line'}
                    className="pl-5 h-7 w-24 sm:w-32 mr-1 bg-background/60 self-center uppercase text-[10px] sm:text-sm md:text-md"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                    />
                </div>
                </TabsList>
                <Droppable droppableId={"0"} type="card">
                    {(provided, snapshot) => (
                        <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={cn("h-full rounded-md -mx-2 pb-8 border border-transparent",
                            snapshot.isDraggingOver ? "bg-yellow-200/50" : "bg-transparent")}
                        >
                            <TabsContent key={`unscheduled-content`} value={"unscheduled"} className="h-full mt-1 w-full">
                                <div className="text-center text-sm font-bold text-foreground/50 dark:text-secondary/50">
                                    <PaginationComponent
                                    page={page}
                                    pageNumbers={pageNumbers}
                                    currentPage={currentPage}
                                    handlePageChange={handlePageChange}
                                    key={`unscheduled-pagination`}
                                    />
                                </div>
                                {/* Change Height below ==>  */}
                                <ScrollArea 
                                    ref={provided.innerRef}
                                    autoScroll
                                    {...provided.droppableProps}
                                    className="min-h-80 h-[98%] w-full px-[0.5rem] rounded-md">
                                    <div className="space-y-2">
                                        {filteredUnscheduledOrders.map((order: Order, index: any) => (
                                            <Draggable
                                            key={order.id}
                                            draggableId={order.id}
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

                            <TabsContent key={`delayed-content`} value={"delayed"} className="h-full mt-1 w-full">
                                <div className="text-center text-sm font-bold text-foreground/50 dark:text-secondary/50">
                                <PaginationComponent
                                    page={page}
                                    pageNumbers={pageNumbers}
                                    currentPage={currentPage}
                                    handlePageChange={handlePageChange}
                                    key={`delayed-content`}
                                    />
                                </div>
                                {/* Change Height below ==>  */}
                                <ScrollArea autoScroll className="min-h-96 h-full w-full px-[0.5rem] rounded-md">
                                    <div className="space-y-2">
                                    {filteredDelayedOrders.map((delayedOrder: Order, index: any) => (
                                        <Draggable
                                        key={delayedOrder.id}
                                        draggableId={delayedOrder.id}
                                        index={index}
                                        >
                                        {(provided) => (
                                            <OrderCard
                                            order={delayedOrder}
                                            index={index}
                                            id={delayedOrder.orderNumber}
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
            </Tabs>
        </div>
    );
}      

    
export default UnscheduledColumn;
