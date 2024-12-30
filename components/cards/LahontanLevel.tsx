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
// import LoadingAnimation from "@/features/loader/loading.module";
import ComponentLoader from "@/features/loader/comploader.module";

interface ForcastProps {
  className?: string;
}

const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure month is 2 digits
    const day = String(date.getDate()).padStart(2, '0'); // Ensure day is 2 digits
    return `${year}-${month}-${day}`;
};

const LahontanLakeLevel = ({ className }: ForcastProps) => {
    const { data, lastFetched, setData } = useLahontanDataStore();
    const [error, setError] = useState<string | null>(null);
    const [lahontanIsLoading, setLahontanIsLoading] = useState(true);
  
    useEffect(() => {
        const cacheExpiration = 12 * 60 * 60 * 1000;
        const currentTime = new Date().getTime();
        const today = new Date();

        if (data && lastFetched && currentTime - lastFetched < cacheExpiration) {
          // Use cached data if it's less than an hour old
          setLahontanIsLoading(false);
        } else {
          // Fetch new data using Web Worker if cache is expired or data is missing
          if (window.Worker) {
            const worker = new Worker(new URL('@/services/workers/fetchWorker.js', import.meta.url));
            const endDate = formatDate(today);
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(today.getFullYear() - 1);
            const beginDate = formatDate(oneYearAgo);

            worker.postMessage(`https://nwis.waterdata.usgs.gov/usa/nwis/uv/?cb_00054=on&cb_00062=on&cb_62615=on&format=rdb&site_no=10312100&legacy=1&period=&begin_date=${beginDate}&end_date=${endDate}`);
    
            worker.onmessage = (event) => {
              if (event.data.error) {
                  console.error(`Error from worker: ${event.data.error}`);
                  setError(event.data.error);
              } else {
                  setData(event.data);
              }
              setLahontanIsLoading(false);
              worker.terminate();
          };
    
            worker.onerror = (error) => {
              setError('Worker error: ' + error.message);
              setLahontanIsLoading(false);
              worker.terminate();
            };
          } else {
            setError('Web Workers are not supported in this browser');
            setLahontanIsLoading(false);
          }
        }
      }, [data, lastFetched, setData]);
    
    
      if (error) {
        return (
            <div>
                <Skeleton className="w-full h-96">
                    Error: {error}
                </Skeleton>
            </div>
        );
      }

    return (
        <Card className={className}>
            {lahontanIsLoading ? (
                <CardContent>
                    <Skeleton className="w-full h-[450px] mt-5 pt-24" >
                        <ComponentLoader />
                    </Skeleton>
                </CardContent>
            ) : (
                <>
                <CardContent>
                    {data ? <LahontanLevelGraph className={"my-4"} data={data} />
                    : <Skeleton className="w-full h-[500px] mt-6" />}
                </CardContent>
                 <CardFooter className="inline-flex w-full justify-end">
                 <Dialog>
                     <DialogTrigger className="z-10">
                         <MdDataset size={20} />
                     </DialogTrigger>
                     <DialogContent className="w-4/5 h-5/6 bg-card">
                         <DialogHeader>
                             <DialogTitle>Lahonton Lake Level Data</DialogTitle>
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
             </>
            )}
           
        </Card>
    );
};

export default LahontanLakeLevel;
