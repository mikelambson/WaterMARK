// \app\(scheduling)\(routes)\daily\page.tsx
'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable, useSortBy } from "react-table";
import { Button } from "@/components/ui/button"


interface Order {
    id: number;
    orderTimestamp: string;
    irrigatorsName: string;
    ownersName: string;
    phoneNumber: string | null;
    phoneNumber2: string | null;
    phoneNumber3: string | null; // Assuming phoneNumber3 can be null
    lateral1: string;
    lateral2: string | null;
    lateral3: string | null;
    lateral4: string | null;
    approxCfs: number;
    approxHrs: number;
    orderNumber: number;
    tcidSn: string;
    remarks: string | null;
    approxAf: number;
    balance: number;
    district: string;
    adjust: string;
    scheduled: boolean;
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  

const Daily = () => {
  const [userInput, setUserInput] = useState("/o");
  const [queryParams, setQueryParams] = useState("/o");
  const [data, setData] = useState([]);
  const legacyOrdersUrl = `${baseUrl}legacyorders${queryParams}`;
  const fetchData = async () => {
    try {
      const response = await axios.get(legacyOrdersUrl);
      setData(response.data); // Assuming the API response is an array of objects
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = () => {
    // Update the queryParams state with the user input
    setQueryParams(userInput);
    // Call fetchData function to fetch data based on updated query parameters
    fetchData();
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
 const columns: Column<Order>[] = React.useMemo(
    () => [
      
      {
        Header: "Timestamp",
        accessor: "orderTimestamp",
        sortable: true,
      },
      {
        Header: "Order#",
        accessor: "orderNumber",
        sortable: true,
      },
      {
        Header: "Serial#",
        accessor: "tcidSn",
        sortable: true,
      },
      {
        Header: "Irrigator",
        accessor: "irrigatorsName",
      },
      {
        Header: "Owner",
        accessor: "ownersName",
      },
      // {
      //   Header: "Ph1",
      //   accessor: "phoneNumber",
      // },
      // {
      //   Header: "Ph2",
      //   accessor: "phoneNumber2",
      // },
      // {
      //   Header: "Ph3",
      //   accessor: "phoneNumber3",
      // },
      {
        Header: "L1",
        accessor: "lateral1",
      },
      {
        Header: "L2",
        accessor: "lateral2",
      },
      {
        Header: "L3",
        accessor: "lateral3",
      },
      {
        Header: "L4",
        accessor: "lateral4",
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
      // {
      //   Header: "Approx AF",
      //   accessor: "approxAf",
      // },
      // {
      //   Header: "Balance",
      //   accessor: "balance",
      // },
      {
        Header: "District",
        accessor: "district",
      },
      {
        Header: "Status",
        accessor: "adjust",
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
      
      <div className={"text-xl flex gap-2 items-center"}>
        <label htmlFor="queryParamsInput">Query:</label>
        <input
          type="text"
          id="queryParamsInput"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className={"pl-1 w-96"}
        />
        
        <Button variant={"outline"} className={"active:bg-slate-600"} onClick={handleSubmit}>Submit</Button>
      </div>

      </span>  
      <table {...getTableProps()} className={"border-collapse border border-gray-400 mt-2 max-w-[98%] scroll-auto ml-2 bg-neutral-300 text-black mb-6"}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className={"bg-stone-600 border border-gray-400 text-gray-200 text-sm"}>{column.render("Header")}
                
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
