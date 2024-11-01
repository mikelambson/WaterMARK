// Scheduling Board @\app\scheduling\_components\schedule-orders\SchedulingBoard.tsx
"use client";
import { useSchedulingStore } from "@/lib/store/schedulingStore";
import { useScheduleUpdateStore } from "@/lib/store/scheduleUpdateStore"
import { useEffect, useState } from 'react'; 
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Skeleton } from "@/components/ui/skeleton";

import ScheduledColumn from "@/features/scheduling/board/ColumnScheduled";
import UnscheduledColumn from "@/features/scheduling/board/ColumnUnscheduled";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label";
import { TbRotateClockwise2 } from "react-icons/tb";
import { toast } from "@/components/ui/use-toast";
import { calculateNewScheduleTimestamp, cn } from "@/lib/utils";
import ApiFetch from "@/lib/apiFetch";
import { TypedScheduled, TypedUnscheduled } from "@/typings";


const SchedulingBoard = () => {
    const { board, isLoading, setPage, setPageSize, totalPages, getBoard, page, pageSize, selectedDistrict, setSelectedDistrict, setDistrict, headsheets, selectedSheet, getHeadsheets, setSelectedSheet, setSelectedHead, selectedHead, schedule, getSchedule, updateOrderStatus, getUnscheduled} = useSchedulingStore();

const schedulingState = {
    board,
    isLoading,
    selectedDistrict,
    page,
    pageSize,
    totalPages,
    setSelectedDistrict,
    setPage,
    setPageSize,
    setDistrict,
    headsheets,
    selectedSheet,
    getHeadsheets,
    setSelectedSheet,
    setSelectedHead,
    getBoard,
    selectedHead,
    schedule,
    getSchedule,
    updateOrderStatus,
    getUnscheduled
};
const [isDialogOpen, setDialogOpen] = useState(false);

const apiFetch = new ApiFetch();


const handleOnDragEnd =  async (result: any) => {
    let draggedScheduleTime: any;   
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
    const {  } = source;
    
    // Check if previousOrder exists
    const draggedOrder = Array.from(board.columns?.values() || []).flatMap(column => column.orders).find(order => order.id === draggableOrderId);
    // console.log(draggedOrder);

    const scheduledColumn = Array.from(schedule.columns).map(([key, value]) => ({ [key]: value }));
    const headID = Number(selectedHead) - 1;
    const previousOrder = scheduledColumn[headID][Number(selectedHead)].schedules[destinationColumnIndex - 1];
    const isolatedScheduledColumn = scheduledColumn[headID][Number(selectedHead)].schedules;
    const draggedSubsequentOrders = isolatedScheduledColumn.slice(destinationColumnIndex);

    const calculateNewScheduleTime = (previousOrder: any) => {
        if (!previousOrder) {
            setDialogOpen(true)
            return new Date().toISOString();
        }
        const scheduledDate = new Date(previousOrder.scheduledDate);
        const approxHrsMs = previousOrder.order.approxHrs * 3600000;
        const newTimeMs = scheduledDate.getTime() + approxHrsMs;
        const newISOTime = new Date(newTimeMs).toISOString();
        return newISOTime;   
    };

    if (sourceId === '0' && destinationColumnId === '0') {
        toast({
            variant: "destructive",
            title: 'Invalid Destination',
            description: 'Cannot move unscheduled orders to the same column yet',
        });
        return;    
    }
    if (sourceId === '0' && destinationColumnId === '1') {
        draggedScheduleTime = calculateNewScheduleTime(previousOrder);
        const lineId = Number(selectedSheet.id);

        // Initialize update list with the dragged order's new schedule
        const updateList = [
            {
                orderId: draggableOrderId,
                scheduledLineId: lineId,
                scheduledHead: Number(selectedHead),
                scheduledDate: draggedScheduleTime,
                order: {
                    status: 'scheduled',
                },
                travelTime: 0,
            },            
            ...draggedSubsequentOrders.map((order) => ({
                orderId: order.orderId,
                scheduledDate: calculateNewScheduleTimestamp(order.scheduledDate, draggedOrder?.approxHrs || 0),
            }))
        ];

    console.log('Dragged\n\nUpdate Data:', updateList);

        for (const scheduleData of updateList) {
            const { orderId, ...requestData } = scheduleData;
            console.log('Request Data:', requestData);
            try {
                const response = await apiFetch.updateData(`schedule/${orderId}`, requestData);
                console.log('Response:', response);
            } catch (error) {
                console.error('Error Updating Schedule:', error);
            }
        }

        getBoard(schedulingState);
        getSchedule(Number(selectedHead));

        toast({
            variant: "top_right",
            title: 'Order Scheduled',
            description: `Order ${draggedOrder?.orderNumber} has been successfully scheduled to ${selectedSheet.name} Head ${selectedHead} at ${new Date(draggedScheduleTime).toLocaleString()}.`,
        });
    
    // Handle other drag and drop logic as needed
    // ...
    };
 if (sourceId === '1' && destinationColumnId === '1') {
     // Reorder the items in the column
     const headID = Number(selectedHead);
     if (!headID) {
        console.error('Error: headID is undefined.')
        console.error(headID)
        return
     }
     let isolatedScheduledColumn;

     if (headID) {isolatedScheduledColumn = schedule.columns.get(headID)?.schedules;}

     if (!isolatedScheduledColumn) {
        console.error('Error: isolatedScheduledColumn is undefined.');
        return;
    }
 
    // Locate and extract the dragged order
    const draggedOrderIndex = isolatedScheduledColumn.findIndex(order => order.orderId === draggableOrderId);
    
    // Ensure draggedOrderIndex is valid
    if (draggedOrderIndex === -1) {
        console.error('Error: dragged order not found in isolatedScheduledColumn.');
        return;
    }

    const draggedOrder = isolatedScheduledColumn[draggedOrderIndex];
 
     // Create the reordered column list
     const reorderedColumn = [
         ...isolatedScheduledColumn.slice(0, draggedOrderIndex),
         ...isolatedScheduledColumn.slice(draggedOrderIndex + 1),
     ];
     reorderedColumn.splice(destinationColumnIndex, 0, draggedOrder);
 
     // Update the board state with the reordered column
     const updatedSchedule = new Map(schedule.columns);
     const updatedBoardColumns: Map<string, TypedUnscheduled> = new Map(
        Array.from(updatedSchedule).map(([key, value]) => [String(key), value as unknown as TypedUnscheduled])
    );
     // Update the board state with the transformed column map
    schedulingState.board = { ...board, columns: updatedBoardColumns };
 
     // Step 1: Insert the dragged order at its new position in reorderedColumn
    const updateList = reorderedColumn.map((order, index) => {
        // Calculate the new start time based on the previous order’s end time
        if (index === 0) {
            // First order in the list, set its start time as is (or a base time)
            order.scheduledDate = calculateNewScheduleTimestamp(order.scheduledDate, 0);
        } else {
            // For each subsequent order, calculate start time based on the previous order's end time
            const previousOrder = reorderedColumn[index - 1];
            const previousOrderDuration = previousOrder.order.approxHrs + previousOrder.travelTime;
            const previousEndTime = calculateNewScheduleTimestamp(
                previousOrder.scheduledDate,
                previousOrderDuration
            );
            
            // Set the start time for the current order
            order.scheduledDate = previousEndTime;
        }

        return {
            orderId: order.orderId,
            scheduledLineId: Number(selectedSheet.id),
            scheduledHead: Number(selectedHead),
            scheduledDate: order.scheduledDate,
            order: {
                status: 'scheduled',
            },
            travelTime: order.travelTime || 0,
        };
    });
    // Update each schedule through the API
    for (const scheduleData of updateList) {
        const { orderId, ...requestData } = scheduleData;
        console.log('Request Data:', requestData);
        try {
            const response = await apiFetch.updateData(`schedule/${orderId}`, requestData);
            console.log('Response:', response);
        } catch (error) {
            console.error('Error Updating Schedule:', error);
        }
    }
 
    // Refresh board and schedule state
    getBoard(schedulingState);
    getSchedule(Number(selectedHead));
    }

    if (sourceId === '1' && destinationColumnId === '0') {
        
    // setDialogOpen(true) 
    // Step 1: Isolate the scheduled column and dragged order
    const headID = Number(selectedHead);
    if (!headID) {
        console.error('Error: headID is undefined.');
        return;
    }

    const isolatedScheduledColumn = schedule.columns.get(headID)?.schedules;
    if (!isolatedScheduledColumn) {
        console.error('Error: isolatedScheduledColumn is undefined.');
        return;
    }

    // Locate the dragged order in the column
    const draggedOrderIndex = isolatedScheduledColumn.findIndex(order => order.orderId === draggableOrderId);
    if (draggedOrderIndex === -1) {
        console.error('Error: dragged order not found in isolatedScheduledColumn.');
        return;
    }

    const draggedOrder = isolatedScheduledColumn[draggedOrderIndex];
    try {
        await apiFetch.updateData(`schedule/${draggedOrder.orderId}`, {
            orderId: draggedOrder.orderId,
            scheduledLineId: null,
            scheduledHead: null,
            scheduledDate: null,
            order: {
                status: 'delayed',
            },
            travelTime: 0,
        });
        console.log(`Order ${draggedOrder.orderId} marked as delayed.`);
    } catch (error) {
        console.error(`Error updating status to delayed for order ${draggedOrder.orderId}:`, error);
    }

    // Step 3: Adjust subsequent orders by subtracting the delayed order's duration
    const delayedOrderDuration = draggedOrder.order.approxHrs || 0;
    const subsequentOrders = isolatedScheduledColumn.slice(draggedOrderIndex + 1);

    for (const order of subsequentOrders) {
        // Adjust each order’s start time by subtracting the delayed order's duration
        order.scheduledDate = calculateNewScheduleTimestamp(order.scheduledDate, -delayedOrderDuration);

        try {
            await apiFetch.updateData(`schedule/${order.orderId}`, {
                scheduledDate: order.scheduledDate,
                travelTime: order.travelTime || 0,
            });
            console.log(`Order ${order.orderId} rescheduled after delay adjustment.`);
        } catch (error) {
            console.error(`Error updating subsequent order ${order.orderId}:`, error);
        }
    }
        getBoard(schedulingState);
        getSchedule(Number(selectedHead));
    } else { null }
    
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
