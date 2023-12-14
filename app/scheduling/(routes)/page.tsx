// Scheduling Dashboard \app\(scheduling)\(routes)\scheduling\page.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Ordercount from "@/components/cards/Ordercount";
import SysInfo from "@/components/cards/SysInfo";
import Demand from "../_components/Demand";
import Forcast from "../_components/Forcast";
import Forcasting from "../_components/Forcasting";
import UpdateFlowsWM from "../_components/UpdateFlows";

const Scheduling = () => {

  return (
    <div className={"flex flex-col m-2"}>
      <div className={"flex-1"}>
        <h1 className={"text-2xl font-semibold text-yellow-800 md:text-center "}>Scheduling Dashboard</h1> 
      </div>
      <Tabs defaultValue="section1" className="mt-2 w-full">
        <TabsList className="w-full">
          <TabsTrigger value="section1">Main</TabsTrigger>
          <TabsTrigger value="updateflows">Update Flows</TabsTrigger>
          <TabsTrigger value="forcasting">Forcasting</TabsTrigger>
          <TabsTrigger value="section4">Task Status</TabsTrigger>
          <TabsTrigger value="section5">Watermaster Notes</TabsTrigger>
        </TabsList>
        <TabsContent value="section1">
          <div className={"w-full pt-1 grid grid-cols-[14rem_auto]"}>
            <div className="coll-start-1 row-start-1 flex flex-col gap-3">
              <Demand />
              <Ordercount className={"w-full"} />
            </div>
            <div className="col-start-2 row-start-1 row-span-2 flex flex-col gap-3 pl-3">
              <SysInfo />
              <Forcast />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="updateflows">
          <UpdateFlowsWM />
        </TabsContent>
        <TabsContent value="forcasting">
          <Forcasting />
        </TabsContent>
        <TabsContent value="section4">
          <p>Task Status</p>
        </TabsContent>
        <TabsContent value="section5">
          <p>Watermaster Notes</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Scheduling;
