// Scheduling Board @\app\scheduling\_components\schedule-orders\SchedulingBoard.tsx
"use client";
import { useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useSchedulingStore } from "@/lib/store/schedulingStoreDev";
import ScheduledColumn from "./ScheduledTest";
import UnscheduledTest from "./UnscheduledTest";


const SchedulingBoard = () => {
  const {
    board,
    isLoading,
    setSelectedDistrict,
    setPage,
    setPageSize,
    getBoard,
    selectedDistrict,
    page,
    pageSize,
  } = useSchedulingStore();

  const schedulingState = {
    board,
    isLoading,
    selectedDistrict,
    page,
    pageSize,
    setSelectedDistrict,
    setPage,
    setPageSize,
    getBoard,
  };

  useEffect(() => {
    // Filter unscheduled orders based on the initial lateral letter
    // const filteredOrders = board.columns.get("unscheduled").orders.filter(order => {
    //     // Assuming `order.laterals` contains the lateral information
    //     // Change 'A' to the initial lateral letter you want to filter by
    //     return order.laterals.startsWith('A'); // Replace 'A' with the initial lateral letter
    // });
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
    return <div>Loading...</div>;
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
                className="w-full md:max-w-full flex flex-col md:grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-2 pr-2 mx-auto "
                {...provided.droppableProps}
                ref={provided.innerRef}
                >
                    {Array.from(board.columns.entries()).map(([id, column], index) => {
                        if (id === 'unscheduled') {
                            return (
                            <UnscheduledTest
                                key={id}
                                id={id}
                                columns={column.orders}
                                index={index}
                            />
                            );
                        } else {
                            return (
                                <ScheduledColumn
                                key={id}
                                //   id={id}
                                //   columns={column.orders}
                                //   index={index}
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
