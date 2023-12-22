"use client"
import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useSchedulingStore } from '@/store/schedulingStore';
import Column from '@/app/scheduling/_components/board/SortedColumn';

const SchedulingBoard = () => {

    const { board, isLoading, setDistrict, setPage, setPageSize, getBoard, selectedDistrict, page, pageSize, selectedHeadsheet, setSelectedHeadsheet } = useSchedulingStore();
    
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
                <Droppable droppableId="id" direction="horizontal" type='column'>
                    {(provided) => (
                        <div
                            className='grid grid-cols-1 md:grid-cols-[2fr,3fr] md:grid-rows-[65vh, 30px] gap-4 max-w-full pr-2 mx-auto '
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {/* Loop through columns and render them */}
                            {Array.from(board.columns.entries()).map(([id, column], index) => (
                                <div key={id}
                                // className={`col-span-1 overflow-y-auto h-full
                                className={`col-span-1 h-[65vh] overflow-y-scroll
                                ${index === 2 ? 'md:col-span-2 md:h-[7.4rem]' : ''}`}>
                                    <Column
                                        id={id}
                                        columns={column.orders}
                                        index={index}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
     );
}
 
export default SchedulingBoard;