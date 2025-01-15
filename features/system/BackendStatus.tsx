"use client";
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea"; // Adjust import as per your library structure

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
    <div className="relative">
      <h1 className="absolute left-2 text-lg font-semibold">Backend Status</h1>
      <Textarea 
        className="w-full h-96" 
        value={status} 
        readOnly 
      />
    </div>
  );
};

export default BackendStatus;
