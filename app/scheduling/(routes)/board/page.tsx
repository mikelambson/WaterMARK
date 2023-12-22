"use client"
import React, { useEffect, useState } from 'react';
import { useSchedulingStore } from '@/store/schedulingStore';
import SchedulingBoard from '@/app/scheduling/_components/board/SchedulingBoard';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from '@/components/ui/button';
import { useDistrictStore } from '@/store/districtSheetsStore';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronsUpDown } from 'lucide-react';


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
    
    const handleDistrictChange = async (district: string) => {
        const newRadioSelection = district;
        setDistrict(district)
        setSelectedDistrict(district);
        getHeadsheets(district)
        setRadioSelection(newRadioSelection);
        getBoard(schedulingState);
    };

    return (
        <section>
            <div className='w-11/12 grid md:grid-flow-col grid-cols-1 md:grid-cols-3 gap-4 md:max-gap-24 md:mx-auto my-4 md:my-[1px]'>
                <h1 className='text-center md:text-left text-2xl text-yellow-800 font-semibold'>Scheduling Board</h1> 
                <RadioGroup className='mx-auto my-auto md:mx-0 inline-flex justify-center gap-5' defaultValue={districtSelected}>
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
                <div className='pt-1 md:mb-0 grid md:justify-items-end justify-items-center'>
                    
                    {/* <SelectTrigger className="w-[180px] h-6 my-1 border-foreground/50"> */}
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] h-7 mb-1 justify-between border-foreground/60"
                            >
                            {value
                                ? headsheets.find((framework) => framework.name === value)?.name
                                : "Select headsheet..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] -mt-1 p-0 z-50">  
                            <Command className="my-1">
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
