"use client"
import { useSchedulingStore } from '@/store/schedulingStore';
import { useEffect } from 'react';

const ScheduleWater = () => {

    // const  [board, getBoard] = useSchedulingStore((state) => [
    //     state.board,
    //     // state.isLoading,
    //     state.getBoard]);
    
    // useEffect(() => {
    //     getBoard();
    // }, [getBoard]);

    // const isLoading: () => {
    //     return <div>Loading...</div>;
    // }

    // Render your component with the board data
    return (
        <section>
        <h1 className=' text-2xl'>Schedule Water</h1>
         {/* <DragDropContext> */}
            

            {/* <Droppable droppableId='unscheduled' direction="horizontal" type='column'> */}
                {/* {(provided) => <div>rendering all the columns</div>} */}
            
            {/*  </Droppable> */}
        {/* </DragDropContext> } */}
        </section> 
     );
}

 
export default ScheduleWater;
