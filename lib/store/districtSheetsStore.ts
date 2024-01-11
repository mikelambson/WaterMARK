import { create } from 'zustand';
import { HeadsheetsData } from '@/typings';
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

interface DistrictState {
  districtSelected: string;
  headsheets: HeadsheetsData[];
  selectedSheet: PartialHeadsheetsData;
  selectedHead: number;
  setDistrict: (district: string) => void;
  getHeadsheets: (district: string) => Promise<void>; 
  setSelectedSheet: (sheet: HeadsheetsData) => void;
  setSelectedHead: (head: number) => void;
}

export const useDistrictStore = create<DistrictState>((set) => ({
  districtSelected: "WE",
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
  setDistrict: (district) => set({ districtSelected: district }),
  getHeadsheets: async () => {
    try {
      const response = await axios.get(`${baseUrl}headsheets/${useDistrictStore.getState().districtSelected}`);
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
  setSelectedHead: (head) => set({selectedHead: head})
}));
