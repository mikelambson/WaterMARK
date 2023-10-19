"use client"
import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useSchedulingStore } from '@/store/schedulingStore';
import Column from '@/app/(scheduling)/_components/Column';

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
  



const ScheduleWater = () => {
    const { board, isLoading, setDistrict, setPage, setPageSize, getBoard, selectedDistrict, page, pageSize } = useSchedulingStore();
    const [radioSelection, setRadioSelection] = useState("option-one"); // Declare radioSelection using useState hook
    
    const schedulingState = {
        board,
        isLoading,
        selectedDistrict,
        page,
        pageSize,
        setDistrict,
        setPage,
        setPageSize,
        getBoard,
    };
    const initialRender = useRef(true);
    
    useEffect(() => {
        // Filter unscheduled orders based on the initial lateral letter
        // const filteredOrders = board.columns.get("unscheduled").orders.filter(order => {
        //     // Assuming `order.laterals` contains the lateral information
        //     // Change 'A' to the initial lateral letter you want to filter by
        //     return order.laterals.startsWith('A'); // Replace 'A' with the initial lateral letter
        // });
        const fetchData = async () => {
            // Fetch data based on the updated district
            await getBoard(schedulingState);
        };

        // Call fetchData whenever selectedDistrict changes
        fetchData();
    }, [getBoard, selectedDistrict]);// Empty dependency array means this effect will only run once after initial render

    
    
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
        setDistrict(district);
        
        // Set the radio button selection based on the selected district
        const newRadioSelection = optionSelection[district];
        setRadioSelection(newRadioSelection);

        getBoard(schedulingState);

        // Fetch data based on the updated district

        
        
    };
    

    const handleOnDragEnd = (result: any) => {
        // Handle drag and drop logic here
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <section>
            <div className='grid grid-flow-col grid-cols-1 md:grid-cols-3 gap-24 px-4 py-1 w-full'>
                <h1 className='text-2xl'>Schedule Water</h1> 
                <RadioGroup className='flex gap-3' defaultValue={radioSelection}>
                    <div className="flex items-center space-x-2" onClick={() => handleDistrictChange('WE')}>
                        <RadioGroupItem value="option-one" id="option-one" />
                        <Label htmlFor="option-one">West</Label>
                    </div>
                    <div className="flex items-center space-x-2" onClick={() => handleDistrictChange('CE')}>
                        <RadioGroupItem value="option-two" id="option-two" />
                        <Label htmlFor="option-two">Central</Label>
                    </div>
                    <div className="flex items-center space-x-2" onClick={() => handleDistrictChange('EA')}>
                        <RadioGroupItem value="option-three" id="option-three" />
                        <Label htmlFor="option-three">East</Label>
                    </div>
                    <div className="flex items-center space-x-2" onClick={() => handleDistrictChange('TR')}>
                        <RadioGroupItem value="option-four" id="option-four" />
                        <Label htmlFor="option-four">Truckee</Label>
                    </div>
                </RadioGroup>
                <div className='mr-2 grid justify-items-end'>
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Main Line" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Mains</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className='h-[83vh]'>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="id" direction="horizontal" type='column'>
                    {(provided) => (
                        <div
                            className='grid grid-cols-1 md:grid-cols-[2fr,3fr] md:grid-rows-[65vh, 30px] gap-4 max-w-full pr-2 mx-auto '
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {/* Loop through columns and render them */}
                            {Array.from(board.columns.entries()).map(([id, column], index) => (
                                <div key={id}
                                // className={`col-span-1 overflow-y-auto h-full
                                className={`col-span-1 h-[65vh] overflow-y-scroll
                                ${index === 2 ? 'md:col-span-2 md:h-[7.4rem]' : ''}`}>
                                    <Column
                                        id={id}
                                        columns={column.orders}
                                        index={index}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            </div>
        </section>
    );
};

export default ScheduleWater;
