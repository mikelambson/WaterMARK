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
import { calculateNewScheduleTimestamp, cn } from "@/lib/utils";
import ApiFetch from "@/lib/apiFetch";


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


    if (sourceId === '0' && destinationColumnId === sourceId) {
        toast({
            variant: "destructive",
            title: 'Invalid Destination',
            description: 'Cannot move unscheduled orders to the same column yet',
        });
        return;  
    } else if (sourceId === '1' && destinationColumnId === '0') {
        
        toast({
            title: 'Unschedule The Order',
            description: 'Doesn\'t work yet!!! \nRemoved the order from the scheduled column and unscheduled it. \n\n Must update the array of orders in the scheduled column.',
        });
        return;    
    }
    if (sourceId === '0' && destinationColumnId === '1') {
        
        console.log('Previous Order Time:', previousOrder ? previousOrder.scheduledDate : 'No Previous Order');
        draggedScheduleTime = calculateNewScheduleTime(previousOrder);
        console.log('Dragged Schedule Time:', draggedScheduleTime);
       
        const lineId = Number(selectedSheet.id);
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

        // toast({
        //     variant: "top_right",
        //     title: 'Order Scheduled',
        //     description: `Order ${draggedOrder?.orderNumber} has been successfully scheduled to ${selectedSheet.name} Head ${selectedHead} at ${new Date(draggedScheduleTime).toLocaleString()}.`,
        // });
    
    // Handle other drag and drop logic as needed
    // ...
    };

    if (sourceId === '1' && destinationColumnId === '1') {
        // Re-ordering within the same column
        const updatedSchedule = Array.from(schedule.columns).map(([key, value]) => ({ [key]: value }));
        const headID = Number(selectedHead) - 1;
        const isolatedScheduledColumn = updatedSchedule[headID][Number(selectedHead)].schedules;
        
        const subsequentSourceOrders = isolatedScheduledColumn.slice(source.index + 1);
        const draggedOrderIndex = isolatedScheduledColumn.findIndex(order => order.orderId === draggableOrderId);
        const updatedOrder = isolatedScheduledColumn[draggedOrderIndex];
        const updatedScheduleList = [
            ...isolatedScheduledColumn.slice(0, draggedOrderIndex),
            ...isolatedScheduledColumn.slice(draggedOrderIndex + 1),
        ];
        updatedScheduleList.splice(destinationColumnIndex, 0, updatedOrder);
        updatedSchedule[headID][Number(selectedHead)].schedules = updatedScheduleList;
        // console.log('Updated Schedule:', updatedSchedule);
        // Update the schedule state with the new order positions
        console.log({
            'Result': result,
            'Source Index:': source.index,
            'Destination Index:': destinationColumnIndex,
            'Isolated Scheduled Column:': isolatedScheduledColumn,
            'subsequentSourceOrders:': subsequentSourceOrders,
        });

        
        getSchedule(Number(selectedHead));
        getBoard(schedulingState);
    }

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
