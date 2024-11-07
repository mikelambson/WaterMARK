import { create } from 'zustand';

interface LahontanDataStore {
    data: any;
    lastFetched: number | null;
    setData: (newData: any) => void;
}

export const useLahontanDataStore = create<LahontanDataStore>((set) => ({
    data: null,
    lastFetched: null,
    setData: (newData) => set({ data: newData, lastFetched: new Date().getTime() }),
}));
