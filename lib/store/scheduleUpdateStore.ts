import { create } from 'zustand';

type ScheduleUpdateState = {
    sheetId: number;
    headNumber: number;
    destinationId: number;
    destinationIndex: number;
    previousOrder: number;
    draggedOrder: number;
    scheduleTime: string;
    subsequentOrders: any[];
    data: any;
    updateData: (data: any) => void;
    resetData: () => void;
};



const useScheduleUpdateStore = create<ScheduleUpdateState>((set) => ({
    sheetId: 0,
    headNumber: 0,
    destinationId: 0,
    destinationIndex: 0,
    previousOrder: 0,
    draggedOrder: 0,
    scheduleTime: '',
    subsequentOrders: [],
    data: null,
    
    updateData: (data: ScheduleUpdateState) => set(data),
    resetData: () => set({ data: null }),
}));

export default useScheduleUpdateStore;