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

type UpdateData = AddOrderData | UpdateOrderData[];

const initialData: UpdateData[] = [];

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
        updateData: (newSchedule: string, duration: number, updateSchedules: UpdateOrderData[]) => void; // Updated type signature
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
        data: initialData,
        setDestinationId: (id: number) => set({ destinationId: id }),
        setDestinationIndex: (index: number) => set({ destinationIndex: index }),
        setPreviousOrder: (order: Schedule) => set({ previousOrder: order }),
        setDraggedOrder: (order: number) => set({ draggedOrder: order }),
        setScheduleTime: (time: string) => set({ scheduleTime: time }),
        setSubsequentOrders: (orders: any[]) => set({ subsequentOrders: orders }),
        updateData: (newSchedule: string, duration: number, updateSchedules: UpdateOrderData[]) => { 
                set((state) => {
                    // Generate update data based on scheduling changes
                    // const updates: (AddOrderData | UpdateOrderData)[] = generateUpdateData(state, newSchedule, duration, updateSchedules);
        
                    // Store the update data in the data[] array
                    const updatedData: UpdateData[] = [...state.data];
        
                    // Check if the data array already contains an entry for the dragged order
                    // const existingIndex = updatedData.findIndex((entry) => {
                    //     return entry instanceof Array && entry[0].orderId === state.draggedOrder;
                    // });
        
                    // // If an entry for the dragged order already exists, append the updates
                    // if (existingIndex !== -1) {
                    //     updatedData[existingIndex] = [...updatedData[existingIndex], ...updates.filter(entry => entry instanceof UpdateOrderData)];
                    // } else {
                    //     // Otherwise, add a new entry for the dragged order with the updates
                    //     updatedData.push([...updates]);
                    // }
        
                    // Return the updated state
                    return { ...state, data: updatedData };
                });
            },
        resetData: () => set({ data: [] }),
}));

