import { create } from 'zustand';
import { Schedule } from '@/typings';

// Define the structure for adding one order to the schedule
type AddOrderData = {
        orderId: number;
        headsheetId: number;
        head: number;
        scheduledTime: string;
        travelTime: number;
};

// Define the structure for updating other orders based on insertion position
type UpdateOrderData = {
    orderId: number;
    newScheduleTimestamp: string;
};

type UpdateData = [AddOrderData, ...UpdateOrderData[]];

const initialData: UpdateData = [
    {
        orderId: 0,
        headsheetId: 0,
        head: 0,
        scheduledTime: '',
        travelTime: 0,
    },
    
];

interface ScheduleUpdateState {
        destinationId: number;
        destinationIndex: number;
        previousOrder: Schedule | null;
        draggedOrder: number;
        scheduleTime: string;
        subsequentOrders: any[];
        data: UpdateData[];
        setDestinationId: (id: number) => void;
        setDestinationIndex: (index: number) => void;
        setPreviousOrder: (order: Schedule) => void;
        setDraggedOrder: (order: number) => void;
        setScheduleTime: (time: string) => void;
        setSubsequentOrders: (orders: any[]) => void;
        updateData: (newSchedule: AddOrderData, duration?: number, updateSchedules?: UpdateOrderData[]) => void; // Updated type signature
        resetData: () => void;
};



  
  // Function to calculate new schedule timestamp based on current timestamp and order duration
  const calculateNewScheduleTimestamp = (currentTimestamp: string, duration: number): string => {
    // Logic to calculate new schedule timestamp based on current timestamp and order duration
    return ''; // Replace with actual logic
  };

export const useScheduleUpdateStore = create<ScheduleUpdateState>((set) => ({
        destinationId: 0,
        destinationIndex: 0,
        previousOrder: null,
        draggedOrder: 0,
        scheduleTime: '',
        subsequentOrders: [],
        data: [initialData],
        setDestinationId: (id: number) => set({ destinationId: id }),
        setDestinationIndex: (index: number) => set({ destinationIndex: index }),
        setPreviousOrder: (order: Schedule) => set({ previousOrder: order }),
        setDraggedOrder: (order: number) => set({ draggedOrder: order }),
        setScheduleTime: (time: string) => set({ scheduleTime: time }),
        setSubsequentOrders: (orders: any[]) => set({ subsequentOrders: orders }),
        updateData: (newSchedule: AddOrderData, duration?: number, updateSchedules?: UpdateOrderData[]) => { 
             // Calculate new schedule timestamp for each update schedule
            const updatedSchedules: UpdateOrderData[] = updateSchedules ? updateSchedules.map((updateSchedule) => ({
                orderId: updateSchedule.orderId,
                newScheduleTimestamp: calculateNewScheduleTimestamp(updateSchedule.newScheduleTimestamp, duration? duration : 0)
            })) : [];

            let data: UpdateData[] = [];
            if (updatedSchedules.length > 0) {
                data = [[newSchedule, ...updatedSchedules]];
            } else {
                data = [[newSchedule]];
            }

            set({ data });
            console.log(data);
            },
        resetData: () => set({ data: [] }),
}));

