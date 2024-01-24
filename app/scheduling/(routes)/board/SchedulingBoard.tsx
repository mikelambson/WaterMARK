// Scheduling Board @\app\scheduling\_components\schedule-orders\SchedulingBoard.tsx
"use client";
import { useSchedulingStore } from "@/lib/store/schedulingStore";
import { useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { Skeleton } from "@/components/ui/skeleton";

import ScheduledColumn from "@/app/scheduling/_components/board/ColumnScheduled";
import UnscheduledColumn from "@/app/scheduling/_components/board/ColumnUnscheduled";




const SchedulingBoard = () => {
  const {
    board,
    isLoading,
    selectedDistrict,
    page,
    pageSize,
    headsheets,
    selectedSheet,
    selectedHead,
    setDistrict,
    getHeadsheets,
    setSelectedSheet,
    setSelectedHead,
    setSelectedDistrict,
    setPage,
    setPageSize,
    getBoard,
    schedule,
    getSchedule
  } = useSchedulingStore();

  const schedulingState = {
    board,
    isLoading,
    selectedDistrict,
    page,
    pageSize,
    headsheets,
    selectedSheet,
    selectedHead,
    setDistrict,
    getHeadsheets,
    setSelectedSheet,
    setSelectedHead,
    setSelectedDistrict,
    setPage,
    setPageSize,
    getBoard,
    schedule,
    getSchedule
  };

  useEffect(() => { 
    const fetchData = async () => {
      // Fetch data based on the updated district
      await getBoard(schedulingState);
    };
    // Call fetchData whenever selectedDistrict changes
    fetchData();
  }, [getBoard, selectedDistrict, page, selectedHead]); // Empty dependency array means this effect will only run once after initial render

  const handleOnDragEnd = (result: any) => {
    // Handle drag and drop logic here
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
              className="w-full lg:max-w-full flex flex-col lg:grid grid-cols-1 lg:grid-cols-[2fr,3fr] gap-2 pr-2 mx-auto"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {/* Render Unscheduled and Scheduled Columns within the same set of tabs */}
              <UnscheduledColumn
                id="unscheduled"
                columns={[
                  ...(board.columns.get('unscheduled')?.orders || []),
                  ...(board.columns.get('delayed')?.orders || []),
                ]}
                index={0}
              />
              <ScheduledColumn
                id="scheduled"
                columns={[
                  ...(board.columns.get('scheduled')?.orders || []),
                  ...(board.columns.get('running')?.orders || []),
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
