// @/store/schedulingStore.ts
import getScheduleGroupedByColumn from '@/lib/getScheduleDev';
import { Column } from 'react-table';
import { TypedColumn, Board } from '@/typings';
import { create } from 'zustand';


interface SchedulingState {
    board: Board;
    isLoading: boolean;
    selectedDistrict: string;
    page: number;
    pageSize: number;
    setSelectedDistrict: (district: string) => void;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    getBoard: (state: SchedulingState) => Promise<void>; // Receive state as a parameter
    
    
}

export const useSchedulingStore = create<SchedulingState>((set) => ({
    board: {
        columns: new Map<TypedColumn, Column>(),
        setDistrict: function (arg0: string): unknown {
            throw new Error('Function not implemented.');
        },
        setPageSize: function (arg0: number): unknown {
            throw new Error('Function not implemented.');
        },
        setPage: function (arg0: number): unknown {
            throw new Error('Function not implemented.');
        }
    },
    
    
    isLoading: false,
    selectedDistrict: "WE",
    page: 1,
    pageSize: 50,
    setSelectedDistrict: (district: string) => set({ selectedDistrict: district}),
    setPage: (page: number) => set({ page }),
    setPageSize: (pageSize: number) => set({ pageSize }),
    
        
    getBoard: async (state) => {
        set({ isLoading: true});
        const filters = {
            district: state.selectedDistrict,
            page: state.page,
            pageSize: state.pageSize,
          };
        const columns = await getScheduleGroupedByColumn(filters);
        set({ board: columns, isLoading: false });
    },
   
}));

