// UnscheduledColumn.jsx
import { Order, TypedColumn } from "@/typings";
import { IoSearch } from "react-icons/io5";
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Properties = {
    id: TypedColumn,  
}

const columnNames = {
  "unscheduled": "Unscheduled",
  "scheduled": "Scheduled"
};

const UnscheduledColumn = ({id}:Properties ) => (
    <Tabs defaultValue="1" className="p-2 w-full h-full">
        <TabsList className={"mx-auto inline-flex justify-between w-full px-2 bg-stone-400 dark:bg-zinc-800 cursor-default"}>
            <div className="inline-flex">
            <TabsTrigger 
            key={1} 
            value={"1"}>
                Pending
            </TabsTrigger>
            
            <TabsTrigger 
            key={2} 
            value={"2"}>
                Delayed
            </TabsTrigger>
            </div>
            <div className="inline-flex">
            <IoSearch className="self-center -mr-5" /> 
            <Input type="filter" placeholder={"Filter Line"} className="pl-5 h-7 w-32 bg-background/60 self-center uppercase" />
            </div>
        </TabsList>
            <TabsContent key={"1"} value={"1"}>
                <div className="text-center text-2xl font-semibold text-foreground dark:text-secondary">
                    {columnNames[id]}
                </div>
            </TabsContent>
            
            <TabsContent key={2} value={"2"}>
                <h2 className={" text-center text-2xl font-semibold text-foreground dark:text-secondary"}>
                    Delayed
                </h2>
                
            </TabsContent>
    </Tabs>
);

export default UnscheduledColumn;