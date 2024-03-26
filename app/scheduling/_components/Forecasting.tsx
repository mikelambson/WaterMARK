import { cn } from '@/lib/utils';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Label, ReferenceLine } from 'recharts';
// import { Vega, VisualizationSpec } from 'react-vega';
//npm rebuild canvas --update-binary for major version changes
import { useTheme } from "next-themes";
import { create } from 'zustand'
import { useEffect } from 'react';


interface ForecastProps {
    className?: string;
}

interface ForecastState {
    width: number;
    setWidth: (width: number) => void;
   

}

const useForecastStore = create<ForecastState>((set:any) => ({
    width: 900,
    setWidth: (width: number) => set({ width }),
    // data: [],
    // setData: (data: any) => set({ data }),
    // userInput: '?find:status=running',
    // setUserInput: (input: any) => set({ userInput: input }),
    // queryParams: '?find:status=running',
    // setQueryParams: (params: any) => set({ queryParams: params }),
  }));



const reData = {
    "a":[
        {"x": 0, "y": 40},
        {"x": 1, "y": 50},
        {"x": 2, "y": 60},
        {"x": 3, "y": 76},
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
        {"x": 0, "y": 40},
        {"x": 1, "y": 50},
        {"x": 2, "y": 60},
        {"x": 3, "y": 76},
        {"x": 4, "y": 90},
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
    ]
         
}


const Forecasting: React.FC<ForecastProps> = ({className}) => {
    const { resolvedTheme } = useTheme();
    const isDarkMode = resolvedTheme === "dark";
    const textColorClass = isDarkMode ? "#AFBFCF" : "#102030";
    const gridColorClass = isDarkMode ? "#1A202C" : "#F7FAFC";
    const backgroundColorClass = isDarkMode ? "#555" : "#e5e5e5";
    const { width, setWidth } = useForecastStore();
    const graphContainer = document.getElementById('graphContainer');

    const viewportWidth = window.innerWidth;
    useEffect(() => {
        const graphContainerWidth = graphContainer ? graphContainer.clientWidth - 60 : window.innerWidth - 110;
        // Get the viewport width
        const graphwidth = graphContainerWidth >= 575 ? graphContainerWidth : 575;
        
        if (graphContainer) {
        setWidth(graphwidth);
        }
    }, [setWidth, viewportWidth, graphContainer]);

   

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
            console.log(payload);
          return (
            <div className="custom-tooltip">
              <p>{`Month: ${monthNames[label]}`}</p>
              {payload.map((entry:any, index:any) => {
                console.log(entry.name, entry.value);
                return (
                <p key={index}>{`${entry.name}: ${index === 2 
                    ? entry.value > 1000 
                        ? entry.value 
                        : '--' 
                    : entry.value > 1000 
                        ? '--' 
                        : entry.value}`}
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

            <h2 className="text-2xl font-bold text-center">Lake Level Forecast</h2>
            
            <ResponsiveContainer width={"99%"} height={500}>
                <LineChart 
                    className='dark:bg-neutral-700 mx-auto'
                    // width={width} 
                    // height={500} 
                    margin={{ top: 30, right: 40, bottom: 30, left: 20 }
                }>
                    <CartesianGrid stroke="#777" strokeDasharray="1 1" />
                    <XAxis 
                        dataKey={"x"} 
                        type='number' 
                        domain={[0,12]} 
                        tickCount={13} 
                        tickFormatter={(value) => monthNames[value]}
                        angle={330} 
                        dx={-12}
                        dy={7}
                        className='text-[8px]'>
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
                    {/* <Tooltip 
                        formatter={(value) => parseFloat(String(value))} 
                        wrapperClassName="gray" /> */}
                    {/* Render multiple Line components */}
                    <Line 
                        data={reData.a} 
                        type="monotone" 
                        dataKey="y" 
                        stroke="red" 
                        strokeDasharray="3 3" 
                        strokeWidth={3} 
                        yAxisId="left" 
                        name='90% Exeedence'/>
                    <Line 
                        data={reData.b} 
                        type="monotone" 
                        dataKey="y" 
                        stroke="blue" 
                        strokeDasharray="2 2" 
                        strokeWidth={3} 
                        yAxisId="left" 
                        name='75% Exeedence'/>
                    <Line 
                        data={reData.current} 
                        type="monotone" 
                        dataKey="y" 
                        stroke="#020"  
                        strokeDasharray="0 0" 
                        activeDot={{r: 8}} 
                        strokeWidth={5} 
                        yAxisId="right" 
                        name='Current'/>
                    <ReferenceLine 
                        yAxisId="left"
                        y={100} 
                        stroke="green" 
                        strokeWidth={2}
                        strokeDasharray={"3 3"}
                        label={{ 
                            position: 'insideLeft', 
                            value: '100%', 
                            fontSize: '12px', 
                            fill: 'black', 
                            fontWeight: 'bold', 
                            offset: 10,
                            dy: -8,
                            }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
 
export default Forecasting;