import ApiFetch from '@/lib/apiFetch';
import {  
    TypedScheduled, 
    PartialHeadsheetsData, 
    HeadData, 
    Board,
    Schedule, 
    SchBoard, 
    Order, 
    HeadsheetsData,
    TypedUnscheduled} from "@/typings";
    import { useSchedulingStore } from '@/lib/store/schedulingStore';

    // const { board, isLoading, setPage, setPageSize, totalPages, getBoard, page, pageSize, selectedDistrict, setSelectedDistrict, setDistrict, headsheets, selectedSheet, getHeadsheets, setSelectedSheet, setSelectedHead, selectedHead, schedule, getSchedule, updateOrderStatus, getUnscheduled} = useSchedulingStore();

    interface ApiFilters {
      district: string;
      headsheet: PartialHeadsheetsData;
      head?: HeadData;
    }

    interface UschFilters {
      district: string;
      page: number;
      pageSize: number;
    }


export class scheduleFetcher {
    private api: ApiFetch;
    private selectedDistrict: string;

    constructor() {
      this.selectedDistrict = useSchedulingStore.getState().selectedDistrict;
      this.api = new ApiFetch();
    }

    async fetchHeadsheets(district: string): Promise<HeadsheetsData[]> {
        // Fetch headsheets from the API and store them in Board.headsheets[]
        // Board.headsheets = await this.apiFetch.get('https://api.example.com/headsheets');
        try {
          const response = await this.api.fetchData(`headsheets/${district}`);
          const newSheets: HeadsheetsData[] = response.data as HeadsheetsData[]; // Explicitly type newSheets as HeadsheetsData[]
          return newSheets;
        } catch (error) {
          console.error('Error fetching headsheets:', error);
          return [];
        }  
    }

    async fetchPendingOrders(filters: UschFilters): Promise<any> {
        // Fetch pending orders from the API and store them in Board.unscheduled.pending[]
        // Board.unscheduled.pending = await this.apiFetch.get('https://api.example.com/pending-orders');

        const { district, page, pageSize } = filters;
    
        const status = "p"
    
        try {
            const response = await this.api.fetchData(
                `orders?find:status=${status}&find:district=${district}&pageSize=${pageSize}&page=${page}`
            );

            const orders: Order[] = (response.data as any).orders;

            orders.sort((a: any, b: any) => new Date(a.ordertimestamp).getTime() - new Date(b.ordertimestamp).getTime());
    
    
        const columns = orders.reduce((acc: Map<string, TypedUnscheduled>, order: any) => {
            const { status } = order;
            const key: string = status === "unscheduled" || status === "delayed" ? "unscheduled" : "delayed";
      
            if (!acc.has(key)) {
              acc.set(key, {
                id: key,
                orders: [order],
              });
            } else {
              acc.get(key)?.orders.push(order);
            }
      
            return acc;
          }, new Map<string, TypedUnscheduled>());
      
          const columnTypes: string[] = ["unscheduled", "delayed"];
          for (const columnType of columnTypes) {
            if (!columns.get(columnType)) {
              columns.set(columnType, {
                id: columnType,
                orders: [],
              });
            }
          }
      
          // Sort columns by columnTypes
            const sortedColumns = new Map<string, TypedUnscheduled>(
              ([...columns.entries()] as [string, TypedUnscheduled][])
                .sort((a, b) => {
                  return columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]);
                })
            );
        
          const board: Board = {
            unscheduled: {
              pending: sortedColumns,
              delayed: new Map<string, TypedUnscheduled>(),
            }, // Initialize unscheduled property with an empty object
            
            setDistrict: function (arg0: string): unknown {
              throw new Error("Function not implemented.");
            },
            setPageSize: function (arg0: number): unknown {
              throw new Error("Function not implemented.");
            },
            setPage: function (arg0: number): unknown {
              throw new Error("Function not implemented.");
            },
            columns: undefined
          };
          
          const totalPages: number = (response.data as any).metadata.totalPages;
          return { board, totalPages };
        } catch (error) {
          console.error("Error fetching data:", error);
          throw error; // Propagate the error to the caller
        }

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
            const scheduledRoute = `/schedule?find:district=${district}&find:status=${scheduledStatus}&find:line=${headsheet.name}`
            const result = headsheet.name == ("Select" || '') ? { success: false } : await this.api.fetchData(scheduledRoute);
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