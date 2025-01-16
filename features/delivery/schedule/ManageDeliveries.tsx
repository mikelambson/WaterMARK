import { Schedule } from '@/typings';
import { 
    DrawerClose, 
    DrawerContent, 
    DrawerDescription, 
    DrawerFooter, 
    DrawerHeader, 
    DrawerTitle 
} from '@/components/ui/drawer';
import { FaHandHoldingWater } from 'react-icons/fa';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
    Dialog, 
    DialogTrigger 
} from '@/components/ui/dialog';
import { DatePicker, TimePicker } from '@/features/delivery/schedule/DateTimePicker';
import UpdateMeasurements from '@/features/delivery/schedule/updateMeasurements';
import EndRun from './EndRun';
import { cn } from '@/lib/utils/GeneralUtils';

interface Props {
    schedule: Schedule
}

const ManageDelivery: React.FC<Props> = ({schedule}) => {
    // Component logic goes here

    return (
        <DrawerContent className="w-full min-h-96">
            <DrawerHeader>
                <DrawerTitle className="flex gap-3 text-xl justify-center">
                    <FaHandHoldingWater size={"1.25em"} />
                    Manage Deliveries
                    <UpdateMeasurements 
                        variant="secondary"
                        size="sm"
                        buttonText="Add Delivery"
                    />
                </DrawerTitle>  
                <DrawerDescription className="flex justify-center gap-4 -my-1">
                    <span className="text-foreground/50 text-sm">
                        Order Number:
                        <span className="ml-1 text-card-alternative font-semibold">
                            {schedule.order.orderNumber}
                        </span>
                    </span>
                    <span className="text-foreground/50 text-sm">
                        Serial Number: 
                        <span className="ml-1 text-card-alternative font-semibold">
                            {schedule.order.tcidSn}
                        </span>
                    </span>
                </DrawerDescription>                                      
            </DrawerHeader>
            <div className="flex flex-col w-full px-2 h-full gap-2 mx-auto justify-center align-middle">
                <ScrollArea className="flex flex-col max-h-[65svh] border border-foreground/30 bg-stone-500/75 dark:bg-stone-700 rounded-md px-4">
                    {schedule.deliveries?.length === 0 
                    ? <div className="h-48 flex justify-center items-center">
                        <p className="text-2xl">No Deliveries Recorded</p>
                        
                    </div> 
                    : <div className="h-2" />}
                    {schedule.deliveries?.slice().reverse().map((delivery, index) => { 
                        const reversedIndex = schedule.deliveries.length - index;

                        return (
                        <div key={index} className={cn("relative z-0 flex w-full mx-auto mb-2 space-y-2 border-2 border-foreground/50 p-2 rounded-md", delivery.stopTime ? "bg-slate-500 dark:bg-slate-950" : "bg-card")}>
                            <div 
                                className="text-2xl font-bold my-8 align-middle text-center bg-foreground/50 py-2 rounded-md mr-2 text-orange-200/90 border dark:text-orange-300/80 border-t-slate-900 border-l-slate-900 border-b-slate-200 border-r-slate-200" style={{ writingMode: 'vertical-rl', textOrientation: 'upright', letterSpacing: '-0.2em' }} >
                                {reversedIndex}
                                <div className={cn("absolute right-[50%] top-20 sm:right-[5%] sm:top-[9rem]  text-transparent dark:text-transparent sm:text-gray-500/10 sm:dark:text-gray-100/5 z-0", delivery.stopTime ? "text-[10rem] sm:text-gray-100/50 sm:dark:text-gray-200/20" : "text-[15rem]" )} style={{ writingMode: 'horizontal-tb'}}>
                                    {delivery.stopTime ? "Done" : reversedIndex}
                                </div>
                            </div>
                            <div className="w-full grid grid-flow-row gap-2 z-10">
                                <div className="text-foreground/20 text-center text-sm">
                                    Delivery ID: {delivery.id}
                                </div>
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        Start Time:
                                        <span className="text-card-alternative text-lg">
                                            {new Date(delivery.startTime).toLocaleTimeString('en-US', {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: false,
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 ml-4">
                                        <DatePicker />
                                        <TimePicker 
                                        className="border-stone-400"
                                        inputClassName="border-stone-400"
                                        gap={2} />
                                        <Button variant={"secondary"} size={"sm"}>Update</Button>
                                    </div>
                                </div>
                                <div className="mt-2 border-y-2 py-2">
                                    <div className="flex flex-wrap items-center gap-2">
                                        Stop Time: 
                                        <span className={`text-lg ${delivery.stopTime 
                                            ? "text-card-alternative" 
                                            : "text-orange-600 dark:text-orange-300"}`}>
                                            {delivery.stopTime 
                                            ? new Date(delivery.stopTime).toLocaleTimeString('en-US', {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: false,
                                            }) 
                                            : "Running..."}
                                        </span>
                                    </div>
                                    
                                    <div className="ml-4 flex flex-wrap items-center gap-2">
                                        <DatePicker />
                                        <TimePicker 
                                        className="border-stone-400"
                                        inputClassName="border-stone-400"
                                        gap={2} />
                                        <Button variant={"secondary"} size={"sm"}>Update</Button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <p className="">Measurement:</p>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant={"secondary"} size={"sm"} disabled={delivery.stopTime ? true : false}>
                                                Update Measurements
                                            </Button>
                                        </DialogTrigger>
                                        <UpdateMeasurements />
                                    </Dialog>
                                </div>
                            
                                <div className=" ">
                                    <span className=" w-36">Delivery Note:</span>
                                    <Input 
                                        className=" bg-background rounded-md"
                                        defaultValue={delivery.deliveryNote ? delivery.deliveryNote : "No note found..."} />
                                </div>
                                {/* Add more details as needed */}
                            </div>
                        </div>
                    )})}
                </ScrollArea>          
            </div>
            <DrawerFooter className='w-full flex sm:grid grid-cols-2 gap-4'>
                <div className='w-full'>
                    <EndRun 
                        variant="destructive"
                        className="w-full"
                        buttonText="End Run"
                    />
                </div>
                <DrawerClose asChild>
                    <Button variant="secondary">Exit</Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    );
};

export default ManageDelivery;