// GetOpsFlows @\lib\getOpsFlows.ts

import useFlowsStore from '@/store/opsFlowsStore';

// interface FlowsStore {
//   flows: FlowData[];
//   setFlows: (flows: FlowData[]) => void;
// }


export const initializeFlowsStore = () => {
    // Assuming ./flowsData.json is in the public directory
    fetch('/flowsData.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log('Fetched flows data:', data);
        useFlowsStore.getState().setFlows(data);
      })
      .catch((error) => console.error('Error fetching flows data:', error));
  };
