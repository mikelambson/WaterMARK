import getScheduleGroupedByColumn from '@/lib/getScheduleGroupedByColumn';
import { Column } from 'react-table';
import { TypedColumn, Board } from '@/typings';
import { create } from 'zustand';



interface SchedulingState {
    board: Board;
    isLoading: boolean;
    getBoard: () => Promise<void>;
}


export const useSchedulingStore = create<SchedulingState>((set) => ({
    board: { columns: new Map<TypedColumn, Column>()},
    isLoading: false,
    getBoard: async () => {
        set({ isLoading: true });
        const columns = await getScheduleGroupedByColumn();
        set( { board: columns } );
        set({ isLoading: false})
    },
}));

