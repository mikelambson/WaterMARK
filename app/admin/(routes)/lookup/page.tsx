// \app\admin\(routes)\lookup\page.tsx
'use client'
import React, { useEffect, useCallback } from 'react';
import axios from "axios";
import { useTable, useSortBy } from "react-table";
import { Button } from "@/components/ui/button"
import useQueryStore from '@/lib/store/queryStore';
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Order } from '@/typings';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from '@/components/ui/table';



interface TableColumn {
  
  Header: string;
  accessor: keyof Order | string;
  Cell?: (row: any) => React.ReactNode;
}
  
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  

const Lookup = () => {
  const { data, setData, userInput, setUserInput, queryParams, setQueryParams }: any = useQueryStore();
  const ordersUrl = `${baseUrl}orders${queryParams}`;

  const { theme } = useTheme();
  const isDarkMode = theme === "light";

  const tableSetup = "border-collapse border mt-2 max-w-[98%] scroll-auto ml-2 mb-6"
  
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(ordersUrl);
      setData(response.data); // Assuming the API response is an array of objects
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [ordersUrl, setData]);


  const handleSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      setQueryParams(userInput);
      fetchData();
    },
    [userInput, fetchData, setQueryParams]
  );

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  // Trigger fetchData function on component mount and whenever queryParams changes
  useEffect(() => {
    fetchData();
  }, [queryParams, fetchData]);

    
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


  return (<>
    <h1 className={'text-2xl font-semibold text-yellow-800 md:text-center'}>Water Order Lookup</h1>

    <h2>
      This lookup form is a placeholder for the final design. Part of the backend code for this component will be used, but the elements of the process and method to find orders will be streamlined and simplified.
    </h2>

    <div className={"overflow-auto"}>
      <span className={"ml-2 pt-4 flex gap-6"}>
      <h1 className={"mt-2 text-xl font-bold "}>Order Count | {rows.length}</h1> 
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
      </div>

    <Table {...getTableProps()} className={cn(`${tableSetup}`, isDarkMode ? 'bg-neutral-300 border-neutral-400 text-black' : 'text-neutral-400 border-slate-800 bg-stone-800')}>

      <form onSubmit={handleSubmit}>
        <div className={'px-4 flex justify-between'}>
          <div className={'text-xl flex gap-2 items-center'}>
            <label htmlFor="queryParamsInput">Query:</label>
            <input
              key={'lookup'}
              type="text"
              id="queryParamsInput"
              value={userInput}
              onKeyDown={handleKeyPress}
              onChange={(e) => setUserInput(e.target.value)}
              className={'pl-1 w-96'}
            />
            <Button variant={'outline'} type="submit" className={'active:bg-slate-600'}>
              Submit
            </Button>
          </div>
          <span className={'ml-2 pt-3 flex gap-6'}>
            <h1 className={'mt-2 text-xl font-bold '}>Order Count | {rows.length}</h1>
            <Button className={'active:bg-slate-500'}>Print List</Button>
          </span>
        </div>
      </form>

      <TableHeader>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableHead {...column.getHeaderProps()}>{column.render('Header')}</TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>

      <TableBody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
    </>
  );
};

export default Lookup;