"use client"
import { useEffect, useState } from 'react';
import { useSchedulingStore } from '@/lib/store/schedulingStore';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import SchedulingBoard from './SchedulingBoard';

import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronsUpDown } from 'lucide-react';


const ScheduleWater = () => {
    const { board, isLoading, setPage, setPageSize, getBoard, page, pageSize, selectedDistrict, setSelectedDistrict, setDistrict, headsheets, selectedSheet, getHeadsheets, setSelectedSheet, setSelectedHead, selectedHead, schedule, getSchedule, updateOrderStatus, getUnscheduled} = useSchedulingStore();
    const [open, setOpen] = useState(false)
    
    
    useEffect(() => {
        // Call getHeadsheets when the component mounts
        setDistrict("WE")
        getHeadsheets(selectedDistrict);
      }, [getHeadsheets]);

      const schedulingState = {
        board,
        isLoading,
        selectedDistrict,
        page,
        pageSize,
        setSelectedDistrict,
        setPage,
        setPageSize,
        setDistrict,
        headsheets,
        selectedSheet,
        getHeadsheets,
        setSelectedSheet,
        setSelectedHead,
        getBoard,
        selectedHead,
        schedule,
        getSchedule,
        updateOrderStatus,
        getUnscheduled
    };

    useEffect(() => { 
    
        const fetchData = async () => {
          // Fetch data based on the updated district
          await getBoard(schedulingState);
        };
        // Call fetchData whenever selectedDistrict changes
        fetchData();
    
      }, [getBoard, selectedDistrict, page, selectedHead]);
    
    const handleDistrictChange = async (district: string) => {
        setDistrict(district)
        setSelectedDistrict(district);
        getBoard(schedulingState);
        getHeadsheets(district)
        setSelectedHead(1)
    };

    return (
        <section>
            <div className='w-11/12 grid lg:grid-flow-col grid-cols-1 lg:grid-cols-3 gap-4 lg:max-gap-24 lg:mx-auto my-4 lg:my-[1px]'>
                <h1 className='text-center lg:text-left text-2xl text-yellow-800 font-semibold'>Scheduling Board</h1> 
                <RadioGroup className='mx-auto my-auto lg:mx-0 inline-flex justify-center gap-5' defaultValue={"WE"}>
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
                            <Command className="my-1">
                                <CommandGroup>
                                    {headsheets.map((headsheet:any) => (
                                        <CommandItem 
                                            key={headsheet.id} 
                                            value={headsheet.name} 
                                            onSelect={() => {
                                            setSelectedSheet(headsheet)
                                            setSelectedHead(1)
                                            setOpen(false)
                                            // setValue(selectedSheet.name)
                                        }}>
                                        {headsheet.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>   
                     </Popover>
                            
                </div>
            </div>
            <div className='h-full w-full'>
                <SchedulingBoard />
            </div>
        </section>
    );
};

export default ScheduleWater;
