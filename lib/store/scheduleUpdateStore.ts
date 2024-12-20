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
    orderId: string;
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
        subsequentOrders: Schedule[];
        updateScheduleData: UpdateData[];
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
    const convertedDate = new Date(currentTimestamp);
    convertedDate.setHours(convertedDate.getHours() + duration);
    return convertedDate.toISOString();
};

export const useScheduleUpdateStore = create<ScheduleUpdateState>((set) => ({
        destinationId: 0,
        destinationIndex: 0,
        previousOrder: null,
        draggedOrder: 0,
        scheduleTime: '',
        subsequentOrders: [],
        updateScheduleData: [initialData],
        setDestinationId: (id: number) => set({ destinationId: id }),
        setDestinationIndex: (index: number) => set({ destinationIndex: index }),
        setPreviousOrder: (order: Schedule) => set({ previousOrder: order }),
        setDraggedOrder: (order: number) => set({ draggedOrder: order }),
        setScheduleTime: (time: string) => set({ scheduleTime: time }),
        setSubsequentOrders: (orders: any[]) => set({ subsequentOrders: orders }),
        
        updateData: async (newSchedule: AddOrderData, duration?: number, updateSchedules?: UpdateOrderData[]) => {

            // Calculate new schedule timestamp for each update schedule
            const updatedSchedules: UpdateOrderData[] = updateSchedules ? updateSchedules.map((updateSchedule) => ({
                orderId: updateSchedule.orderId,
                newScheduleTimestamp: calculateNewScheduleTimestamp(updateSchedule.newScheduleTimestamp, duration ? duration : 0)
            })) : [];

            let updateScheduleData: UpdateData[] = [];
            if (updatedSchedules.length > 0) {
                updateScheduleData = [[newSchedule, ...updatedSchedules]];
            } else {
                updateScheduleData = [[newSchedule]];
            }
        
            // Perform any asynchronous operations here
            // For example, await an API call or database operation
            // await someAsyncFunction();
        
            // Set the updated data using set function
            set({ updateScheduleData });
            setTimeout(() => {
            console.log("\nFrom Store\nUpdated Schedule Data:\n", updateScheduleData);
            }, 15);
        },

        resetData: () => set({ 
            destinationId: 0,
            destinationIndex: 0,
            previousOrder: null,
            draggedOrder: 0,
            scheduleTime: '',
            subsequentOrders: [],
            updateScheduleData: [initialData] 
        }),
        
}));

