// TabbedColumn @\app\scheduling\_components\schedule-orders\TabbbedColumn.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDistrictStore } from '@/store/districtSheetsStore';



interface TabbbedColumnProps {
    tabs: number;
    headsheet: String;
}

const ScheduledColumn = () => {
    const { districtSelected, selectedSheet, selectedHead, setSelectedHead } = useDistrictStore();

    const optionSelection = (districtSelected: string): string | undefined => {
        const districtMapping: {[key: string]: string} = {
          "WE": "WEST",
          "CE": "CENTRAL",
          "EA": "EAST",
          "TC": "TRUCKEE",
        };
      
        return districtMapping[districtSelected];
      };

    return (    
        <Tabs defaultValue="1" className="p-2 w-full h-full">
            <TabsList className={"mx-auto inline-flex justify-between w-full px-2 bg-stone-400 dark:bg-zinc-800 cursor-default"}>
                <div className="inline-flex">
                    <h2 className={" font-semibold text-slate-600 dark:text-gray-400 self-center mr-2"}>
                        {selectedSheet.name} Head
                    </h2>
                    {Array.from({ length: selectedSheet.maxHeads }, (_, index) => (
                        <div onClick={() => setSelectedHead(+index + 1)}>
                        <TabsTrigger 
                        key={index + 1} 
                        value={`${index + 1}`
                        }>
                            {index + 1}
                        </TabsTrigger>
                        </div>
                    ))}
                </div>
                {selectedSheet.name !== "Select" && (
                    <div onClick={() => setSelectedHead(10)}>
                        <TabsTrigger 
                        key={10} 
                        value={"10"}>
                            Drop-Ins
                        </TabsTrigger>
                    </div>
                )}
            </TabsList>
                <TabsContent key={selectedSheet.name === "Select" ? "1" : "0"} value={selectedSheet.name === "Select" ? "1" : "0"} className="h-full">
                    <div className="w-full h-full text-center text-6xl md:text-9xl pt-24 mb-96">
                    {optionSelection(districtSelected)}
                    </div>
                </TabsContent>
                {Array.from({ length: selectedSheet.maxHeads }, (_, index) => (
                    <TabsContent key={index + 1} value={`${index + 1}`}>
                        <h2 className={" text-center text-2xl font-semibold text-foreground dark:text-secondary"}>{selectedHead}</h2>
                        {/* <Droppable>
                            {Children}
                        </Droppable> */}
                    </TabsContent>
                ))}
                <TabsContent key={10} value={"10"}>
                    <h2 className={" text-center text-2xl font-semibold text-foreground dark:text-secondary"}>
                        Drop-Ins</h2>
                    {/* <Droppable>
                        {Children}
                    </Droppable> */}
                </TabsContent>
            
        </Tabs>
    );
};

export default ScheduledColumn;
