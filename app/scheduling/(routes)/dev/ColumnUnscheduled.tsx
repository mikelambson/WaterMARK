// UnscheduledColumn.jsx
import { Order, TypedColumn } from "@/typings";
import { IoSearch } from "react-icons/io5";
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import OrderCard from "@/app/scheduling/_components/board/OrderCard";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { useSchedulingStore } from "@/lib/store/schedulingStore";

type Properties = {
    id: TypedColumn,
    columns: Order[],
    index: number,  
}

const columnNames = {
  "unscheduled": "Unscheduled",
  "scheduled": "Scheduled"
};


const pageNumbers = Array.from({ length: 6 }, (_, index) => index + 1);


const UnscheduledColumn = ({ id, columns, index }: Properties) => {
    const { page, setPage, } = useSchedulingStore();

    // Step 1: Add State for Filter Value
    const [filterValue, setFilterValue] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Assuming the initial page is 1
  
    const handlePageChange = (page:number) => {
      setCurrentPage(page);
      setPage(page);
    };
    
    // Step 2: Update Order Mapping
    const filteredOrders = filterValue
    ? columns.filter((order) =>
        order.laterals.some((lateral) =>
          lateral.toUpperCase().startsWith(filterValue.toUpperCase())
        )
      )
    : columns;
    
    return (
    <div className="relative w-full min-h-96 h-[84svh] p-2 px-2 overflow-visible bg-foreground/10 dark:bg-foreground/75 rounded-md  shadow-md">
    <Tabs defaultValue="unscheduled" className="w-full h-full pb-8">
        <TabsList className={"w-full inline-flex flex-nowrap justify-between px-1 bg-stone-400 dark:bg-zinc-800 cursor-default"}>
            <div className="inline-flex">
            <TabsTrigger 
            key={("unscheduledtrigger" + 1)} 
            value={"unscheduled"}>
                {columnNames[id]}
            </TabsTrigger>
            
            <TabsTrigger 
            key={("unscheduledtrigger" + 2)} 
            value={"2"}>
                Delayed
            </TabsTrigger>
            </div>
            <div className="inline-flex">
                <IoSearch className="self-center -mr-5" /> 
                <Input 
                    id="unscheduledFilter"
                    type="filter"
                    placeholder={"Filter Line"}
                    className="pl-5 h-7 w-24 sm:w-32 mr-1 bg-background/60 self-center uppercase text-[10px] sm:text-sm md:text-md"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                />
            </div>
        </TabsList>
        <Droppable droppableId={"0"} type="card" >
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={cn("h-full rounded-md -mx-2 pb-8 border border-transparent", snapshot.isDraggingOver ? "bg-yellow-200/50" : "bg-transparent")}
                        
                    >
                        <TabsContent key={"unscheduled1content"} value={"unscheduled"} className="h-full mt-1 w-full">
                            <div className="text-center text-sm font-bold text-foreground/50 dark:text-secondary/50">
                                <Pagination className="mb-1 h-6 transition-colors">
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious 
                                                href={"#"} 
                                                size={"pagination"} 
                                                onClick={() => {
                                                    if (page == 1) return;
                                                    const previous = page - 1;
                                                    handlePageChange(previous)}
                                                }
                                                // {currentPage === 1 && ruturn "disabled"}
                
                                            />
                                        </PaginationItem>
                                        {pageNumbers.map((pageNumber) => (
                                            <PaginationItem key={pageNumber}>
                                                <PaginationLink
                                                        isActive={pageNumber === currentPage}
                                                        onClick={() => handlePageChange(pageNumber)} 
                                                        href={"#"}
                                                        size={"pagination"}
                                                >
                                                {pageNumber}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                        <PaginationItem>
                                            <PaginationNext 
                                                href="#" 
                                                size={"pagination"}
                                                onClick={() => {
                                                    if (page == pageNumbers.length) return;
                                                    const next = page + 1;
                                                    handlePageChange(next)}
                                                }
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
{/* change Height below ==>  */}
                            <ScrollArea className="min-h-96 h-full w-full px-[0.5rem] rounded-md">
                                <div className="space-y-2">
                                        {filteredOrders.map((order: any, index: any) => (
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
        <TabsContent key={"unscheduled2content"} value={"2"}>
            <h2 className={" text-center text-2xl font-semibold text-foreground dark:text-secondary"}>
                Delayed
            </h2>
            
        </TabsContent>
    </Tabs>
    </div>

)}

export default UnscheduledColumn;
