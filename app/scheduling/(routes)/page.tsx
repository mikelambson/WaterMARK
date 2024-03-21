// Scheduling Dashboard \app\(scheduling)\(routes)\scheduling\page.tsx
"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Ordercount from "@/components/cards/Ordercount";
import SysInfo from "@/components/cards/SysInfo";
import Demand from "../_components/Demand";
import { Forcast } from "@/components/cards/Forcast";
import Forecasting from "../_components/Forecasting";
import UpdateFlows from "@/components/function/UpdateFlows";
import { useState } from "react";

const Scheduling = () => {

  const [headerText, setHeaderText] = useState("Scheduling Dashboard");

  const handleTabClick = (tabValue: string) => {
    switch (tabValue) {
      case "dashboard":
        setHeaderText("Scheduling Dashboard");
        break;
      case "updateflows":
        setHeaderText("Update Flows");
        break;
      case "forcasting":
        setHeaderText("Forcasting");
        break;
      case "taskstatus":
        setHeaderText("Task Status");
        break;
      case "watermasternotes":
        setHeaderText("Watermaster Notes");
        break;
      default:
        setHeaderText("Scheduling Dashboard");
    }
  };

  return (
    <div className={"flex flex-col m-2"}>
      <div className={"flex-1"}>
        <h1 className={"text-xl font-semibold text-yellow-800 md:text-center "}>{headerText}</h1> 
      </div>
      <Tabs defaultValue="dashboard" className="mt-2 w-full">
        <TabsList className="w-[81vw] md:w-full">
        <TabsTrigger value="dashboard" onClick={() => handleTabClick("dashboard")}>
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="updateflows" onClick={() => handleTabClick("updateflows")}>
            Update Flows
          </TabsTrigger>
          <TabsTrigger value="forcasting" onClick={() => handleTabClick("forcasting")}>
            Forcasting
          </TabsTrigger>
          <TabsTrigger value="taskstatus" onClick={() => handleTabClick("taskstatus")}>
            Task Status
          </TabsTrigger>
          <TabsTrigger value="watermasternotes" onClick={() => handleTabClick("watermasternotes")}>
            Watermaster Notes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard">
          <div className={"w-full pt-1 flex flex-col gap-3 md:grid md:grid-cols-[14rem_auto]"}>
            <div className="col-start-2 row-start-1 row-span-2 flex flex-col gap-3 md:min-w-[20rem]">
              <SysInfo />
              <Forcast />
            </div>
            <div className="coll-start-1 row-start-1 flex flex-col gap-3">
              <Demand />
              <Ordercount className={"w-full"} />
            </div>
            
          </div>
        </TabsContent>
        <TabsContent value="updateflows">
          <UpdateFlows watermaster />
        </TabsContent>
        <TabsContent value="forcasting">
          <Forecasting />
        </TabsContent>
        <TabsContent value="taskstatus">
          <p>Task Status</p>
        </TabsContent>
        <TabsContent value="watermasternotes">
          <p>Watermaster Notes</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Scheduling;
