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
    Legend, 
    ReferenceLine 
} from 'recharts';

import { useTheme } from "next-themes";
import { Button } from '@/components/ui/button';
import { IoMdPrint } from 'react-icons/io';

const error = console.error; // Remove after fixing defaultProps warning
console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) {
        console.warn('\nRECHART WARNING:\n', args[0]);
        return
    };
  error(...args);
};

interface LakeLevelProps {
    className?: string;
    data: Array<{ datetime: string; af: number }>;
}


const reData = {
    "a":[
        {"x": 0, "y": 30},
        {"x": 1, "y": 40},
        {"x": 2, "y": 50},
        {"x": 3, "y": 66},
        {"x": 4, "y": 80},
        {"x": 5, "y": 90},
        {"x": 6, "y": 100},
        {"x": 7, "y": 110},
        {"x": 8, "y": 100},
        {"x": 9, "y": 90},
        {"x": 10, "y": 70},
        {"x": 11, "y": 60},
        {"x": 12, "y": 65}
    ],
    "b": [
        {"x": 0, "y": 50},
        {"x": 1, "y": 60},
        {"x": 2, "y": 70},
        {"x": 3, "y": 86},
        {"x": 4, "y": 100},
        {"x": 5, "y": 120},
        {"x": 6, "y": 130},
        {"x": 7, "y": 150},
        {"x": 8, "y": 110},
        {"x": 9, "y": 90},
        {"x": 10, "y": 80},
        {"x": 11, "y": 70},
        {"x": 12, "y": 85},

    ],
    "current": [
        {"x": 0, "y": 124000},
        {"x": .5, "y": 132000},
        {"x": 1, "y": 155000},
        {"x": 2, "y": 189100},
        {"x": 3, "y": 235600},
        {"x": 4, "y": 268500},
        {"x": 5, "y": 288500},
        {"x": 6, "y": 308500},
        {"x": 7, "y": 298500},
        {"x": 8, "y": 248500},
        {"x": 9, "y": 188500},
        {"x": 11, "y": 138500},
    ]
         
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
   
    const monthNames = [
        '', 'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];


    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p>{`Month: ${monthNames[label]}`}</p>
                    {payload.map((entry: any, index: any) => (
                        <p
                            key={index}
                            className={
                                index === 0
                                    ? isDarkMode
                                        ? 'text-[#5555ff]'
                                        : 'text-[blue]'
                                    : isDarkMode
                                        ? 'text-[#080]'
                                        : 'text-[green]'
                            }
                        >
                            {`${entry.name}: ${entry.value.toLocaleString()} AF`}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };
    

    return ( 
        <div id='graphContainer' className={cn(`w-full h-full `, className) }>
            {/* <Vega spec={spec} /> */}
            <div className="flex justify-center items-center gap-2">
                <h2 className="text-2xl font-bold">
                    Lahontan Lake Level
                </h2>
                <Button id='printButton' size={"pagination"} variant={'secondary'} onClick={handleSavePrint}>
                    <IoMdPrint />
                </Button>
            </div>
            <ResponsiveContainer width={"100%"} height={450} className={"-mb-14 z-0"}>
                <AreaChart 
                    className='mx-auto'
                    data={parsedData} // Adjust the data as needed
                    margin={{ top: 10, right: 35, left: 0, bottom: 45 }}
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
                            Month
                        </Label>
                    </XAxis>
                    <YAxis yAxisId={"left"} domain={[0, 110]} tickCount={25}>
                        <Label 
                            angle={270} 
                            position="left" 
                            style={{ textAnchor: 'middle' }}
                            className='font-bold text-xl'
                            offset={-10}
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
                    <CartesianGrid strokeDasharray="1 1" />
                    <Tooltip />

                    {/* <Legend verticalAlign="top" align="center" wrapperStyle={{ paddingTop: 10 }} /> */}

                    {/* Area for "current" data */}
                    <Area 
                        type="monotone" 
                        data={parsedData} 
                        dataKey="af"
                        yAxisId="right" 
                        stroke="#8884d8" 
                        fillOpacity={1} 
                        fill="url(#colorCurrent)" 
                        name="Current"
                    />
                    <ReferenceLine 
                        yAxisId="right"
                        y={4000} 
                        stroke={"#7A0D0D"} 
                        strokeWidth={2}
                        strokeDasharray={"2 1"}
                    >
                        <Label 
                            position='insideLeft' 
                            value='Minimum Pool' 
                            fontSize='12px' 
                            fill='#7A0D0D' 
                            fontWeight='bold' 
                            offset={10}
                            dy={-10} 
                        />
                        
                    </ReferenceLine>
                    <ReferenceLine 
                        yAxisId="right"
                        y={308000} 
                        stroke={"#7A470D"} 
                        strokeWidth={2}
                        strokeDasharray={"9 3"}
                    >
                        <Label 
                            position='insideLeft' 
                            value='100% Capacity' 
                            fontSize='12px' 
                            fill='#7A470D' 
                            fontWeight='bold' 
                            offset={12}
                            dy={-10} 
                        />
                        <Label 
                            position='insideRight' 
                            value='308,000 Acre Feet Max' 
                            fontSize='15px' 
                            fill='#7A470D' 
                            fontWeight='bold' 
                            offset={12}
                            dy={-10} 
                        />
                    </ReferenceLine>
                    <ReferenceLine 
                        yAxisId="right"
                        y={289000} 
                        stroke={"#7A470D"} 
                        strokeWidth={1}
                        strokeDasharray={"3 3"}
                    >
                        <Label 
                            position='insideLeft' 
                            value='Sill/Boards' 
                            fontSize='12px' 
                            fill='#7A470D' 
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