//scheduling/settings @/app/scheduling/(routes)/settings/page.tsx
// import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Headsheets,
  columns,
} from "@/features/scheduling/settings/hs-columns";
import { DataTable } from "@/features/scheduling/settings/data-table";
import FlowsSettings from "../../../../features/scheduling/settings/flowsSettings";
import ApiFetch from "@/lib/apiFetch";

const apiFetch = new ApiFetch();

const errorMessage: Headsheets[] = [
  {
    id: "0",
    name: "error connecting",
    district: "not availible",
    maxHeads: 0,
    structureRef: "",
    maxFlow: 0,
    characteristics: { message: "here" },
  },
];

const Settings = async () => {
  const result = await apiFetch.fetchData<Headsheets[]>("/headsheets");
  const hsData = result.success && Array.isArray(result.data)
  ? result.data.filter(row => row.name !== "NotScheduled")
  : errorMessage;
  const finalHsData = hsData || errorMessage;

  return (
    <div className="p-2">
      <h1 className="sm:hidden p-2 text-2xl font-semibold text-yellow-800 text-center">
        Scheduling Settings
      </h1>
      <Tabs defaultValue="home" className="w-full mx-auto mt-1">
        <TabsList className="w-full mx-auto">
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
            <DataTable columns={columns} data={finalHsData} />
          </div>
        </TabsContent>
        <TabsContent value="ditchriders">
          Change your ditchriders here.
        </TabsContent>
        <TabsContent value="sysinfo">
          <h1>Flow Settings</h1>
          <FlowsSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
