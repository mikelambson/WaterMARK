// TabbedColumn @\app\scheduling\_components\schedule-orders\TabbbedColumn.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDistrictStore } from '@/lib/store/districtSheetsStore';


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
        <Tabs defaultValue="1" className="relative p-2 w-full h-[84svh] bg-foreground/10 dark:bg-foreground/75 rounded-md">
            <TabsList className={"mx-auto inline-flex justify-between w-full px-2 bg-stone-400 dark:bg-zinc-800 cursor-default"}>
                <div className="inline-flex">
                    <h2 className={" font-semibold text-slate-600 dark:text-gray-400 self-center mr-2"}>
                        {selectedSheet.name} Head
                    </h2>
                    {Array.from({ length: selectedSheet.maxHeads }, (_, index) => (
                        <div onClick={() => setSelectedHead(+index + 1)}>
                        <TabsTrigger 
                        key={20 + selectedSheet.name + index + 1} 
                        value={`${index + 1}`
                        }>
                            {index + 1}
                        </TabsTrigger>
                        </div>
                    ))}
                </div>
                {selectedSheet.name !== "Select" && (
                    <div key={10} onClick={() => setSelectedHead(10)}>
                        <TabsTrigger 
                        key={10} 
                        value={"10"}>
                            Drop-Ins
                        </TabsTrigger>
                    </div>
                )}
            </TabsList>

            <TabsContent key={selectedSheet.name === "Select" ? "1" : "0"} value={selectedSheet.name === "Select" ? "1" : "0"} className="h-[75svh]">
                <div className="w-full h-full flex flex-col justify-center text-center text-6xl md:text-8xl rounded-md bg-black/25 shadow-md">
                {optionSelection(districtSelected)}
                </div>
            </TabsContent>
            {Array.from({ length: selectedSheet.maxHeads }, (_, index) => (
                <TabsContent key={+selectedSheet.name + index + 10} value={`${index + 1}`} className="h-[29rem]">
                    <div className="text-center -mt-2 text-sm font-bold italic text-foreground/50 dark:text-secondary/50 tracking-widest">{selectedSheet.name} | Head {selectedHead} </div>
                    <ScrollArea className="h-[73.5svh] rounded-md bg-black/10">
                        <h2 className={" text-center text-2xl font-semibold text-foreground dark:text-secondary"}>{selectedHead}</h2>
                    </ScrollArea>
                </TabsContent>    
            ))}
            <TabsContent key={+selectedSheet.name + 10} value={"10"} className="h-[29rem]">
                <div className="text-center -mt-2 text-sm font-bold italic text-foreground/50 dark:text-secondary/50 tracking-widest">{selectedSheet.name} Drop-Ins </div>
                <ScrollArea className="w-full h-[73vh] rounded-md bg-black/10 px-[0.5rem]">
                    <h2 className={" text-center text-2xl font-semibold text-foreground dark:text-secondary"}>
                        Drop-Ins
                    </h2>
                    <p className="text-stone-300/25">{selectedHead} </p>
                    
                </ScrollArea>
            </TabsContent>
        </Tabs>
    );
};

export default ScheduledColumn;
