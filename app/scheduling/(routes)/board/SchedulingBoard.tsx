// Scheduling Board @\app\scheduling\_components\schedule-orders\SchedulingBoard.tsx
"use client";
import { useSchedulingStore } from "@/lib/store/schedulingStore";
import { useScheduleUpdateStore } from "@/lib/store/scheduleUpdateStore"
import { useEffect, useState } from 'react'; 
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Skeleton } from "@/components/ui/skeleton";

import ScheduledColumn from "@/app/scheduling/_components/board/ColumnScheduled";
import UnscheduledColumn from "@/app/scheduling/_components/board/ColumnUnscheduled";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import { TbRotateClockwise2 } from "react-icons/tb";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";


const SchedulingBoard = () => {
const { 
    board, 
    isLoading, 
    selectedSheet, 
    schedule, 
    getSchedule, 
    selectedHead
} = useSchedulingStore();

const { 
    destinationId, 
    destinationIndex, 
    draggedOrder, 
    previousOrder, 
    scheduleTime,
    subsequentOrders,
    setDestinationId,
    setDestinationIndex,
    setDraggedOrder,
    setPreviousOrder,
    setScheduleTime,
    setSubsequentOrders,
    updateScheduleData,
    updateData,
    resetData
} = useScheduleUpdateStore();
const [isDialogOpen, setDialogOpen] = useState(false);

const handleOnDragEnd =  async (result: any) => {
    let draggedScheduleTime: any;
    
    resetData(); 
    
    // Destructure the result object to get the source and destination
    const { 
        destination: draggedDestination, 
        source, 
        draggableId: draggableOrderId 
    } = result;
    const { 
        index: destinationColumnIndex, 
        droppableId: destinationColumnId 
    } = draggedDestination;
    const { droppableId: sourceId } = source;
    // Check if previousOrder exists
    const calculateNewScheduleTime = (previousOrder: any) => {
        if (!previousOrder) {
            return new Date().toISOString();
        }
        const scheduledDate = new Date(previousOrder.scheduledDate);
        const approxHrsMs = previousOrder.order.approxHrs * 3600000;
        const newTimeMs = scheduledDate.getTime() + approxHrsMs;
        const newISOTime = new Date(newTimeMs).toISOString();
        return newISOTime;   
    };
    draggedScheduleTime = calculateNewScheduleTime(previousOrder);


    const draggedOrder = Array.from(board.columns?.values() || []).flatMap(column => column.orders).find(order => order.id === draggableOrderId);
    // console.log(draggedOrder);

    if (sourceId === '0' && destinationColumnId === sourceId) {
        toast({
            variant: "destructive",
            title: 'Invalid Destination',
            description: 'Cannot move unscheduled orders to the same column',
        });
        return;  
    } else if (sourceId === '1' && destinationColumnId === '0') {
        toast({
            title: 'Unschedule The Order',
            description: 'Removed the order from the scheduled column and unscheduled it. \n\n Must update the array of orders in the scheduled column.',
        });
        return;    
    }
    if (destinationColumnId === "1") {
        const scheduledColumn = Array.from(schedule.columns).map(([key, value]) => ({ [key]: value }));
        const headID = Number(selectedHead) - 1;
        const previousOrder = scheduledColumn[headID][Number(selectedHead)].schedules[destinationColumnIndex - 1];
        const isolatedScheduledColumn = scheduledColumn[headID][Number(selectedHead)].schedules;
        const draggedSubsequentOrders = isolatedScheduledColumn.slice(destinationColumnIndex);
            
        
            
        console.log('Post Dragged Data:', {
            'Array': isolatedScheduledColumn,
            'Subsequent Orders:': draggedSubsequentOrders,
            'Destination Column': destinationColumnId,
            'Destination Index': destinationColumnIndex,
        });

        console.log('Dragged Schedule Time:', draggedScheduleTime);
        setScheduleTime(draggedScheduleTime);
        setDestinationId(Number(destinationColumnId));
        setDestinationIndex(destinationColumnIndex);
        setPreviousOrder(previousOrder);
        setDraggedOrder(Number(draggableOrderId));
        setSubsequentOrders(isolatedScheduledColumn.slice(destinationColumnIndex));
        updateData(
            {
                orderId: draggableOrderId,
                headsheetId: selectedSheet.id,
                head: Number(selectedHead),
                scheduledTime: draggedScheduleTime,
                travelTime: 0,
            },
            draggedOrder?.approxHrs || 0,
            [
            ...subsequentOrders.map((order) => ({
                orderId: order.orderId,
                newScheduleTimestamp: order.scheduledDate,
            }))
            ]
        );
        setTimeout(() => {
            console.log('updateData:', updateScheduleData);
        }, 2000);
        
        getSchedule(Number(selectedHead));

        toast({
            variant: "top_right",
            title: 'Order Scheduled',
            description: `Order ${draggedOrder?.orderNumber} has been successfully scheduled to ${selectedSheet.name} Head ${selectedHead} at ${new Date(draggedScheduleTime).toLocaleString()}.`,
        });
    
    // Handle other drag and drop logic as needed
    // ...
};

destinationColumnIndex === 0 
        ? setDialogOpen(true) : null;

        // You can now update the order status using your API or store methods
        // Example: updateOrderStatus(orderId, newStatus);
        // ...

        // After updating the order status, trigger a re-fetch or re-render if needed
        // Example: refetchData();
        // ...
        
        getSchedule(Number(selectedHead));
        }


if (isLoading) {
    return (
        <div 
            className={`w-full lg:max-w-full flex flex-col lg:grid 
                        grid-cols-1 lg:grid-cols-[2fr,3fr] gap-2 pr-2 mx-auto`} 
        >
            <Skeleton className="h-[82svh]" />
            <Skeleton className="h-[82svh]" />

        </div>
    );
}

return (
    <div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable 
                droppableId="id" 
                direction="vertical" 
                type="column"
            >
                {(provided) => (
                    <div
                    aria-label="unscheduled"
                    className="w-full lg:max-w-full flex flex-col lg:grid grid-cols-1 lg:grid-cols-[2fr,3fr] gap-2 px-2 mx-auto"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    >
                    {/* Render Unscheduled and Scheduled Columns within the same set of tabs */}
                    <UnscheduledColumn
                        id="unscheduled"
                        columns={[
                        ...(board.columns?.get('unscheduled')?.orders || []),
                        ...(board.columns?.get('delayed')?.orders || []),
                        ]}
                        index={0}
                    />
                    <ScheduledColumn
                        id="scheduled"
                        index={1}
                    />
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    
        <Dialog 
            open={isDialogOpen} 
            onOpenChange={setDialogOpen}
        > 
            {/* <DialogTrigger onClick={() => setDialogOpen(true)}>Open</DialogTrigger> */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Travel Time
                    </DialogTitle>
                    <DialogDescription className="p-3 inline-flex items-center">
                        <Label className="z-10 pl-1">
                            <TbRotateClockwise2 size={20} />
                            </Label>
                        <Input placeholder={'hours'} className="-ml-7 z-0 pl-10" />
                    </DialogDescription>
                    <DialogTitle>
                        Instructions</DialogTitle>
                    <DialogDescription className="p-3">
                        <Textarea placeholder={'Enter Instructions'} />
                    </DialogDescription>
                </DialogHeader>
                <DialogClose onClick={() => setDialogOpen(false)} />
                <div className="flex justify-end gap-2">
                    <Button 
                        variant={"destructive"} 
                        onClick={() => setDialogOpen(false)} 
                        className="btn btn-secondary">
                            Cancel
                        </Button>
                    <Button 
                        onClick={() => {
                            setDialogOpen(false)
                            getSchedule(Number(selectedHead));
                        }} 
                        className="btn btn-primary">
                            Confirm
                        </Button>
                </div>
            </DialogContent>
        </Dialog>
    </div>
);
};

export default SchedulingBoard;
