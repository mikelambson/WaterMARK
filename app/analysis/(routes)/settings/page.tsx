// import axios, { AxiosResponse } from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Headsheets,
  columns,
} from "@/features/scheduling/settings/hs-columns";
import { DataTable } from "@/features/scheduling/settings/data-table";
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
  const hsData = result.success ? result.data : errorMessage;
  const finalHsData = hsData || errorMessage;

  return (
    <>
      <Tabs defaultValue="home" className=" w-[98%] mx-auto mt-1">
        <TabsList className=" w-full">
          {" "}
          {/* items-center justify-center */}
          <TabsTrigger value="home">Settings</TabsTrigger>
          <TabsTrigger value="headsheets">Headsheets</TabsTrigger>
          <TabsTrigger value="ditchriders">Ditchriders</TabsTrigger>
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
      </Tabs>
    </>
  );
};

export default Settings;
