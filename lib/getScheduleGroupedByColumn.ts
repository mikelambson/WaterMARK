// @/lib/getScheduleGroupedByColumn.ts
import { Board, TypedColumn } from "@/typings";
import axios from "axios";
import { Column } from "react-table";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


const getScheduleGroupedByColumn = async () => {
    
    const response = await axios.get(`${baseUrl}orders?find:status=p,delayed,scheduled,running`);
    const orders = response.data;

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
            } else if (status === "delayed") {
                const key: TypedColumn = "delayed";
                if (!acc.has(key)) {
                    acc.set(key, {
                        id: key,
                        orders: [order]
                    });
                } else {
                    acc.get(key)?.orders.push(order);
                }
            } else {
                const key: TypedColumn = "P";
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
         
     const columnTypes: TypedColumn[] = [ "P", "scheduled", "delayed"];
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
    };
    console.log(columns);
    return board;
};
 
export default getScheduleGroupedByColumn;