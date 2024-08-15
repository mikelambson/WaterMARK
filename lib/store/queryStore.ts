import { create } from "zustand";

const useQueryStore = create((set) => ({
    data: [],
    setData: (data: any) => set({ data }),
    userInput: '?find:status=o',
    setUserInput: (input: any) => set({ userInput: input }),
    queryParams: '?find:status=o',
    setQueryParams: (params: any) => set({ queryParams: params }),
  }));

export default useQueryStore;
