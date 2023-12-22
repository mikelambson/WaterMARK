"use client"
import React, { useEffect, useState } from 'react';
import { useSchedulingStore } from '@/store/schedulingStore';
import SchedulingBoard from '@/app/scheduling/_components/board/SchedulingBoard';
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

  
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const ScheduleWater = () => {
    const { board, isLoading, setSelectedDistrict, setPage, setPageSize, getBoard, selectedDistrict, page, pageSize } = useSchedulingStore();
    const [radioSelection, setRadioSelection] = useState("option-one"); // Declare radioSelection using useState hook
    const [headsheets, setHeadsheets] = useState<string[]>([]);
    let headsheetsArray: any = [];

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
    // const initialRender = useRef(true);
    
    useEffect(() => {
        // Fetch headsheets based on the selected district when it changes
        const fetchHeadsheets = async () => {
            try {
                setHeadsheets(headsheets);
                const response = await fetch(`${baseUrl}headsheets/${selectedDistrict}`);
                const data = await response.json();
                // Extract names from the headsheets and set them in the state
                const headsheetNames = data.map((headsheets: any) => headsheets.name);
                headsheetsArray = data;
                setHeadsheets(headsheetNames);
                // console.log(data)
            } catch (error) {
                console.error('Error fetching headsheets:', error);
            }
        };

        // Call fetchHeadsheets whenever selectedDistrict changes
        if (selectedDistrict) {
            fetchHeadsheets();
        }
    }, [selectedDistrict]);
    
    
    const handleDistrictChange = async (district: string) => {
        const optionSelection: {
            [key: string]: string;
            } = {
            "WE": "option-one",
            "CE": "option-two",
            "EA": "option-three",
            "TR": "option-four",
        };
        // Set the selected district in the state
        setSelectedDistrict(district);
        // setSelectedHeadsheet("CE")
        // Set the radio button selection based on the selected district
        const newRadioSelection = optionSelection[district];
        setRadioSelection(newRadioSelection);
        getBoard(schedulingState);
        // Fetch data based on the updated district    
    };

    // const handleHeadsheetChange = (selectedHeadsheet: string) => {
    //     // Set the selected headsheet in the state
    //     setSelectedHeadsheet(selectedHeadsheet);
        
    //     // If a headsheet is selected, find it in the array and retrieve the corresponding maxHeads
    //     if (selectedHeadsheet) {
    //         const selectedHeadsheetObj = headsheetsArray.find((headsheets: any) => headsheets.name === selectedHeadsheet);
    //         if (selectedHeadsheetObj) {
    //             const selectedMaxHeads = selectedHeadsheetObj.maxHeads;
    //             setHeads(selectedMaxHeads);
    //         }
    //     } else {
    //         // If "ALL" is selected, set maxHeads to some default value or handle it as needed
    //         setHeads(0);
    //     }
    // };
    
    

    return (
        <section>
            <div className='grid md:grid-flow-col grid-cols-1 md:grid-cols-3 gap-2 md:max-gap-24 px-4 py-[1px] w-full'>
                <h1 className='text-2xl text-yellow-800 font-semibold'>Schedule Water</h1> 
                <RadioGroup className='flex gap-3' defaultValue={radioSelection}>
                    <div className="flex items-center space-x-2" onClick={() => handleDistrictChange('WE')}>
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">West</Label>
                    </div>
                    <div className="flex items-center space-x-2" onClick={() => {
                        handleDistrictChange('CE');
                        
                    }}>
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Central</Label>
                    </div>
                    <div className="flex items-center space-x-2" onClick={() => { 
                        handleDistrictChange('EA')
                        
                        }}>
                        <RadioGroupItem value="option-three" id="option-three" />
                        <Label htmlFor="option-three">East</Label>
                    </div>
                    <div className="flex items-center space-x-2" onClick={() => {
                        handleDistrictChange('TC')
                        
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
                                <SelectLabel>Select</SelectLabel>
                              {/* Add a selectable "Headsheets" option */}
                                {/* <SelectItem key="null" onClick={() => handleHeadsheetChange('')} value={''}>
                                    ALL
                                </SelectItem> */}
                                {headsheets.map((headsheet) => (
                                    <SelectItem key={headsheet} value={headsheet} onClick={() => console.log(headsheet)}>
                                        {headsheet}
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
