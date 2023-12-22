"use client"
import React, { useEffect, useState } from 'react';
import { useSchedulingStore } from '@/store/schedulingStore';
import SchedulingBoard from '@/app/scheduling/_components/schedule-orders/SchedulingBoard';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button';
import { useDistrictStore } from '@/store/districtSheetsStore';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronsUpDown } from 'lucide-react';

  
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ScheduleWater = () => {
    const { board, isLoading, setPage, setPageSize, getBoard, page, pageSize, selectedDistrict, setSelectedDistrict } = useSchedulingStore();
    const { districtSelected, headsheets, selectedSheet, setDistrict, getHeadsheets, setSelectedSheet } = useDistrictStore();
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const [radioSelection, setRadioSelection] = useState("WE");
    
    useEffect(() => {
        // Call getHeadsheets when the component mounts
        getHeadsheets(districtSelected);
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
        getBoard,
        
    };
    // // const initialRender = useRef(true);
    
    // const districtState = {
    //     districtSelected,
    //     headsheets,
    //     selectedSheet,
    //     setDistrict,
    //     getHeadsheets,
    //     setSelectedSheet
    // }
    
   
    
    const handleDistrictChange = async (district: string) => {
        // Set the selected district in the state
        setDistrict(district)
        setSelectedDistrict(district);
        getHeadsheets(district)
       
        const newRadioSelection = district;
        setRadioSelection(newRadioSelection);
        getBoard(schedulingState);
        
        console.log(headsheets)
        
    };

    const frameworks = headsheets;
    
    

    return (
        <section>
            <div className='grid md:grid-flow-col grid-cols-1 md:grid-cols-3 gap-2 md:max-gap-24 px-4 py-[1px] w-full'>
                <h1 className='text-2xl text-yellow-800 font-semibold'>Scheduling Board</h1> 
                <RadioGroup className='flex gap-3' defaultValue={districtSelected}>
                    <div className="flex items-center space-x-2" onClick={() => {
                            
                            handleDistrictChange('WE');
                        }}>
                        <RadioGroupItem value="WE" id="WE" />
                        <Label htmlFor="WE">West</Label>
                    </div>
                    <div className="flex items-center space-x-2" onClick={() => {
                        
                        handleDistrictChange('CE');
                    }}>
                        <RadioGroupItem value="CE" id="CE" />
                        <Label htmlFor="CE">Central</Label>
                    </div>
                    <div className="flex items-center space-x-2" onClick={() => { 
                        handleDistrictChange('EA')
                        
                        }}>
                        <RadioGroupItem value="EA" id="EA" />
                        <Label htmlFor="EA">East</Label>
                    </div>
                    <div className="flex items-center space-x-2" onClick={() => {
                        handleDistrictChange('TC')
                        
                        }}>
                        <RadioGroupItem value="TC" id="TC" />
                        <Label htmlFor="TC">Truckee</Label>
                    </div>
                </RadioGroup>
                <div className='mr-2 grid justify-items-end'>
                    
                    {/* <SelectTrigger className="w-[180px] h-6 my-1 border-foreground/50"> */}
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                            >
                            {value
                                ? headsheets.find((framework) => framework.name === value)?.name
                                : "Select headsheet..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0 z-50">  
                            <Command className="w-[180px] h-auto my-1 border-foreground/50">
                                <CommandGroup>
                                    {headsheets.map((headsheet) => (
                                        <CommandItem 
                                            key={headsheet.id} 
                                            value={headsheet.name} 
                                            onSelect={() => {
                                            setSelectedSheet(headsheet)
                                            console.log(headsheet)
                                            setOpen(false)
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
