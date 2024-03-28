// Scheduling Board @\app\scheduling\_components\schedule-orders\SchedulingBoard.tsx
"use client";
import { useSchedulingStore } from "@/lib/store/schedulingStore";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Skeleton } from "@/components/ui/skeleton";

import ScheduledColumn from "@/app/scheduling/_components/board/ColumnScheduled";
import UnscheduledColumn from "@/app/scheduling/_components/board/ColumnUnscheduled";



const SchedulingBoard = () => {
const { board, isLoading, selectedSheet, selectedHead, schedule } = useSchedulingStore();

// console.log('Board:', board);

const handleOnDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    // If the order is not dropped into a valid destination, do nothing
    if (!destination) return;

    const { index: destinationIndex, droppableId: destinationId } = destination;
    const { droppableId: sourceId, index: sourceIndex } = source;

    // Retrieve the order that was dragged
    // const draggedOrder = board.columns?.get(sourceId)?.orders[sourceIndex];

    // Log the details
    // console.log('Destination ID (head):', destinationId - 1)
    // console.log('Destination Index:',destinationIndex)
    // console.log('Dragged Order ID:', draggableId);
    // console.log('Selected Sheet:', selectedSheet);
    // console.log('Selected Head:', selectedHead);

    // Handle the logic for updating the order status to "running"
    if (Number(destinationId) === 1) {
    let scheduleTime;
    // Your logic to update the order status to "running"
    const scheduledColumn = Array.from(schedule.columns).map(([key, value]) => ({ [key]: value }));
    console.log('Scheduled Column Orders:', (scheduledColumn[destinationId - 1][destinationId].schedules).length);
    const previousOrder = scheduledColumn[destinationId - 1][destinationId].schedules[destinationIndex - 1];
    // Check if previousOrder exists
    if (!previousOrder) {
        // If previousOrder does not exist, set scheduleTime to current time
        scheduleTime = new Date().toISOString();
    } else {
        // If previousOrder exists, calculate new scheduleTime
        const scheduledDate = new Date(previousOrder.scheduledDate); // Convert scheduledDate to Date object
        const approxHrsMs = previousOrder.order.approxHrs * 3600000; // Convert approximate hours to milliseconds
        const newTimeMs = scheduledDate.getTime() + approxHrsMs; // Add milliseconds to scheduledDate
        scheduleTime = new Date(newTimeMs).toISOString(); // Convert new time to ISO string
    }
    
    console.log('Info:', [
        { key: 'Sheet ID:', value: selectedSheet },
        { key: 'Head:', value: destinationId },
        { key: 'Previous Order:', value: previousOrder },
        { key: 'Dragged Order ID:', value: draggableId },
        { key: 'Schedule Time:', value: scheduleTime },
        { key: 'Subsequent Orders:', value: scheduledColumn[destinationId - 1][destinationId].schedules.slice(destinationIndex) }
    ]);



    // You can now update the order status using your API or store methods
    // Example: updateOrderStatus(orderId, newStatus);
    // ...

    // After updating the order status, trigger a re-fetch or re-render if needed
    // Example: refetchData();
    // ...
    }

    // Handle other drag and drop logic as needed
    // ...
};

if (isLoading) {
    return (
        <div className="w-full lg:max-w-full flex flex-col lg:grid grid-cols-1 lg:grid-cols-[2fr,3fr] gap-2 pr-2 mx-auto " >
            <Skeleton className="h-[82svh]" />
            <Skeleton className="h-[82svh]" />

        </div>
    );
}

return (
    <div>
    <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="id" direction="vertical" type="column">
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
    </div>
);
};

export default SchedulingBoard;
