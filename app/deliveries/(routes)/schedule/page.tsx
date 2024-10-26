// Delivery Schedule \app\deliveries\(routes)\schedule\page.tsx
"use client"
import { useEffect } from "react";
import { useDeliveriesStore } from "@/lib/deliveries/deliveriesStore";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { Command, CommandGroup, CommandItem, CommandInput, CommandList  } from "@/components/ui/command";
import { Schedule } from "@/typings";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScheduledDeliveryBoard }from "@/app/deliveries/(routes)/schedule/DeliveryBoard";

export default function DeliverySchedule() {
    const { userDefaultDistrict, selectedSheet, headsheets, setSelectedSheet, selectedHead, setSelectedHead, selectedDistrict, open, setOpen, setDistrict, getHeadsheets, getSchedule, schedule } = useDeliveriesStore();

    const defaultDistrict = selectedDistrict 
        ? selectedDistrict 
        : userDefaultDistrict 
            ? userDefaultDistrict 
            : "WE";
            
    useEffect(() => {
        setDistrict(defaultDistrict)
        getHeadsheets(defaultDistrict)
    }, [defaultDistrict, setDistrict])

    useEffect(() => {
        if (selectedSheet.name === "Select") {
            return;
        }
        getSchedule(Number(selectedHead));
    }, [getSchedule, selectedSheet, selectedHead]);

    const handleDistrictChange = async (district: string) => {
        setDistrict(district)
        getHeadsheets(district)
        setSelectedHead(1)
    };

    const handleKeyDown = (e: any) => {
        if (e.key === 'ArrowDown') {
          // Move focus to the next CommandItem when pressing ArrowDown
          e.preventDefault();
          const nextItem = e.target.nextElementSibling;
          if (nextItem) nextItem.focus();
        } else if (e.key === 'ArrowUp') {
          // Move focus to the previous CommandItem when pressing ArrowUp
          e.preventDefault();
          const prevItem = e.target.previousElementSibling;
          if (prevItem) prevItem.focus();
        } else if (e.key === 'Tab' && !e.shiftKey && !e.altKey) {
          // Close the popover when pressing Tab on the last CommandItem
          setOpen(false);
        }
      };

    const convertedColumns = Array.from(schedule.columns.values()) as unknown as Schedule[];

    return (
    <ScrollArea className="pt-1 px-1 pb-2 lg:pb-1">
        <div className='w-11/12 grid mx-auto lg:grid-flow-col grid-cols-1 lg:grid-cols-3 gap-4 lg:max-gap-24 my-4 lg:my-[1px]'>
                    <h1 className='text-center lg:text-left text-2xl text-yellow-800 font-semibold'>Delivery Schedule</h1> 
                    <RadioGroup className='mx-auto my-auto lg:mx-0 inline-flex justify-center gap-5' defaultValue={defaultDistrict}>
                        <div className="flex items-center space-x-2" onClick={() => {
                                handleDistrictChange('WE');
                            }}>
                            <RadioGroupItem value="WE" id="WE" />
                            <Label className='cursor-pointer' htmlFor="WE">West</Label>
                        </div>
                        <div className="flex items-center space-x-2" onClick={() => {
                            
                            handleDistrictChange('CE');
                        }}>
                            <RadioGroupItem value="CE" id="CE" />
                            <Label className='cursor-pointer' htmlFor="CE">Central</Label>
                        </div>
                        <div className="flex items-center space-x-2" onClick={() => { 
                            handleDistrictChange('EA')
                            
                            }}>
                            <RadioGroupItem value="EA" id="EA" />
                            <Label className='cursor-pointer' htmlFor="EA">East</Label>
                        </div>
                        <div className="flex items-center space-x-2" onClick={() => {
                            handleDistrictChange('TC')
                            
                            }}>
                            <RadioGroupItem value="TC" id="TC" />
                            <Label className='cursor-pointer' htmlFor="TC">Truckee</Label>
                        </div>
                    </RadioGroup>
                    <div className='pt-1 lg:mb-0 grid lg:justify-items-end justify-items-center'>
                        
                        {/* <SelectTrigger className="w-[180px] h-6 my-1 border-foreground/50"> */}
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] h-7 mb-1 justify-between border-foreground/60"
                                >
                                {selectedSheet.name === "Select" ? "Select headsheet..." : selectedSheet.name}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] -mt-1 p-0 z-50"> 
                                {/* <CommandInput placeholder="Search headsheets..." />
                                <CommandEmpty>No results found.</CommandEmpty> */}
                                <Command className="my-1">
                                    <CommandList>
                                        <CommandGroup>
                                            {headsheets.map((headsheet:any) => (
                                                <CommandItem 
                                                    key={headsheet.id} 
                                                    value={headsheet.name} 
                                                    onSelect={() => {
                                                    setSelectedSheet(headsheet)
                                                    setSelectedHead(1)
                                                    setOpen(false)
                                                    // onKeyDown={handleKeyDown} 
                                                }}>
                                                {headsheet.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>   
                        </Popover>
                                
                    </div>
                </div>
        
        
        <ScheduledDeliveryBoard
            columns={convertedColumns} 
            index={0} 
            id={selectedSheet.id} 
        />
        
    </ScrollArea>
    );
}
