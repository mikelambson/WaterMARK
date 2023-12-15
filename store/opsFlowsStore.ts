// flowsStore.ts
import { create } from 'zustand';
import { FlowData } from '@/typings';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface FlowsState {
  flows: FlowData[];
  setFlows: (newFlows: FlowData[]) => void;
  updateFlow: (flowId: string, updatedFlow: Partial<FlowData>) => void;
  addFlow: (newFlow: FlowData) => void;
}

export const useFlowsStore = create<FlowsState>((set) => ({
  flows: [],
  setFlows: (newFlows) => set({ flows: newFlows }),

  updateFlow: async (flowId, updatedFlow) => {
    try {
      // Make a PUT request to update the data on the server
      const response = await axios.put(`${baseUrl}opsflows/${flowId}`, {
        id: parseInt(flowId),
        ...updatedFlow,
      });
      console.log(`${baseUrl}opsflows/${flowId}`, {
        id: parseInt(flowId),
        ...updatedFlow,
      });
      console.log(response)
      // Update the local state with the updated data
      set((state) => ({
        flows: state.flows.map((flow) =>
          flow.id === flowId ? { ...flow, ...response.data } : flow
        ),
      }));
    } catch (error) {
      console.error('Error updating flow:', error);
    }
  },

  addFlow: (newFlow) =>
    set((state) => ({ flows: [...state.flows, newFlow] })),
}));

export default useFlowsStore;
