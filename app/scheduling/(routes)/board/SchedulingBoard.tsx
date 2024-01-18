// Scheduling Board @\app\scheduling\_components\schedule-orders\SchedulingBoard.tsx
"use client";
import { useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useSchedulingStore } from "@/lib/store/schedulingStoreDev";
import ScheduledColumn from "@/app/scheduling/_components/board/ColumnScheduled";
import UnscheduledColumn from "@/app/scheduling/_components/board/ColumnUnscheduled";
import { Skeleton } from "@/components/ui/skeleton";


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
  };

  useEffect(() => { 
    const fetchData = async () => {
      // Fetch data based on the updated district
      await getBoard(schedulingState);
    };
    // Call fetchData whenever selectedDistrict changes
    fetchData();
  }, [getBoard, selectedDistrict]); // Empty dependency array means this effect will only run once after initial render

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

//   {console.log(Array.from(board.columns.entries()).map(([id, column], index) => {
//     return {
//         id: id,
//         column: column,
//         index: index,
//     };
//     }))}

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {/* Container id1: Tabbed Element */}
        <Droppable droppableId="id" direction="vertical" type="column">
            {(provided) => (
                <div
                aria-label="unscheduled"
                className="w-full lg:max-w-full flex flex-col lg:grid grid-cols-1 lg:grid-cols-[2fr,3fr] gap-2 pr-2 mx-auto "
                {...provided.droppableProps}
                ref={provided.innerRef}
                >
                    {Array.from(board.columns.entries()).map(
                        ([id, column], index) => {
                         //key=index[0,1]   
                        if (id === 'unscheduled') {
                            
                            return (
                            <UnscheduledColumn
                                key={index}
                                id={id}
                                columns={column.orders}
                                index={index}
                            />
                            );
                        } else if (id === 'scheduled') {
                            
                            return ( 
                                <ScheduledColumn
                                key={index}
                                id={id}
                                  columns={column.orders}
                                  index={index}
                                />
                            ); 
                        }
                    }
                    )}
                </div>
            )} 
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default SchedulingBoard;
