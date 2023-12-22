"use client"
import React, { useEffect, useState } from 'react';
import { useSchedulingStore } from '@/store/schedulingStore';
import SchedulingBoard from '@/app/scheduling/_components/schedule-orders/SchedulingBoard';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { useDistrictStore, PartialHeadsheetsData } from '@/store/districtSheetsStore';

  
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ScheduleWater = () => {
    const { board, isLoading, setPage, setPageSize, getBoard, page, pageSize } = useSchedulingStore();
    const { districtSelected, headsheets, selectedSheet, setDistrict, getHeadsheets, setSelectedSheet } = useDistrictStore();
    
    useEffect(() => {
        // Call getHeadsheets when the component mounts
        getHeadsheets(districtSelected);
      }, [getHeadsheets]);

    const schedulingState = {
        board,
        isLoading,
        // selectedDistrict,
        page,
        pageSize,
        setPage,
        setPageSize,
        getBoard,
        // selectedHeadsheet,
        // setSelectedHeadsheet,
        // maxHeads,
        // setHeads
    };
    // const initialRender = useRef(true);
    
    const districtState = {
        districtSelected,
        headsheets,
        selectedSheet,
        setDistrict,
        getHeadsheets,
        setSelectedSheet
    }
    
    
    const handleDistrictChange = async (district: string) => {
        setDistrict(district);
        getHeadsheets(district)
        // console.log(headsheets)
        
    };

    
    const reset: PartialHeadsheetsData = {};

    return (
        <section>
            <div className='grid md:grid-flow-col grid-cols-1 md:grid-cols-3 gap-2 md:max-gap-24 px-4 py-[1px] w-full'>
                <h1 className='text-2xl text-yellow-800 font-semibold'>Scheduling Board</h1> 
                <RadioGroup className='flex gap-3' defaultValue="option-one">
                    <div className="flex items-center space-x-2" onClick={() => {
                            setSelectedSheet(reset)
                            handleDistrictChange('WE');
                        }}>
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">West</Label>
                    </div>
                    <div className="flex items-center space-x-2" onClick={() => {
                        setSelectedSheet(reset)
                        handleDistrictChange('CE');
                    }}>
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Central</Label>
                    </div>
                    <div className="flex items-center space-x-2" onClick={() => { 
                        handleDistrictChange('EA')
                        setSelectedSheet(reset)
                        }}>
                        <RadioGroupItem value="option-three" id="option-three" />
                        <Label htmlFor="option-three">East</Label>
                    </div>
                    <div className="flex items-center space-x-2" onClick={() => {
                        handleDistrictChange('TC')
                        setSelectedSheet(reset)
                        }}>
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">Truckee</Label>
                    </div>
                </RadioGroup>
                <div className='mr-2 grid justify-items-end'>
                    <Select>
                        <SelectTrigger className="w-[180px] h-6 my-1 border-foreground/50">
                            <SelectValue placeholder={"Headsheets"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel className=' text-card-alternative' >Select</SelectLabel>
                                {headsheets.map((headsheet) => (
                                    <SelectItem key={headsheet.id} value={headsheet.name} onClick={() => setSelectedSheet(headsheet)}>
                                        {headsheet.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='h-full w-full'>
                <SchedulingBoard />
            </div>
        </section>
    );
};

export default ScheduleWater;
