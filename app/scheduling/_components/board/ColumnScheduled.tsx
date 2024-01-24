// TabbedColumn @\app\scheduling\_components\schedule-orders\TabbbedColumn.tsx
import { useSchedulingStore } from '@/lib/store/schedulingStore';
import OrderCard from "@/app/analysis/_components/OrderCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils";
import { Order, Schedule, TypedColumn } from "@/typings";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useEffect } from 'react';

type Properties = {
    id: TypedColumn,
    columns: (Schedule | Order)[],
    index: number,  
}

const ScheduledColumn = ({ id, columns, index }: Properties) => {
    const { selectedDistrict, selectedSheet, selectedHead, setSelectedHead, schedule, getSchedule } = useSchedulingStore();

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



    return (   
        <div className="relative w-full min-h-96 h-[84svh] p-2 px-2 bg-foreground/10 dark:bg-foreground/75 rounded-md overflow-hidden shadow-md">
        <Tabs key={("scheduledcolumn" + selectedSheet.name)} defaultValue={String(selectedHead)} className="w-full h-full pb-8">
                <TabsList className={"mx-auto inline-flex justify-between w-full px-2 bg-stone-400 dark:bg-zinc-800 cursor-default"}>
                    <div key={"left"} className="inline-flex">
                        <h2 key={"label"} className={" font-semibold text-slate-600 dark:text-gray-400 self-center mr-2"}>
                            {selectedSheet.name} Head
                        </h2>
                        {Array.from({ length: selectedSheet.maxHeads }, (_, index) => (
                            <div key={("generated" + index + index + index)} onClick={() => {
                                setSelectedHead(index + 1)
                                getSchedule(index + 1)
                            }}>
                            <TabsTrigger 
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
                            key={("trigger" + selectedSheet.name + "dropins" + selectedSheet + selectedHead)} 
                            value={"10"}>
                                Drop-Ins
                            </TabsTrigger>
                        </div>
                    )}
                </TabsList>

                <TabsContent  value={selectedSheet.name === "Select" ? "1" : "0"} className="h-full pb-4">
                    <div className="w-full h-full flex flex-col justify-center text-center text-6xl md:text-8xl rounded-md bg-black/25 shadow-md">
                    {optionSelection(selectedDistrict)}
                    {/* <p className="text-md">{(selectedSheet.name === "Select" ? "sudo1" : "sudo0")}</p> */}
                    </div>
                </TabsContent>
                <Droppable droppableId={"1"} type="card" >
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={cn("h-full rounded-md -mx-2 pb-8 border border-transparent", snapshot.isDraggingOver ? "bg-yellow-200/50" : "bg-transparent")}
                            
                        >
                            {Array.from({ length: selectedSheet.maxHeads }, (_, index) => (
                                <TabsContent key={(index)} value={`${index + 1}`} className="h-full">
                                    <div className="text-center -mt-1 mb-1 text-md font-bold text-foreground/50 dark:text-secondary/50 tracking-widest">{selectedSheet.name} | Head {selectedHead} </div>
                                    <ScrollArea className="h-[72svh] rounded-md px-2">
                                        
                                        <div className="space-y-2">
                                        {Array.from(schedule.columns.values())
                                            .filter(sched => sched.id === (index + 1))
                                            .map((filteredSched, innerIndex) => (
                                                <div key={innerIndex}>
                                                    {filteredSched.schedules.map((schedule: any, innerIndex: number) => (
                                                        <Draggable
                                                        key={innerIndex}
                                                        draggableId={schedule.order.orderNumber.toString()}
                                                        index={innerIndex}
                                                        >
                                                            {(provided) => (
                                                                <div  
                                                                key={innerIndex}
                                                                id={schedule.order.orderNumber}
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                className="border rounded-md p-2 bg-slate-600 dark:bg-gray-800">
                                                                    <p>Scheduled Date: {schedule.scheduledDate}</p>
                                                                    <p>Order ID: {schedule.orderId}</p>
                                                                    <p>Headsheet {schedule.scheduledLine.name}</p>
                                                                    <p>Head: {schedule.scheduledHead}</p>
                                                                    {/* Add more properties as needed */}
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                                
                                            ))}
                                       
                                        
                                    </div>
                                    </ScrollArea>
                                </TabsContent>    
                            ))}
                        
                    
                <TabsContent  value={"10"} className="h-full">
                    <div className="text-center -mt-1 mb-1 text-md font-bold text-foreground/50 dark:text-secondary/50 tracking-widest">{selectedSheet.name} Drop-Ins </div>
                    <ScrollArea className="w-full h-[72svh] rounded-md bg-black/10 px-[0.5rem]">
                        <h2 className={" text-center text-2xl font-semibold text-foreground dark:text-secondary"}>
                            {(selectedSheet.name + "dropins" + selectedHead + "content")}
                        </h2>
                    </ScrollArea>
                </TabsContent>
                </div>
                )}
                </Droppable>
            </Tabs>
        </div> 
    );
};

export default ScheduledColumn;
