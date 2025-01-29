type ReportData = {
  name: string;
  description: string;
  data: any[];
};

type MockReports = {
  [key: string]: ReportData;
};

export const getMockReportData = async (reportId: string) => {
    const mockReports: MockReports = {
      "1": {
        name: "Monthly Water Usage",
        description: "Tracks total water consumption per user.",
        data: [
          { User: "John Doe", Usage: "1200 CFS", Month: "January" },
          { User: "Jane Smith", Usage: "900 CFS", Month: "January" },
        ],
      },
      "2": {
        name: "Canal Efficiency Report",
        description: "Analyzes water losses in the main canal system.",
        data: [
          { Section: "North Canal", Efficiency: "85%" },
          { Section: "South Canal", Efficiency: "78%" },
        ],
      },
      "3": {
        name: "Meter Accuracy Analysis",
        description: "Compares meter readings with expected values.",
        data: [
          { Meter: "L8-234", Expected: "1000 CFS", Actual: "980 CFS", Accuracy: "98%" },
          { Meter: "L8-235", Expected: "1100 CFS", Actual: "1080 CFS", Accuracy: "98.2%" },
        ],
      },
      "4": {
        name: "Delivery Performance",
        description: "Measures efficiency of scheduled water deliveries.",
        data: [
          { OrderID: "A123", Delivered: "1500 AF", Scheduled: "1600 AF", Performance: "93%" },
          { OrderID: "A124", Delivered: "1200 AF", Scheduled: "1250 AF", Performance: "96%" },
        ],
      },
    };
  
    return mockReports[reportId] || { name: "Unknown Report", data: [] };
  };
  