// @/store/schedulingStore.ts
import getScheduleGroupedByColumn from '@/lib/getScheduleDev';
import { Column } from 'react-table';
import { HeadsheetsData, TypedColumn, Board } from '@/typings';
import { create } from 'zustand';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export type PartialHeadsheetsData = HeadsheetsData | {
    id: 0,
    name: "Sheetname",
    district: "",
    maxHeads: 0,
    maxFlow: 0,
    structureRef: "",
    characteristics: ""
  };
  
  export type HeadData = number | "Select";

interface SchedulingState {
    board: Board;
    isLoading: boolean;
    selectedDistrict: string;
    page: number;
    pageSize: number;
    headsheets: HeadsheetsData[];
    selectedSheet: PartialHeadsheetsData;
    selectedHead: HeadData;
    setDistrict: (district: string) => void;
    getHeadsheets: (district: string) => Promise<void>; 
    setSelectedSheet: (sheet: HeadsheetsData) => void;
    setSelectedHead: (head: number) => void;
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
    pageSize: 500,

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


