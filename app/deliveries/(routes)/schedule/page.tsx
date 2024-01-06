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
    <h1 className={"text-2xl font-semibold text-yellow-800 md:text-center "}>Delivery Schedule</h1>
    <p>This is the where the orders will be started and tracked for deliveries.</p>
    <Tabs defaultValue="section1" className="w-full pr-2">
      <TabsList className="w-full flex flex-wrap">
        <TabsTrigger value="section1">Head 1</TabsTrigger>
        <TabsTrigger value="section2">Head 2</TabsTrigger>
        <p className="absolute pl-[60vw] pt-2 text-xs italic text-card-alternative pointer-events-none">&#123;Dynamic section...&#125;</p>
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
