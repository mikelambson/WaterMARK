// GetOpsFlows @\lib\getOpsFlows.ts
import useFlowsStore from '@/store/opsFlowsStore';
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


export const initializeFlowsStore = async () => {
  
  try {
    const response = await axios.get(
      `${baseUrl}opsflows`
    );
    const data = response.data
    useFlowsStore.getState().setFlows(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error to the caller
  }
  
    // fetch('/flowsData.json')
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     // console.log('Fetched flows data:', data);
    //     useFlowsStore.getState().setFlows(data);
    //   })
    //   .catch((error) => console.error('Error fetching flows data:', error));
};
