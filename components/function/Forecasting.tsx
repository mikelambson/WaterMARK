"use client"
import { cn } from '@/lib/utils';
import { 
    LineChart, 
    Line, 
    CartesianGrid, 
    XAxis, 
    YAxis, 
    Tooltip, 
    ResponsiveContainer, 
    Label, 
    ReferenceLine, 
    Legend, 
    ComposedChart, 
    Brush 
} from 'recharts';

import { useTheme } from "next-themes";
import { Button } from '@/components/ui/button';
import { IoMdPrint } from 'react-icons/io';

const error = console.error; // Remove after fixing defaultProps warning
console.error = (...args: any) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

interface ForecastProps {
    className?: string;
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
        {"x": 1, "y": 155000},
        {"x": 2, "y": 189100},
        {"x": 3, "y": 235600},
        {"x": 3.87, "y": 268500},
    ]
         
}


const Forecasting: React.FC<ForecastProps> = ({className}) => {
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
    
   
    const monthNames = [
        '', 'January', 'February', 'March', 'April', 'May', 'June', 
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

        // Maximum value of the left Y-axis (100)
    const maxLeftY = 160;

    // Maximum value of the right Y-axis (310000)
    const maxRightY = (maxLeftY * 310000) / 100;

    const CustomTooltip = ({ active, payload, label }:any) => {
        if (active && payload && payload.length) {
            
          return (
            <div className="custom-tooltip">
                <p>
                    {`Month: ${monthNames[label]}`}
                </p>
                {payload.map((entry:any, index:any) => {
                    return (
                    <p key={index}>
                        {`${entry.name}: 
                        ${index === 2 
                        ? entry.value > 1000 
                            ? entry.value.toLocaleString() + ' AF'
                            : '--' 
                        : entry.value > 1000 
                            ? '--' 
                            : entry.value + '%'}`}
                    </p>
                )})}
            </div>
          );
        }
      
        return null;
      };
  
    return ( 
        <div id='graphContainer' className={cn(`w-full h-full`, className) }>
            {/* <Vega spec={spec} /> */}
            <div className="flex justify-center items-center gap-2">
                <h2 className="text-2xl font-bold">
                    Lake Level Forecast
                </h2>
                <Button id='printButton' size={"pagination"} variant={'secondary'} onClick={handleSavePrint}>
                    <IoMdPrint />
                </Button>
            </div>
            <ResponsiveContainer width={"99%"} height={450}>
                <LineChart 
                    className=' mx-auto'
                    data={reData.a}
                    margin={{ top: 0, right: 40, bottom: 30, left: 20 }
                }>
                     <Legend 
                        verticalAlign="top" 
                        align="center" 
                        wrapperStyle={{ paddingTop: 10 }} 
                        iconType="plainline" // Set iconType to "plainline" to display different line styles
                    />
                    <CartesianGrid stroke="#777" strokeDasharray="1 1" />
                    <XAxis 
                        dataKey={"x"} 
                        type='number' 
                        domain={[0,12]} 
                        tickCount={13} 
                        tickFormatter={(value) => monthNames[value]}
                        angle={320} 
                        dx={-16}
                        dy={10}
                        className='text-[10px]'>
                        <Label 
                            position="bottom" 
                            className='font-bold text-lg'
                            offset={12}>
                            Month
                        </Label>
                    </XAxis>
                    {/* Primary Y-axis */}
                    <YAxis yAxisId={"left"} dataKey={"y"} domain={[0, maxLeftY]} tickCount={10}>
                        <Label 
                            angle={270} 
                            position="left" 
                            style={{ textAnchor: 'middle' }}
                            className='font-bold text-xl'
                            offset={-10}>
                                Water Level (%)
                        </Label>
                    </YAxis>
                    {/* Secondary Y-axis */}
                    <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        domain={[0, maxRightY]} 
                        tickCount={10}
                        tickFormatter={(value) => value.toLocaleString()}
                        className='text-sm'>
                        <Label 
                            angle={270} 
                            position="right" 
                            style={{ textAnchor: 'middle' }}
                            className='font-bold text-xl'
                            offset={20}>
                                Acre Feet
                        </Label>
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    {/* <Brush dataKey="x" startIndex={2} height={30} stroke="#888000" 
                        fill={isDarkMode ? "#555" : "#f5f5f5"} 
                        tickFormatter={(value) => monthNames[value]}
                        className='text-[10px]'
                    /> */}
                    <Line 
                        data={reData.a} 
                        type="monotone" 
                        dataKey="y" 
                        stroke={isDarkMode ? "#080" : "green" } 
                        strokeDasharray="3 4" 
                        strokeWidth={1} 
                        yAxisId="left" 
                        name='75% Exeedence'
                        dot={false} />
                    <Line 
                        data={reData.b} 
                        type="monotone" 
                        dataKey="y" 
                        stroke={isDarkMode ? "#FF5C00" : "red"}
                        strokeDasharray="8 5 2 5" 
                        strokeWidth={1} 
                        yAxisId="left" 
                        name='50% Exeedence'
                        dot={false} />
                    <Line 
                        data={reData.current} 
                        type="monotone" 
                        dataKey="y" 
                        stroke={isDarkMode ? "#5555ff" : "blue"}  
                        strokeDasharray="0 0" 
                        activeDot={{r: 8}} 
                        strokeWidth={3} 
                        yAxisId="right" 
                        name='Current'
                        dot={{
                            fill: 'gray',
                            fillOpacity: 0.5,
                            strokeWidth: 1,
                            r: 3,
                            strokeOpacity: 0.5,
                            }} />
                    <ReferenceLine 
                        yAxisId="left"
                        y={100} 
                        stroke={"gray"} 
                        strokeWidth={2}
                        strokeDasharray={"9 9"}
                        >
                        <Label 
                            position='insideLeft' 
                            value='100% Capacity' 
                            fontSize='12px' 
                            fill='gray' 
                            fontWeight='bold' 
                            offset={10}
                            dy={-10} />
                        <Label 
                            position='insideRight' 
                            value='310,000 Acre Feet' 
                            fontSize='12px' 
                            fill='gray' 
                            fontWeight='bold' 
                            offset={10}
                            dy={-10} />
                    </ReferenceLine>
                    
                </LineChart> 
                 
            </ResponsiveContainer>
        </div>
    );
}
 
export default Forecasting;