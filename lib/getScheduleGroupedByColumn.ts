import { Board, TypedColumn } from "@/typings";
import axios from "axios";
import { Column } from "react-table";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


const getScheduleGroupedByColumn = async () => {
    
    const response = await axios.get(`${baseUrl}orders?find:status=p,delayed,scheduled`);

    const orders = response.data;

    const columns = orders.reduce((acc: any, order: any) => {
        const { scheduled } = order;
        if (!acc.has(scheduled)) {
            acc.set(scheduled, {
                id: scheduled,
                orders: [order]  // Start an array for the given scheduled status
            });
        } else {
            acc.get(scheduled).orders.push(order);  // Add the order to the existing array
        }
        return acc;
    }, new Map<TypedColumn, Column>()); 
     

     console.log(columns);  
     const columnTypes: TypedColumn[] = [ "p", "delayed", "scheduled" ]
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
        Array.from(columns.entries()).sort((a, b,) => {
            columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    }));


    const board: Board = {
        columns: sortedColumns,
    };
    
    return board;
};
 
export default getScheduleGroupedByColumn;