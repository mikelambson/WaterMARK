// \app\(scheduling)\(routes)\daily\page.tsx
'use client'
import React, { useEffect, useCallback } from 'react';
import axios from "axios";
import { useTable, useSortBy } from "react-table";
import { Button } from "@/components/ui/button"
import useQueryStore from '@/store/queryStore';

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";



interface OrderDetails {
  irrigatorsName: string;
  ownersName: string;
  name: string;
  approxAf: number;
  balance: number;
}

interface Order {
  id: number;
  orderTimestamp: string;
  orderNumber: number;
  tcidSn: string;
  district: string;
  status: string;
  laterals: string[];
  approxCfs: number;
  approxHrs: number;
  phoneNumbers: string[];
  remarks: string | null;
  details: OrderDetails;
  scheduled: boolean;
}

interface TableColumn {
  Header: string;
  accessor: keyof Order | string;
  Cell?: (row: any) => React.ReactNode;
}
  
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  

const Daily = () => {
  const { data, setData, userInput, setUserInput, queryParams, setQueryParams }: any = useQueryStore();
  const legacyOrdersUrl = `${baseUrl}legacyorders${queryParams}`;

  const { theme } = useTheme();
  const isDarkMode = theme === "light";

  const tableSetup = "border-collapse border mt-2 max-w-[98%] scroll-auto ml-2 mb-6"
  
  const fetchData = async () => {
    try {
      const response = await axios.get(legacyOrdersUrl);
      setData(response.data); // Assuming the API response is an array of objects
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      setQueryParams(userInput);
      fetchData();
    },
    [userInput, fetchData]
  );

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  // Trigger fetchData function on component mount and whenever queryParams changes
  useEffect(() => {
    fetchData();
  }, [queryParams]);

  type Column<T> = {
    Header: string;
    accessor: keyof T;
  };
    
 // Assuming your columns data is something like this:
 const columns: TableColumn[] = React.useMemo(
    () => [
      
      {
        Header: "Timestamp",
        accessor: "orderTimestamp",
        // sortable: true,
      },
      {
        Header: "Order#",
        accessor: "orderNumber",
        // sortable: true,
      },
      {
        Header: "Serial#",
        accessor: "tcidSn",
        // sortable: true,
      },
      {
        Header: "Irrigator",
        accessor: "details.irrigatorsName",
      },
      {
        Header: "Owner",
        accessor: "details.ownersName",
      },
      {
        Header: "Phone",
        accessor: "phoneNumbers",
        Cell: ({ row }) => row.original.phoneNumbers.join(" | "), // Join array elements with ', ' separator
      },
      
      {
        Header: "Laterals",
        accessor: "laterals",
        Cell: ({ row }) => row.original.laterals.join(", "), // Join array elements with ', ' separator
      },
      
      {
        Header: "Order CFS",
        accessor: "approxCfs",
      },
      {
        Header: "Order Hrs",
        accessor: "approxHrs",
      },
      
      {
        Header: "Remarks",
        accessor: "remarks",
      },
      {
        Header: "District",
        accessor: "district",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      
    ],
    []
  );
  
  

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy // Enable sorting functionality
  );


  return (
    
    <div className={"overflow-auto"}>
      <span className={"ml-2 pt-4 flex gap-6"}>
      <h1 className={"mt-2 text-xl font-bold "}>Order Count | {rows.length}</h1> 
      <Button className={"active:bg-slate-600"}>Schedule These</Button>
      </span> 
      <form onSubmit={handleSubmit}>
      <div className={"ml-2 text-xl flex gap-2 items-center"}>
        <label htmlFor="queryParamsInput">Query:</label>
        <input
          type="text"
          id="queryParamsInput"
          value={userInput}
          onKeyDown={handleKeyPress}
          onChange={(e) => setUserInput(e.target.value)}
          className={"pl-1 w-96"}
        />
        <Button variant={"outline"} type="submit" className={"active:bg-slate-600"}>
          Submit
        </Button>
      </div>
      </form>
              
      <table {...getTableProps()} className={cn(`${tableSetup}`, isDarkMode? "bg-neutral-300 border-gray-400 text-black" : "text-neutral-400 border-gray-400 bg-stone-800")}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className={cn(`text-sm`, isDarkMode ? "bg-stone-600 border border-gray-600 text-gray-200" : "bg-stone-950 border border-slate-400 text-neutral-400") }>{column.render("Header")}
                
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()} className={"border border-gray-400 p-1 text-xs"}> {cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    
  );
};

export default Daily;
