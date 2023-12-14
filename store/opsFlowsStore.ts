// flowsStore.ts
import { create } from 'zustand';
import { FlowData } from '@/typings';


interface FlowsState {
  flows: FlowData[];
  setFlows: (newFlows: FlowData[]) => void;
  updateFlow: (flowId: string, updatedFlow: Partial<FlowData>) => void;
  addFlow: (newFlow: FlowData) => void;
}

export const useFlowsStore = create<FlowsState>((set) => ({
  flows: [],
  setFlows: (newFlows) => set({ flows: newFlows }),

  updateFlow: (flowId, updatedFlow) =>
    set((state) => ({
      flows: state.flows.map((flow) =>
        flow.id === flowId ? { ...flow, ...updatedFlow } : flow
      ),
    })),

  addFlow: (newFlow) =>
    set((state) => ({ flows: [...state.flows, newFlow] })),
}));

export default useFlowsStore;
