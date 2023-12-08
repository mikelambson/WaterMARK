// Scheduling Dashboard \app\(scheduling)\(routes)\scheduling\page.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Ordercount from "@/components/cards/Ordercount";
import SysInfo from "@/components/cards/SysInfo";
import Demand from "../_components/Demand";
import Forcast from "../_components/Forcast";

const Scheduling = () => {

  return (
    <div className={"flex flex-col m-2"}>
      <div className={"flex-1"}>
        <h1 className={"text-2xl font-semibold text-yellow-800 md:text-center "}>Scheduling Dashboard</h1> 
      </div>
      <Tabs defaultValue="section1" className="mt-2 w-full">
        <TabsList className="w-full">
          <TabsTrigger value="section1">Main</TabsTrigger>
          <TabsTrigger value="section2">Forcasting</TabsTrigger>
          <TabsTrigger value="section3">Update Flows</TabsTrigger>
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
        <TabsContent value="section2">
          <ScrollArea className="h-full w-full rounded-md border p-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It&apos;s animated by default, but you can disable it if you
                  prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </ScrollArea>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium aut distinctio omnis aliquam recusandae! Quam, nostrum tempore illo hic sequi sapiente quae dolores assumenda cum? Exercitationem nemo eius similique vero?</p>
        </TabsContent>
        <TabsContent value="section3">
          <p>Update Flows</p>
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
