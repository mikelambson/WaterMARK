//Deliveries Dashboard \app\deliveries\(routes)\page.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import UpdateFlows from "@/components/function/UpdateFlows";
import SysInfo from "@/components/cards/SysInfo";

export default function Deliveries() {
  return (
    <div className="p-1">
      <h1 className={"text-2xl font-semibold text-yellow-800 md:text-center "}>Deliveries Dashboard</h1>

      <Tabs defaultValue="dashboard" className="mt-3 w-full p">
      <TabsList className="w-[81vw] md:w-full">
        <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        <TabsTrigger value="updateflows">Update Flows</TabsTrigger>
      </TabsList>
      <TabsContent value="dashboard">
        <SysInfo />
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
      </TabsContent>
      <TabsContent value="updateflows">
        <UpdateFlows />
      </TabsContent>
    </Tabs>

    </div>
    );
};
