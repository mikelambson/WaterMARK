"use client"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import LahontanLevelGraph from "@/components/function/LahontanLevelGraph";
import { MdDataset } from "react-icons/md";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useLahontanDataStore } from "@/lib/store/usgs/usgsLahontan";

interface ForcastProps {
  className?: string;
}

const LahontanLakeLevel = ({ className }: ForcastProps) => {
    const { data, lastFetched, setData } = useLahontanDataStore();
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        const cacheExpiration = 60 * 60 * 1000; // 1 hour in milliseconds
        const currentTime = new Date().getTime();
    
        if (data && lastFetched && currentTime - lastFetched < cacheExpiration) {
          // Use cached data if it's less than an hour old
          setIsLoading(false);
        } else {
          // Fetch new data using Web Worker if cache is expired or data is missing
          if (window.Worker) {
            const worker = new Worker(new URL('@/utils/fetchWorker.js', import.meta.url));
    
            worker.postMessage('https://nwis.waterservices.usgs.gov/nwis/iv/?sites=10312100&agencyCd=USGS&startDT=2023-11-08T10:08:41.209-08:00&endDT=2024-11-07T10:08:41.209-08:00&parameterCd=00054&format=rdb');
    
            worker.onmessage = (event) => {
              if (event.data.error) {
                setError(event.data.error);
              } else {
                setData(event.data);
              }
              setIsLoading(false);
              worker.terminate();
            };
    
            worker.onerror = (error) => {
              setError('Worker error: ' + error.message);
              setIsLoading(false);
              worker.terminate();
            };
          } else {
            setError('Web Workers are not supported in this browser');
            setIsLoading(false);
          }
        }
      }, [data, lastFetched, setData]);
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }

    return (
        <Card className={className}>
        <CardContent>
            {data ? <LahontanLevelGraph className={"my-4"} />
            : <Skeleton className="w-full h-96 mt-6" />}
        </CardContent>
            <CardFooter className="inline-flex w-full justify-end">
                <Dialog>
                    <DialogTrigger>
                        <MdDataset size={20} />
                    </DialogTrigger>
                    <DialogContent className="w-4/5 h-5/6 bg-card">
                        <DialogHeader>
                            <DialogTitle>Lahoton Lake Level Data</DialogTitle>
                            <DialogDescription>
                                The following data is from the USGS National Water Information System (NWIS).                             
                            </DialogDescription>
                                <ScrollArea className="w-full border h-[550]">
                                    {data ? (
                                        <div className="w-full text-sm">
                                            {JSON.stringify(data)}
                                        </div>
                                    )
                                        : <Skeleton className="w-full h-96 mt-6" />
                                    }
                                </ScrollArea>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </CardFooter>
        </Card>
    );
};

export default LahontanLakeLevel;
