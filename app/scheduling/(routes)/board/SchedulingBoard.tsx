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
    const draggedOrder = board.columns?.get(sourceId)?.orders[sourceIndex];

    // Log the details
    console.log('Destination ID:', destinationId)
    console.log('Destination Index:',destinationIndex)
    console.log('Dragged Order ID:', draggableId);
    console.log('Selected Sheet:', selectedSheet);
    console.log('Selected Head:', selectedHead);

    // Handle the logic for updating the order status to "running"
    if (Number(destinationId) === 1) {
      // Your logic to update the order status to "running"
      const scheduledColumn = Array.from(schedule.columns).map(([key, value]) => ({ [key]: value }));
      console.log('Scheduled Column Orders:', scheduledColumn);




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
                columns={[
                  ...(board.columns?.get('scheduled')?.orders || []),
                  ...(board.columns?.get('running')?.orders || []),
                ]}
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
