// GetOpsFlows @\lib\getOpsFlows.ts
import useFlowsStore from '@/lib/store/opsFlowsStore';
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


// export const initializeFlowsStore = async () => {
  
//   try {
//     const response = await axios.get(
//       `${baseUrl}opsflows`
//     );
//     const data = response.data
//     useFlowsStore.getState().setFlows(data);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error; // Propagate the error to the caller
//   }
  
// };

