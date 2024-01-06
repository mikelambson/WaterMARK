//scheduling/settings @/app/scheduling/(routes)/settings/page.tsx
"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Headsheets,
  columns,
} from "@/app/scheduling/_components/settings/hs-columns";
import { DataTable } from "@/app/scheduling/_components/settings/data-table";
import FlowsSettings from "../../_components/settings/flowsSettings";
import ApiFetch from "@/lib/apiFetch";

const Settings = () => {
  const apiFetch = new ApiFetch();

  const [hsData, setHsData] = useState<Headsheets[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headsheetsData = await apiFetch.fetchData<Headsheets[]>(
          "headsheets"
        );
        setHsData(headsheetsData);
      } catch (error) {
        // Handle errors here (e.g., log the error or show a user-friendly message)
        console.error("Error fetching headsheets data:", error);
      }
    };

    fetchData();
  }, [apiFetch]);

  // const Settings = async () => {
  //     const hsData = await getHeadsheets();

  return (
    <>
      <Tabs defaultValue="home" className=" w-[98%] mx-auto mt-1">
        <TabsList className=" w-full">
          {" "}
          {/* items-center justify-center */}
          <TabsTrigger value="home">Settings</TabsTrigger>
          <TabsTrigger value="headsheets">Headsheets</TabsTrigger>
          <TabsTrigger value="ditchriders">Ditchriders</TabsTrigger>
          <TabsTrigger value="sysinfo">SysInfo</TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <h1 className="pt-8 font-semibold text-2xl w-2/3 mx-auto">
            This is the settings home where the watermaster will set and update
            certain features for the scheduling and delivery processes.
          </h1>
        </TabsContent>
        <TabsContent value="headsheets">
          <div className="mb-5">
            <DataTable columns={columns} data={hsData} />
          </div>
        </TabsContent>
        <TabsContent value="ditchriders">
          Change your ditchriders here.
        </TabsContent>
        <TabsContent value="sysinfo">
          <FlowsSettings />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Settings;
