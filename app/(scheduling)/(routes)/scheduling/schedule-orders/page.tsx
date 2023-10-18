// @/app/(scheduling)/(routes)/scheduling/schedule-orders/page.tsx

"use client"
import Column from '@/app/(scheduling)/_components/Column';
import { useSchedulingStore } from '@/store/schedulingStore';
import { useEffect } from 'react';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';

const ScheduleWater = () => {

    const  [board, getBoard] = useSchedulingStore((state) => [
        state.board,
        // state.isLoading,
        state.getBoard]);
    
    useEffect(() => {
        getBoard();
    }, [getBoard]);

    const handleOnDragEnd = (result: DropResult) => {

    };

    const loading = `<div>Loading...</div>`;
    // const isLoading: () => {
    //     return loading;
    // }

    // Render your component with the board data
    return (
        <section>
        <h1 className=' text-2xl'>Schedule Water</h1>
         <DragDropContext onDragEnd={handleOnDragEnd}> 
            <Droppable droppableId="id" direction="horizontal" type='column'>
                {(provided) =>              
                <div
                    className='grid grid-cols-1 md:grid-cols-[2fr,3fr] gap-4 max-w-full pr-6 mx-auto'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >{Array.from(board.columns.entries()).map(([id, column], index) => (
                    <Column 
                        key={id}
                        id={id}
                        columns={column.orders}
                        index={index} />
                ))}</div>}
                
             </Droppable>
        </DragDropContext> 
        </section> 
     );
}

 
export default ScheduleWater;
