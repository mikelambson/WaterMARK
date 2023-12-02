// @/components/Ordercount.tsx
"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { Skeleton } from "./ui/skeleton";
import { propagateServerField } from "next/dist/server/lib/render-server";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
let defaultYear = 2023;

interface OrdercountProps {
  className?: string;
}

interface Count {
  Year: number;
  Open: number;
  Pending: number;
  Scheduled: number;
  Running: number;
  PendingAnalysis: number;
  ReadyToPost: number;
  Posted: number;
  Cancelled: number;
  Finalized: number;
  Spread: number;
  Adjusted: number;
  Null: number;
  TotalOrders: number;
}

const Ordercount: React.FC<OrdercountProps> = (props) => {
    const [countData, setCountData] = useState<Count | null>(null);
    const [year, setYear] = useState<number>(defaultYear);
  
    useEffect(() => {
      async function fetchData() {
        try {
          
          const response = await axios.get<Count>(`${baseUrl}ordercount/${year}`);
          setCountData(response.data);
          // setCountData(null);
        } catch (error) {
          // Handle errors gracefully, e.g., show an error message to the user
          console.error('Error fetching data:', error);
        }
      }
  
      fetchData();
    }, [year]);
  

    return (
      <div className={props.className  || "w-fit"}>
         
          {countData ? (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-card-alternative">Order Counts</CardTitle>
                </CardHeader>
                <CardContent>
                <ul>
                  
                  <li>Open: {countData.Open}</li>
                  <li>Pending: {countData.Pending}</li>
                  <li>Scheduled: {countData.Scheduled}</li>
                  <li>Running: {countData.Running}</li>
                  <li>Pending Analysis: {countData.PendingAnalysis}</li>
                  <li>Ready To Post: {countData.ReadyToPost}</li>
                  <li>Posted: {countData.Posted}</li>
                  <li>Cancelled: {countData.Cancelled}</li>
                  <li>Finalized: {countData.Finalized}</li>
                  <li>Spread: {countData.Spread}</li>
                  <li>Adjusted: {countData.Adjusted}</li>
                  <li>Null: {countData.Null}</li>
                  {/* Add other count properties here */}
                </ul>
                </CardContent>
                <CardFooter>
                  <p>Total Orders: {countData.TotalOrders}</p>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <Skeleton className=" w-56 h-[30rem] rounded-xl" />
          )}
        </div>
      
    );
  };
  
  
  export default Ordercount;