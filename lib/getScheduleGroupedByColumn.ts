// @/lib/getScheduleGroupedByColumn.ts
import { Board, TypedColumn } from "@/typings";
import axios from "axios";
import { Column } from "react-table";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


const getScheduleGroupedByColumn = async () => {
    
    const response = await axios.get(`${baseUrl}orders?find:status=o,delayed,scheduled,running`);

    const orders = response.data;

    const columns = orders.reduce((acc: any, order: any) => {
        const { status} = order;
        if (!acc.has(status)) {
            acc.set(status, {
                id: status,
                orders: [order]  // Start an array for the given scheduled status
            });
        } else {
            acc.get(status).orders.push(order);  // Add the order to the existing array
        }
        return acc; 
    }, new Map<TypedColumn, Column>()); 
         
     const columnTypes: TypedColumn[] = [ "O", "delayed", "scheduled"];
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