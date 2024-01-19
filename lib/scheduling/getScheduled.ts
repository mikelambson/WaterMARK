// @/lib/getScheduleGroupedByTypedSchedule.ts
import { TypedSchedule, PartialHeadsheetsData, HeadData, Schedule } from "@/typings";

import ApiFetch from "@/lib/apiFetch";
import { toast } from "@/components/ui/use-toast";

const api = new ApiFetch();

type SchColumn = {
    columns: TypedSchedule[];
    setDistrict: (district: string) => void;
    setSelectedSheet: (sheet: number) => void;
    setSelectedHead: (head: number) => void;
  };

interface ApiFilters {
    district: string;
    headsheet: PartialHeadsheetsData;
    head: HeadData;
  }


const getScheduledByHead = async (filters: ApiFilters) => {
    const { district, headsheet, head } = filters;
    
    const scheduledStatus = "scheduled,running"
        
    

    try {
        const testRoute = `/schedule?find:district=${district}&find:status=scheduled,running`
        const scheduledRoute = `/schedule?find:district=${district}&find:status=${scheduledStatus}&find:line=${headsheet}&find:head=${head}`
        const result = await api.fetchData(testRoute);
        // console.log(result)
        if (!result.success) return toast({
            variant: "destructive",
            description: "Could not connect to the server!",
        });
       toast({
            description: "Got data.",
        });
        const scheduled: Schedule[] = result.data as Schedule[];
        // const scheduledOrders = result.data;
        scheduled.sort((a: any, b: any) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());

        const arrayOfHeads: number[] = Array.from(new Set(scheduled.map(schedule => schedule.scheduledHead)));

        const heads: Map<number, TypedSchedule> = scheduled.reduce(
            (acc: Map<number, TypedSchedule>, schedule: Schedule) => {
              const head = schedule.scheduledHead;
          
              if (arrayOfHeads.includes(head)) {
                const key: number = head;
          
                if (!acc.has(key)) {
                  acc.set(key, {
                    id: key,
                    schedules: [schedule],
                  });
                } else {
                  const existingSchedule = acc.get(key);
                  if (existingSchedule) {
                    existingSchedule.schedules.push(schedule);
                    existingSchedule.schedules.sort((a, b) => {
                        const statusA = a.order.status;
                        const statusB = b.order.status;
                        return statusA.localeCompare(statusB);
                    });
                  }
                }
              }
          
              return acc;
            },
            new Map<number, TypedSchedule>()
        );

        
        const schColumn: TypedSchedule[] = Array.from(heads.values());
        
        const scheduledcolumn: SchColumn = {
            columns: schColumn,
            setDistrict: (district: string) => {
              // Implement the logic for setting the district
              console.log(`Setting district: ${district}`);
            },
            setSelectedSheet: (sheet: number) => {
              // Implement the logic for setting the selected sheet
              console.log(`Setting selected sheet: ${sheet}`);
            },
            setSelectedHead: (head: number) => {
              // Implement the logic for setting the selected head
              console.log(`Setting selected head: ${head}`);
            },
          };
          
         
          console.log(scheduledcolumn);
          // Return the structured object
          return scheduledcolumn;
    
    } catch (error) {
    console.error("Data Error:", error);
                
    }


         
//      const columnTypes: TypedSchedule[] = [ "unscheduled", "scheduled"];
//      for (const columnType of columnTypes) {
//         if (!columns.get(columnType)) {
//             columns.set(columnType, {
//                 id: columnType,
//                 orders: [],
//             });
//         }
//      };
    
//     // Sort columns by columnTypes
//     const sortedTypedSchedules = new Map<TypedSchedule, TypedSchedule>(
//         [...columns.entries()].sort((a, b) => {
//             return columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]);
//         })
//         );


    
// } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error; // Propagate the error to the caller
//   }
};
 
export default getScheduledByHead;