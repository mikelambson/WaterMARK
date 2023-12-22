import { create } from 'zustand';
import { HeadsheetsData } from '@/typings';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export type PartialHeadsheetsData = HeadsheetsData | {};

interface DistrictState {
    districtSelected: string;
    headsheets: HeadsheetsData[];
    selectedSheet: {};
    setDistrict: (district: string) => void;
    getHeadsheets: (district: string) => Promise<void>; 
    setSelectedSheet: (sheet: PartialHeadsheetsData) => void;
    // getDistrict: (state: DistrictState) => Promise<void>;
  }


export const useDistrictStore = create<DistrictState>((set) => ({
  districtSelected: "WE",
  headsheets: [],
  selectedSheet: {},
  setDistrict: (district) => set({districtSelected: district}),
  getHeadsheets: async () => {
    try {
      const response = await axios.get(`${baseUrl}headsheets/${useDistrictStore.getState().districtSelected}`);
      const newSheets = response.data;
      set({ headsheets: newSheets });
      console.log(newSheets);
    } catch (error) {
      console.error('Error fetching headsheets:', error);
    }
  },
  setSelectedSheet: (headsheet) => set({ selectedSheet: headsheet }),
  
}));