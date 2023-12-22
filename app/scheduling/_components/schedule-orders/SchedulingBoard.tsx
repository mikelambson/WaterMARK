// Scheduling Board @\app\scheduling\_components\schedule-orders\SchedulingBoard.tsx
"use client"
import React, { useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useSchedulingStore } from '@/store/schedulingStore';
import Column from '@/app/scheduling/_components/schedule-orders/SortedColumn';

import { ScrollArea } from '@/components/ui/scroll-area';

const SchedulingBoard = () => {

    const { board, isLoading, setDistrict, setPage, setPageSize, getBoard, selectedDistrict, page, pageSize, selectedHeadsheet, maxHeads, setHeads, setSelectedHeadsheet } = useSchedulingStore();
    
    const schedulingState = {
        board,
        isLoading,
        selectedDistrict,
        page,
        pageSize,
        setDistrict,
        setPage,
        setPageSize,
        getBoard,
        selectedHeadsheet,
        maxHeads,
        setHeads,
        setSelectedHeadsheet
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
    }, [getBoard, selectedDistrict]);// Empty dependency array means this effect will only run once after initial render

    const handleOnDragEnd = (result: any) => {
        // Handle drag and drop logic here
    };
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return ( 
        <div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                {/* Container id1: Tabbed Element */}
                <Droppable droppableId="id" direction="vertical" type='column'>
                    {(provided) => (
                        
                        <div
                            className='w-full md:max-w-full flex flex-col md:grid grid-cols-1 md:grid-cols-[2fr,3fr] md:grid-rows-[60vh, 30px] gap-2  pr-2 mx-auto '
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                           {/* Loop through columns and render them */}
                           {Array.from(board.columns.entries()).map(([id, column], index) => (
                                <ScrollArea key={id}
                                className={`col-span-1 h-[65vh] rounded-md
                                ${index === 2 ? 'md:col-span-2 md:h-[7rem]' : ''}`}>
                                    <Column
                                        id={id}
                                        columns={column.orders} 
                                        index={index}
                                        sheetName={selectedHeadsheet}
                                        tabnumber={5}
                                    ></Column>
                                </ScrollArea>
                            ))}
                        </div>
                    )}
                    
                </Droppable>
            </DragDropContext>
        </div>
    );
}
 
export default SchedulingBoard;