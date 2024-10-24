// Callouts \app\admin\(routes)\callouts\page.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RenderOrders from "@/features/admin/callout/RenderOrders";

const Callout = () => {
  return (
    <div className="p-1">
      <h1 className={"text-2xl font-semibold text-yellow-800 md:text-center "}>Order Callouts</h1>
      <p className="mb-4">
        This page will provide office staff a central location to make calls for scheduled orders.
      </p>
      <Tabs defaultValue="west" className="w-full pr-4">
        <TabsList className="w-full">
          <TabsTrigger value="west">West</TabsTrigger>
          <TabsTrigger value="central">Central</TabsTrigger>
          <TabsTrigger value="east">East</TabsTrigger>
          <TabsTrigger value="truckee">Truckee</TabsTrigger>
        </TabsList>
        <TabsContent className="px-2" value="west">
          <h1 className="text-xl font-semibold">West Division Callouts</h1>
          <RenderOrders repeatCount={7} />
        </TabsContent>
        <TabsContent value="central">
          <h1 className="text-xl font-semibold">Central Division Callouts</h1>
          <RenderOrders repeatCount={48} />
        </TabsContent>
        <TabsContent value="east">
          <h1 className="text-xl font-semibold">East Division Callouts</h1>
          <RenderOrders repeatCount={26} />
        </TabsContent>
        <TabsContent value="truckee">
          <h1 className="text-xl font-semibold">Truckee Division Callouts</h1>
          <RenderOrders />
        </TabsContent>
      </Tabs>
    </div>
  );
};
  
export default Callout;