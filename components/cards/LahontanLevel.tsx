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
    
            worker.postMessage('https://nwis.waterdata.usgs.gov/usa/nwis/uv/?cb_00054=on&cb_00062=on&cb_62615=on&format=rdb&site_no=10312100&legacy=1&period=&begin_date=2024-01-01&end_date=2024-11-07');
    
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
        return <Skeleton className="w-full h-96 mt-6" />;
      }
    
      if (error) {
        return (<div><Skeleton className="w-full h-96 mt-6" />
                Error: {error}
                </div>);
      }

    return (
        <Card className={className}>
        <CardContent>
            {data ? <LahontanLevelGraph className={"my-4"} data={data} />
            : <Skeleton className="w-full h-96 mt-6" />}
        </CardContent>
            <CardFooter className="inline-flex w-full justify-end">
                <Dialog>
                    <DialogTrigger className="z-10">
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
                                        <div className="w-full text-sm whitespace-pre-wrap">
                                            {JSON.stringify(data, null, 2)}
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
