import getScheduleGroupedByColumn from '@/lib/getScheduleGroupedByColumn';
import { Board, TypedColumn, Order, OrderDetails } from '@/typings';
import { create } from 'zustand';

interface SchedulingState {
    board: Board;
    getBoard: () => Promise<void>;
    // isLoading: boolean;
}

type Column = any;

export const useSchedulingStore = create<SchedulingState>((set) => ({
    board: {
        columns: new Map<TypedColumn, Column>(),
    },
    isLoading: false,
    getBoard: async () => {
        // set({ isLoading: true });
        const columns = await getScheduleGroupedByColumn();
        console.log(columns);
        set( {board.columns,});
        
    },
}));

