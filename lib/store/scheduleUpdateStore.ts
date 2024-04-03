import { create } from 'zustand';
import { Schedule } from '@/typings';

type ScheduleUpdateState = {
    destinationId: number;
    destinationIndex: number;
    previousOrder: Schedule | null;
    draggedOrder: number;
    scheduleTime: string;
    subsequentOrders: any[];
    data: any[];
    setDestinationId: (id: number) => void;
    setDestinationIndex: (index: number) => void;
    setPreviousOrder: (order: Schedule) => void;
    setDraggedOrder: (order: number) => void;
    setScheduleTime: (time: string) => void;
    setSubsequentOrders: (orders: any[]) => void;
    updateData: (data: any) => void;
    resetData: () => void;
};



export const useScheduleUpdateStore = create<ScheduleUpdateState>((set) => ({
    destinationId: 0,
    destinationIndex: 0,
    previousOrder: null,
    draggedOrder: 0,
    scheduleTime: '',
    subsequentOrders: [],
    data: [],
    setDestinationId: (id: number) => set({ destinationId: id }),
    setDestinationIndex: (index: number) => set({ destinationIndex: index }),
    setPreviousOrder: (order: Schedule) => set({ previousOrder: order }),
    setDraggedOrder: (order: number) => set({ draggedOrder: order }),
    setScheduleTime: (time: string) => set({ scheduleTime: time }),
    setSubsequentOrders: (orders: any[]) => set({ subsequentOrders: orders }),
    updateData: (data: ScheduleUpdateState) => set(data),
    resetData: () => set({ data: [] }),
}));

