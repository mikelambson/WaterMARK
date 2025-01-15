"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea"; // Adjust import as per your library structure
import { cn } from "@/lib/utils/GeneralUtils";

const BackendStatus: React.FC = () => {
  const [status, setStatus] = useState<string>("");
  const statusRoute = `https://backend.watermark.work/status`;

  useEffect(() => {
    const eventSource = new EventSource(statusRoute);

    eventSource.onmessage = (event) => {
      // Append new data to the existing status text
      setStatus((prevStatus) => `${prevStatus}\n${event.data}`);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource error: ", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);
  

  return (
    <div className="relative text-green-500">
        <h1 className="absolute left-2 text-lg font-semibold">Backend Data Requests</h1>
        <div className={"h-96 border w-full text-foreground"}>
        <Textarea 
            className={"w-full h-full" }
            value={status} 
            readOnly 
        />
        </div>
    </div>
  );
};

export default BackendStatus;
