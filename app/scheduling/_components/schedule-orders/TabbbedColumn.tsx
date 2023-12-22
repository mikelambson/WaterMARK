// TabbedColumn @\app\scheduling\_components\schedule-orders\TabbbedColumn.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDistrictStore } from '@/store/districtSheetsStore';


interface TabbbedColumnProps {
    tabs: number;
    headsheet: String;
}

const TabbedColumn = () => {
    const { districtSelected, headsheets, selectedSheet, setDistrict, getHeadsheets, setSelectedSheet } = useDistrictStore();

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
        <div>
        <Tabs defaultValue="0" className="w-full h-full">
            <TabsList className={"mx-[1px] inline-flex md:w-full w-[99%] pl-2 bg-stone-400 dark:bg-zinc-800"}>
            <h2 className={" font-semibold text-slate-600 dark:text-gray-400 self-center mr-2"}>
                {selectedSheet.name} Head
            </h2>
            {Array.from({ length: selectedSheet.maxHeads }, (_, index) => (
                <TabsTrigger key={index + 1} value={`${index + 1}`}>
                    {index + 1}
                </TabsTrigger>
            ))}
            </TabsList>
                <TabsContent key="0" value="0" className=" h-80">
                    <div className="w-full h-full text-center text-6xl md:text-9xl pt-24">
                    {optionSelection(districtSelected)}
                    </div>
                </TabsContent>
                {Array.from({ length: selectedSheet.maxHeads }, (_, index) => (
                    <TabsContent key={index + 1} value={`${index + 1}`}>
                        <h2 className={" text-center text-2xl font-semibold text-foreground dark:text-secondary"}>{index + 1}</h2>
                    </TabsContent>
                ))}  
            
        </Tabs>
        </div>
    );
};

export default TabbedColumn;
