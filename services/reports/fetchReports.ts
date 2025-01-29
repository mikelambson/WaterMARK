// import { fetcher } from "@/lib/fetcher"; // A utility for API calls

// export const getReports = async () => {
//   try {
//     return await fetcher("/api/reports");
//   } catch (error) {
//     throw new Error("Failed to fetch reports");
//   }
// };

export const getReports = async () => {
    const randomtimeout = 2000 + Math.random() * 5000; 
    await new Promise(resolve => setTimeout(resolve, randomtimeout));

    return [
      { id: 1, name: "Monthly Water Usage", description: "Tracks total water consumption per user." },
      { id: 2, name: "Canal Efficiency Report", description: "Analyzes water losses in the main canal system." },
      { id: 3, name: "Meter Accuracy Analysis", description: "Compares meter readings with expected values." },
      { id: 4, name: "Delivery Performance", description: "Measures efficiency of scheduled water deliveries." },
    ];
  };
  