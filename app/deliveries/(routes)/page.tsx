//Deliveries Dashboard \app\deliveries\(routes)\page.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Deliveries() {
  return (
    <div className="p-1">
      <h1 className={"text-2xl font-semibold text-yellow-800 md:ml-[34vw] "}>Deliveries Dashboard</h1>
      <p>This is a ditchrider dashboard which will be designed with quick access to info for some of the key systems and reserviors, tasks, and other operations functions.</p>
      <p>On this page, there should be a place to update some operations measurement points, and should default to district worked.</p>

      <Tabs defaultValue="section1" className="mt-3 w-full">
      <TabsList>
        <TabsTrigger value="section1">Main</TabsTrigger>
        <TabsTrigger value="section2">Update Flows</TabsTrigger>
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
      <TabsContent value="section2">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium aut distinctio omnis aliquam recusandae! Quam, nostrum tempore illo hic sequi sapiente quae dolores assumenda cum? Exercitationem nemo eius similique vero?</p>

      </TabsContent>
    </Tabs>

    </div>
    );
};
