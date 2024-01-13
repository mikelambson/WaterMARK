// @/lib/getScheduleGroupedByColumn.ts
import { Board, TypedColumn, Order } from "@/typings";
import axios from "axios";
import { Column } from "react-table";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ApiFilters {
    district: string;
    page: number;
    pageSize: number;
    // line: number;
    // head: number;
  }

  const getScheduleGroupedByColumn = async (filters: ApiFilters) => {
    const { district, page, pageSize } = filters;
    
    const unscheduledStatus = "p,delayed"
    const scheduledStatus = "scheduled,running"

    try {
        const unscheduledOrders = await axios.get(
          `${baseUrl}orders?find:status=${unscheduledStatus}&find:district=${district}&page=${page}&pageSize=${pageSize}`
        );
        // const scheduledOrders = await axios.get(
        //     `${baseUrl}schedule?find:district=${district}&find:status=${scheduledStatus}&find:line=${line}`
        // )
        const orders: Order[] = unscheduledOrders.data;

    orders.sort((a: any, b: any) => new Date(a.orderTimestamp).getTime() - new Date(b.orderTimestamp).getTime());


    const columns = orders.reduce((acc: any, order: any) => {
        const { status} = order;
        if (status === "scheduled" || status === "running") {
                const key: TypedColumn = "scheduled";
                if (!acc.has(key)) {
                    acc.set(key, {
                        id: key,
                        orders: [order]
                    });
                } else {
                    acc.get(key)?.orders.push(order);
                }
            } else {
                const key: TypedColumn = "unscheduled";
                if (!acc.has(key)) {
                    acc.set(key, {
                        id: key,
                        orders: [order]
                    });
                } else {
                    acc.get(key)?.orders.push(order);
                }
            }
            return acc;
    }, new Map<TypedColumn, Column>()); 
         
     const columnTypes: TypedColumn[] = [ "unscheduled", "scheduled"];
     for (const columnType of columnTypes) {
        if (!columns.get(columnType)) {
            columns.set(columnType, {
                id: columnType,
                orders: [],
            });
        }
     };
    
    // Sort columns by columnTypes
    const sortedColumns = new Map<TypedColumn, Column>(
        [...columns.entries()].sort((a, b) => {
            return columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]);
        })
        );


    const board: Board = {
        columns: sortedColumns,
        setDistrict: function (arg0: string): unknown {
            throw new Error("Function not implemented.");
        },
        setPageSize: function (arg0: number): unknown {
            throw new Error("Function not implemented.");
        },
        setPage: function (arg0: number): unknown {
            throw new Error("Function not implemented.");
        }
    };
    return board;
} catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Propagate the error to the caller
  }
};
 
export default getScheduleGroupedByColumn;