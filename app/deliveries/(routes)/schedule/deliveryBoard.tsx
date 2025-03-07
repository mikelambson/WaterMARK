// TabbedColumn @\app\deliveries\_components\ScheduledDeliveryBoadtsx
"use client"
import { useDeliveriesStore }from "@/lib/deliveries/deliveriesStore";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { cn } from "@/lib/utils";
import { Schedule } from "@/typings";
import { useEffect } from 'react';
import { ScheduledDeliveryCard } from '@/app/deliveries/(routes)/schedule/deliveryScheduleCard';

type Properties = {
    id: number | null,
    columns: Schedule[],
    index: number,  
}


const ScheduledDeliveryBoard= ({ id, columns, index }: Properties) => {
    const { selectedDistrict, selectedSheet, selectedHead, setSelectedHead, schedule, getSchedule } = useDeliveriesStore();

    useEffect(() => { 
        const fetchSchedule = async () => {
            if (selectedSheet.name === "Select") {
              return null;
            }
            const head = Number(selectedHead);
            await getSchedule(head);
          };
        // Call fetchData whenever selectedDistrict changes
        fetchSchedule()
      }, [getSchedule, selectedDistrict, selectedSheet, selectedHead]); // Empty dependency array means this effect will only run once after initial render
    


    const optionSelection = (districtSelected: string): string | undefined => {
        const districtMapping: {[districtkey: string]: string} = {
          "WE": "WEST",
          "CE": "CENTRAL",
          "EA": "EAST",
          "TC": "TRUCKEE",
        };
      
        return districtMapping[districtSelected];
      };

    // Function to add hours to a timestamp
    const getIndexMS = (timestamp:number, hoursToAdd:number) => {
        const originalDate = new Date(timestamp);
        const endDate = new Date(originalDate.getTime() + hoursToAdd * 60 * 60 * 1000);

    return endDate.getTime();
    };


    return (   
        <div className="relative w-full min-h-[71svh] sm:min-h-[68.25svh] lg:min-h-[75svh] p-2 bg-foreground/10 dark:bg-foreground/75 rounded-md shadow-md">
        <Tabs key={("scheduledcolumn" + selectedSheet.name)} defaultValue={"1"} className="w-full h-full pb-0">
                <TabsList className={"mx-auto inline-flex w-full px-2 bg-stone-400 dark:bg-zinc-800 cursor-default"}>
                    <div key={"left"} className="inline-flex">
                        <h2 key={"label"} className={" font-semibold text-slate-600 dark:text-gray-400 self-center mr-2"}>
                            {selectedSheet.name} {selectedSheet.id === 0 ? "Headsheet" : "Head"}
                        </h2>
                        {Array.from({ length: selectedSheet.maxHeads }, (_, index) => (
                            <div key={("generated" + index + index + index)} onClick={() => {
                                setSelectedHead(index + 1)
                                getSchedule(index + 1)
                            }}>
                            <TabsTrigger 
                            className="active:border active:border-white/50 "
                            key={("trigger" + selectedSheet.name + (index) + selectedSheet + selectedHead)} 
                            value={`${index + 1}`
                            }>
                                {index + 1}
                            </TabsTrigger>
                            </div>
                        ))}
                        
                    </div>
                    {selectedSheet.name !== "Select" && (
                        <div key={"right"} onClick={() => setSelectedHead(10)}>
                            <TabsTrigger 
                            className="active:dark:bg-stone-500 active:border active:border-white/50 px-2 py-1 rounded-md"
                            key={("trigger" + selectedSheet.name + "dropins" + selectedSheet + selectedHead)} 
                            value={"10"}>
                                Drop-In
                            </TabsTrigger>
                        </div>
                    )}
                </TabsList>

                <TabsContent  value={selectedSheet.id === 0 ? "1" : "0"} className="h-full">
                    <div className="w-full min-h-[62svh] sm:min-h-[59svh] lg:min-h-[75svh] h-full flex flex-col justify-center text-center text-6xl md:text-8xl rounded-md bg-black/25 shadow-md">
                    {optionSelection(selectedDistrict)} 
                    </div>
                </TabsContent>
                <div   
                    key={("content" + selectedSheet.name + selectedHead)}
                    className={""}
                >
                    {Array.from({ length: selectedSheet.maxHeads }, (_, index) => (
                        <TabsContent key={index} value={`${index + 1}`} className="h-full rounded-md -mx-2">
                            <div className="text-center -mt-1 mb-1 text-md font-bold text-foreground/50 dark:text-secondary/50 tracking-widest">
                                {selectedSheet.name} | Head {selectedHead}
                            </div>
                            <div className="h-full min-h-96  w-full px-[0.5rem] rounded-md">
                            
                            {Array.from(schedule.columns.values())
                            .filter((sched) => sched.id === index + 1)
                            .map((filteredSched, innerIndex) => (
                                <div key={innerIndex} className="space-y-2">
                                {filteredSched.schedules.map((schedule: Schedule, innerIndex: number) => (
                                    <div key={innerIndex}>
                                    {schedule.order.status !== "running" ? (
                                        <ScheduledDeliveryCard
                                        schedule={schedule}
                                        index={getIndexMS(Date.parse(schedule.scheduledDate), schedule.order.approxHrs)}
                                        innerRef={() => {}}
                                        />
                                    ) : (
                                        <ScheduledDeliveryCard
                                        schedule={schedule}
                                        index={getIndexMS(Date.parse(schedule.scheduledDate), schedule.order.approxHrs)}
                                        key={innerIndex}
                                        innerRef={() => {}}
                                        />
                                    )}
                                    </div>
                                ))}
                                </div>
                            ))}

                            </div>
                        </TabsContent>
                    ))}
                    <TabsContent value={"10"} className="h-full">
                        <div className="text-center -mt-1 mb-1 text-md font-bold text-foreground/50 dark:text-secondary/50 tracking-widest">
                            {selectedSheet.name} Drop-In
                        </div>
                        <div className="w-full h-[72svh] rounded-md bg-black/10 px-[0.5rem]">
                            <h2 className={" text-center text-2xl font-semibold text-foreground dark:text-secondary"}>
                                {selectedSheet.name + "dropins" + selectedHead + "content"}
                            </h2>
                        </div>
                    </TabsContent>
                </div>
                    
                
            </Tabs>
        </div> 
    );
};

export { ScheduledDeliveryBoard };
