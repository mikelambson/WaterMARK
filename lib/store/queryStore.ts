import { create } from "zustand";

const useQueryStore = create((set) => ({
    data: [],
    setData: (data: any) => set({ data }),
    userInput: '/o',
    setUserInput: (input: any) => set({ userInput: input }),
    queryParams: '/o',
    setQueryParams: (params: any) => set({ queryParams: params }),
  }));

export default useQueryStore;
