// TabbedColumn @\app\scheduling\_components\schedule-orders\TabbbedColumn.tsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



interface TabbbedColumnProps {
    tabs: number;
    headsheet: String;
}

const TabbedColumn: React.FC<TabbbedColumnProps> = ({ tabs, headsheet }) => {


    return (    
        <div>
        <Tabs defaultValue="1" className="w-full">
            <TabsList className={"inline-flex w-full pl-2 bg-stone-400 dark:bg-zinc-800"}>
            <h2 className={" font-semibold text-slate-600 dark:text-gray-400 self-center mr-2"}>
                {headsheet}
            </h2>
            {Array.from({ length: tabs }, (_, index) => (
                <TabsTrigger key={index + 1} value={`${index + 1}`}>
                    {index + 1}
                </TabsTrigger>
            ))}
            </TabsList>
            {Array.from({ length: tabs }, (_, index) => (
                <TabsContent key={index + 1} value={`${index + 1}`}>
                    <h2 className={" text-center text-2xl font-semibold text-foreground dark:text-secondary"}>{index + 1}</h2>
                </TabsContent>
            ))}    
        </Tabs>
        </div>
    );
};

export default TabbedColumn;
