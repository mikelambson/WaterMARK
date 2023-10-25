"use client"
// ./app/scheduling/page.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { count } from "console";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
let defaultYear = 2023;

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

const Scheduling: React.FC = () => {
  const [countData, setCountData] = useState<Count | null>(null);
  const [year, setYear] = useState<number>(defaultYear);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<Count>(`${baseUrl}ordercount/${year}`);
        setCountData(response.data);
      } catch (error) {
        // Handle errors gracefully, e.g., show an error message to the user
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, [year]);

  return (
    <div className={"flex h-screen"}>
      <div className={"flex-1"}>
        <h1 className={"text-3xl font-semibold mb-5"}>Scheduling Dashboard</h1>

        {countData ? (
          <div className="w-60">
            <Card className="ml-5">
              <CardHeader>
                <CardTitle className="text-blue-400">Order Counts</CardTitle>
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
          <p>Loading data...</p>
        )}
      </div>
    </div>
  );
};


export default Scheduling;
