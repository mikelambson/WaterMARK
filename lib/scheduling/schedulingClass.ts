import ApiFetch from '@/lib/apiFetch';
import { TypedSchedule, PartialHeadsheetsData, HeadData, Schedule, SchBoard } from "@/typings";

interface ApiFilters {
    district: string;
    headsheet: PartialHeadsheetsData;
    head?: HeadData;
}

const api = new ApiFetch();

class ApiFetcher {
    private apiFetch: ApiFetch;

    constructor() {
        this.apiFetch = new ApiFetch();
    }

    async fetchHeadsheets(): Promise<void> {
        // Fetch headsheets from the API and store them in Board.headsheets[]
        // Board.headsheets = await this.apiFetch.get('https://api.example.com/headsheets');
    }

    async fetchPendingOrders(): Promise<void> {
        // Fetch pending orders from the API and store them in Board.unscheduled.pending[]
        // Board.unscheduled.pending = await this.apiFetch.get('https://api.example.com/pending-orders');
    }

    async get(url: string): Promise<any> {
        // Implement the 'get' method to fetch data from the API
        // You can use any HTTP library or fetch API to make the actual request
        // Return the fetched data
        // Example implementation using fetch API:
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    async fetchDelayedOrders(): Promise<void> {
        // Fetch delayed orders from the API and store them in Board.unscheduled.delayed[]
        // Board.unscheduled.delayed = await this.apiFetch.get('https://api.example.com/delayed-orders');
    }

    async fetchScheduledOrders(filters: ApiFilters): Promise<any> {
        const { district, headsheet, head } = filters;   
        const scheduledStatus = "scheduled,running"
        // Fetch scheduled orders from the API and store them in Board.scheduled[]
        
            // if (headsheet.name !== "Select") return;
            const scheduledRoute = `/schedule?find:district=${district}&find:status=${scheduledStatus}&find:line=${headsheet.name}&find:head=${head}`
            const result = headsheet.name == ("Select" || '') ? { success: false } : await api.fetchData(scheduledRoute);
            if (!result.success) return console.warn({
                variant: "Incomplete request.",
                description: "Could not connect to the server!",
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
        
        } catch (error: any) {
        console.error("Data Error:", error);
                
        }
}

// class Board {
//     static headsheets: any[] = [];
//     static unscheduled: {
//         pending: any[];
//         delayed: any[];
//     } = {
//         pending: [],
//         delayed: [],
//     };
//     static scheduled: any[] = [];
// }

// Usage example:
// const apiFetcher = new ApiFetcher();
// apiFetcher.fetchHeadsheets();
// apiFetcher.fetchPendingOrders();
// apiFetcher.fetchDelayedOrders();
// apiFetcher.fetchScheduledOrders();