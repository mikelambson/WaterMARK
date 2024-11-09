"use client"
import { cn } from '@/lib/utils';
import { 
    AreaChart, 
    Area, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip, 
    ResponsiveContainer, 
    Label, 
    ReferenceLine 
} from 'recharts';

import { useTheme } from "next-themes";
import { Button } from '@/components/ui/button';
import { IoMdPrint } from 'react-icons/io';
import { max, min } from 'date-fns';
import { is } from 'date-fns/locale';

interface LakeLevelProps {
    className?: string;
    data: Array<{ datetime: string; af: number }>;
}

const LahontanLevelGraph= ({className, data}: LakeLevelProps) => {
    const { resolvedTheme } = useTheme();
    const isDarkMode = resolvedTheme === "dark";
    const handleSavePrint = () => {
        // Get the contents of the graphContainer div
        const graphContainer = document.getElementById('graphContainer');
        if (!graphContainer) return;
    
        // Clone the contents of the graphContainer div
        const clone = graphContainer.cloneNode(true);
    
        // Center the h1 text in the new window
        const h1Element = (clone as HTMLElement).querySelector('h2');
        if (h1Element) {
            h1Element.style.textAlign = 'center';
        }
    
        // Remove or hide the button with ID === printButton
        const printButton = (clone as HTMLElement).querySelector('#printButton');
        if (printButton) {
            printButton.remove(); // or printButton.style.display = 'none';
        }
        
        const currentDate = new Date().toLocaleString('en-US', {
            year: 'numeric',    
            month: 'long',
            day: 'numeric',
            });
        // Create a new div for the copyright section
        const copyrightDiv = document.createElement('div');
        copyrightDiv.style.textAlign = 'center';
        copyrightDiv.style.marginTop = '20px';
        copyrightDiv.innerHTML = `
            <p>
               Printed: ${currentDate} | &copy; 2024 TCID. All rights reserved.
            </p>`;
    
        // Append the copyright section to the cloned contents
        clone.appendChild(copyrightDiv);
    
        // Create a new window with the cloned contents
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;
    
        // Append the cloned contents to the new window
        printWindow.document.body.appendChild(clone);
    
        // Print the new window
        printWindow.print();
    };
    
    // Parse datetime to a number for the X-axis (e.g., as month index or timestamp)
    const parsedData = data.map(item => ({
        datetime: new Date(item.datetime), // Assuming X-axis is the month index (1-12)
        af: item.af
    }));

    const currentLevel = Math.round(parsedData[parsedData.length - 1].af).toLocaleString();
   
    const monthNames = [
        '', 'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];


    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            const date = new Date(label);
            const formattedDate = date.toLocaleString('en-US', {
                weekday: 'short', // Mon
                month: 'short',   // Jan
                day: '2-digit',   // 05
                year: 'numeric',  // 2024
                hour: '2-digit',  // HH
                minute: '2-digit', // mm
                hour12: false,    // 24-hour format
                timeZoneName: 'short' // PDT/PST
            });

            return (
                <div className="custom-tooltip bg-background/50 rounded-md p-4">
                    <p className='text-sm text-foreground'>
                        {`Date: ${formattedDate}`}
                    </p>
                    {payload.map((entry: any, index: any) => (
                        <p
                            key={index}
                            className={'text-card-alternative'}
                        >
                            {`${entry.name}: ${entry.value.toLocaleString()} AF`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const graphColor = {
        dark: {
            max: '#c08e5c',
            sill: '#8d6843',
            min: '#E08080',
            grid: '#4B5563',
        },
        light: {
            max: '#7A470D',
            sill: '#7A470D',
            min: '#7A0D0D',
            grid: '#D1D5DB',
        }
    };

    const getColor = { 
        minFill: isDarkMode ? graphColor.dark.min : graphColor.light.min,
        maxFill: isDarkMode ? graphColor.dark.max : graphColor.light.max,
        sillFill: isDarkMode ? graphColor.dark.sill : graphColor.light.sill,
        grid: isDarkMode ? graphColor.dark.grid : graphColor.light.grid,
        
    }
    


    return ( 
        <div id='graphContainer' className={cn(`w-full h-full `, className) }>
            {/* <Vega spec={spec} /> */}
            <div className="flex justify-center items-center gap-2">
                <h2 className="text-2xl font-bold">
                    Lahontan Lake Level {currentLevel} AF
                </h2>
                <Button id='printButton' size={"pagination"} variant={'secondary'} onClick={handleSavePrint}>
                    <IoMdPrint />
                </Button>
            </div>
            <ResponsiveContainer width={"100%"} height={450} className={"-mb-14 z-0"}>
                <AreaChart 
                    className='mx-auto'
                    data={parsedData} // Adjust the data as needed
                    margin={{ top: 10, right: 30, left: 8, bottom: 45 }}
                >
                    <defs>
                        <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <XAxis 
                        dataKey={"datetime"} 
                        type='category' 
                        domain={[1, 12]} 
                        tickCount={13} 
                        tickFormatter={(value) => {
                            // Convert datetime to a more readable format (e.g., "Nov 08, 2023")
                            const date = new Date(value);
                            return date.toLocaleDateString('en-US', {
                                month: 'short',
                                day: '2-digit',
                                year: 'numeric',
                            });
                        }}
                        angle={320} 
                        dx={-26}
                        dy={18}
                        className='text-[10px]'
                    >
                        <Label 
                            position="bottom" 
                            className='font-bold text-lg'
                            offset={28}
                        >
                            Date
                        </Label>
                    </XAxis>
                    <YAxis 
                        yAxisId={"left"} 
                        domain={[0, 110]} 
                        tickFormatter={(value) => value.toLocaleString() + '%'}
                        tickCount={25}>
                        <Label 
                            angle={270} 
                            position="left" 
                            style={{ textAnchor: 'middle' }}
                            className='font-bold text-xl'
                            offset={0}
                        >
                            Water Level (%)
                        </Label>
                    </YAxis>
                    <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        domain={[0, 340000]} 
                        tickCount={16}
                        tickFormatter={(value) => value.toLocaleString()}
                        className='text-sm'
                    >
                        <Label 
                            angle={270} 
                            position="right" 
                            style={{ textAnchor: 'middle' }}
                            className='font-bold text-xl'
                            offset={20}
                        >
                            Acre Feet
                        </Label>
                    </YAxis>
                    <CartesianGrid 
                        strokeDasharray="1 1" 
                        stroke={getColor.grid} 
                    />
                    <Tooltip content={<CustomTooltip />} />
                    
                    <Area 
                        type="monotone" 
                        data={parsedData} 
                        dataKey="af"
                        yAxisId="right" 
                        stroke="#8884d8" 
                        fillOpacity={1} 
                        fill="url(#colorCurrent)" 
                        name="Area Feet"
                    />
                    <ReferenceLine 
                        yAxisId="right"
                        y={4000} 
                        stroke={getColor.minFill} 
                        strokeWidth={2}
                        strokeDasharray={"2 1"}
                    >
                        <Label 
                            position='insideLeft' 
                            value='Minimum Pool' 
                            fontSize='12px' 
                            fill={getColor.minFill} 
                            fontWeight='bold' 
                            offset={10}
                            dy={-10} 
                        />
                        
                    </ReferenceLine>
                    <ReferenceLine 
                        yAxisId="right"
                        y={308000} 
                        stroke={getColor.maxFill} 
                        strokeWidth={2}
                        strokeDasharray={"9 3"}
                    >
                        <Label 
                            position='insideLeft' 
                            value='100% Capacity' 
                            fontSize='12px' 
                            fill={getColor.maxFill} 
                            fontWeight='bold' 
                            offset={12}
                            dy={-10} 
                        />
                        <Label 
                            position='insideRight' 
                            value='308,000 Acre Feet Max' 
                            fontSize='15px' 
                            fill={getColor.maxFill} 
                            fontWeight='bold' 
                            offset={12}
                            dy={-10} 
                        />
                    </ReferenceLine>
                    <ReferenceLine 
                        yAxisId="right"
                        y={289000} 
                        stroke={getColor.sillFill} 
                        strokeWidth={1}
                        strokeDasharray={"3 3"}
                    >
                        <Label 
                            position='insideLeft' 
                            value='Sill/Boards' 
                            fontSize='12px' 
                            fill={getColor.sillFill}  
                            fontWeight='bold' 
                            offset={12}
                            dy={10} 
                        />
                        
                    </ReferenceLine>
                </AreaChart> 
            </ResponsiveContainer>
        </div>
    );
}
 
export default LahontanLevelGraph;