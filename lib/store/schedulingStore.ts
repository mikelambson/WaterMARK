// @/store/schedulingStore.ts
import getScheduleGroupedByColumn from '@/lib/scheduling/getUnscheduledGrouped';
import { HeadsheetsData, Board, PartialHeadsheetsData, HeadData, TypedScheduled, SchBoard, TypedUnscheduled, ColumnUnscheduled, ColumnScheduled} from '@/typings';
import { create } from 'zustand';
import axios from 'axios';
// import ApiFetch from '@/lib//apiFetch';
import getScheduledByHead from '@/lib/scheduling/getScheduled';


// const api = new ApiFetch();
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


interface SchedulingState {
    board: Board;
    updateOrderStatus: (orderId: string, newStatus: string) => void;
    isLoading: boolean;
    selectedDistrict: string;
    page: number;
    pageSize: number;
    totalPages: number;
    headsheets: HeadsheetsData[];
    selectedSheet: PartialHeadsheetsData;
    selectedHead: HeadData;
    schedule: SchBoard;
    setDistrict: (district: string) => void;
    getHeadsheets: (district: string) => Promise<void>; 
    setSelectedSheet: (sheet: HeadsheetsData) => void;
    setSelectedHead: (head: number) => void;
    setSelectedDistrict: (district: string) => void;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    getBoard: (state: SchedulingState) => Promise<void>; // Receive state as a parameter
    getSchedule: (head: number) => Promise<void>;
    getUnscheduled: (district: string, page: number, pageSize: number) => Promise<void>;
    
}

export const useSchedulingStore = create<SchedulingState>((set) => ({
        totalPages: 0,
        board: {
        unscheduled: {
            pending: new Map<string, TypedUnscheduled>(),
            delayed: new Map<string, TypedUnscheduled>(),
        },
        scheduled: {
            running: new Map<string, TypedScheduled>(),
            scheduled: new Map<string, TypedScheduled>(),
        },
        columns: new Map<string, TypedUnscheduled>(),
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
    updateOrderStatus: (orderId: string, newStatus: string) => {
      set((state) => {
        const updatedColumns = new Map<string, TypedUnscheduled>();

        // Null check for state.board.columns
        if (state.board.columns) {
          // Iterate through columns
          state.board.columns.forEach((typedUnscheduled, status) => {
            const updatedOrders = typedUnscheduled.orders.map((order) =>
              order.id === orderId ? { ...order, status: newStatus } : order
            );
            updatedColumns.set(status, { id: status, orders: updatedOrders });
          });
        }

        const updatedBoard = { ...state.board, columns: updatedColumns };

        return { board: updatedBoard };
      });
  },
    isLoading: false,
    selectedDistrict: "WE",
    page: 1,
    pageSize: 100,
    headsheets: [],
    selectedSheet: {
        id: 0o0,
        name: "",
        district: "",
        maxHeads: 0,
        maxFlow: 0,
        structureRef: "",
        characteristics: ""
    },
    selectedHead: 1,
    schedule: {
        columns: new Map<number, TypedScheduled>(),
        setDistrict: function (arg0: string): unknown {
            throw new Error('Function not implemented.');
        },
        setSelectedSheet: function (arg0: number): unknown {
            throw new Error('Function not implemented.');
        },
        setSelectedHead: function (arg0: number): unknown {
            throw new Error('Function not implemented.');
        },
    },

    setDistrict: (district) => set({ selectedDistrict: district }),
    getHeadsheets: async () => {
      try {
        const response = await axios.get(`${baseUrl}headsheets/${useSchedulingStore.getState().selectedDistrict}`);
        const newSheets = response.data;
        set({ headsheets: newSheets });
        set({selectedSheet: {
            id: 0o0,
            name: "Select",
            district: "",
            maxHeads: 0,
            maxFlow: 0,
            structureRef: "",
            characteristics: ""
        }})
      } catch (error) {
        console.error('Error fetching headsheets:', error);
      }
    },
    setSelectedSheet: (headsheet) => set({ selectedSheet: headsheet}),
    setSelectedHead: (head) => set({selectedHead: head}),
    setSelectedDistrict: (district: string) => set({ selectedDistrict: district}),
    setPage: (page: number) => set({ page }),
    setPageSize: (pageSize: number) => set({ pageSize }),
    getUnscheduled: async (district: string, page: number, pageSize: number) => {
      const filters = {
        district: district,
        page: page,
        pageSize: pageSize,
      };
      const {board, totalPages} = await getScheduleGroupedByColumn(filters);
      set({ board: board, totalPages: totalPages});

    },
    getBoard: async (state) => {
      set({ isLoading: true });
      state.getUnscheduled(state.selectedDistrict, state.page, state.pageSize);
      set({ isLoading: false });
      // Additional logic can be added here in the future
    },
    getSchedule: async (head) => {
      const { selectedDistrict, selectedSheet } = useSchedulingStore.getState();

      const filters = {
        district: selectedDistrict,
        headsheet: selectedSheet,
        head: head,
      };
      const scheduledOrders: SchBoard = (await getScheduledByHead(filters)) ?? {
        setDistrict: () => {},
        setSelectedSheet: () => {},
        setSelectedHead: () => {},
        columns: new Map<number, TypedScheduled>(),
    };
      set({schedule: scheduledOrders})
    }
})); 


