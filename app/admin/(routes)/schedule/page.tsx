// Delivery Schedule \app\deliveries\(routes)\schedule\page.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function DeliverySchedule() {
  return (
  <div className="p-1">
    <h1 className={"text-3xl font-semibold mb-5"}>Delivery Schedule</h1>
    <Tabs defaultValue="section1" className="w-full">
      <TabsList>
        <TabsTrigger value="section1">Section 1</TabsTrigger>
        <TabsTrigger value="section2">Section 2</TabsTrigger>
      </TabsList>
      <TabsContent value="section1">
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
      <TabsContent value="section2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium aut distinctio omnis aliquam recusandae! Quam, nostrum tempore illo hic sequi sapiente quae dolores assumenda cum? Exercitationem nemo eius similique vero?</TabsContent>
    </Tabs>
    
    
  </div>
  );

}