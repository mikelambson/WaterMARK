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

/*
'Sheet ID:': selectedSheet.name },
        {'Head:': destinationId },
        {'Destination Index:': destinationIndex},
        {'Previous Order:': previousOrder },
        {'Dragged Order ID:': draggableId },
        {'Dragged Order:': draggedOrder(draggableId)},
        {'Schedule Time:': scheduleTime },
        {'Subsequent Orders:':
*/

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