// @/components/Ordercount.tsx
"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ApiFetch from "@/lib/apiFetch";
import { useState, useEffect } from "react";

const api = new ApiFetch();
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
    const specificRoute = `/ordercount/${year}`
    async function fetchData() {
      try {
        const result = await api.fetchData<Count>(specificRoute);
        if (!result.success) return console.error("Error fetching data:", result.error);
        const data = result.data;
        if (data == undefined) return setCountData(null);
        setCountData(data)
        } catch (error) {
        console.error("Data Error:", error);
      }
    }
    fetchData();  
  }, [year]);

  return (
    <div className={props.className || "w-fit"}>
      {countData ? (
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-card-alternative">
                Order Counts
              </CardTitle>
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
        <Card>
          <CardHeader>
            <CardTitle className="text-card-alternative">
              Order Counts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className=" w-full h-96 rounded-xl" />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Ordercount;
