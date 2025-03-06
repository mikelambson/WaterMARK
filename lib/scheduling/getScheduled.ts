// @/lib/getScheduleGroupedByTypedSchedule.ts
import { TypedScheduled, PartialHeadsheetsData, HeadData, Schedule, SchBoard } from "@/typings";

import ApiFetch from "@/services/apiFetch";
// import { toast } from "@/components/ui/use-toast";

const api = new ApiFetch();

interface ApiFilters {
    district: string;
    headsheet: PartialHeadsheetsData;
    head?: HeadData;
}

const getScheduledByHead = async (filters: ApiFilters) => {
    const { district, headsheet, head } = filters;   
    const scheduledStatus = "scheduled,running"
    
    try {
        // if (headsheet.name !== "Select") return;
        const scheduledRoute = `/schedule?find:district=${district}&find:status=${scheduledStatus}&find:line=${headsheet.name}&find:head=${head}`
        const result = (headsheet.name === "Select" || headsheet.name === '') ? { success: false } : await api.fetchData(scheduledRoute);
        if (!result.success) return console.warn({
            variant: "Incomplete request.",
            description: "Could not connect to the server!",
        });
        const scheduled: Schedule[] = result.data as Schedule[];
        // const scheduledOrders = result.data;
        scheduled.sort((a: any, b: any) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());

        const arrayOfHeads: number[] = Array.from(new Set(scheduled.map(schedule => schedule.scheduledHead)));

        const heads: Map<number, TypedScheduled> = scheduled.reduce(
            (acc: Map<number, TypedScheduled>, schedule: Schedule) => {
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
            new Map<number, TypedScheduled>()
        );

        const headTypes: number[] = [ 1, 2, 3, 4, 5, 6, 10];
        
        for (const headType of headTypes) {
          if (!heads.get(headType)) {
            heads.set(headType, {
              id: headType,
              schedules: [],
            });
          }
        }

        
        const sortedSchedules = new Map(
          Array.from(heads.entries()).sort((a, b) =>{
            return headTypes.indexOf(a[0]) - headTypes.indexOf(b[0]);
        })); 

        const scheduledcolumn: SchBoard = {
            columns: sortedSchedules,
            setDistrict: (district: string) => {
            },
            setSelectedSheet: (sheet: number) => {
            },
            setSelectedHead: (head: number) => {
            },
        };
        return scheduledcolumn;
    
    } catch (error) {
    console.error("Data Error:", error);
                
    }
};
 
export default getScheduledByHead;