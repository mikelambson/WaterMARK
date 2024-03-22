import { cn } from '@/lib/utils';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';
import { Vega, VisualizationSpec } from 'react-vega';
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

const data = [
    {
    "name": "table",
    "values": [
        {"x": 0, "y": 40, "c":0}, {"x": 0, "y": 40, "c":1},
        {"x": 1, "y": 50, "c":0}, {"x": 1, "y": 50, "c":1},
        {"x": 2, "y": 60, "c":0}, {"x": 2, "y": 60, "c":1},
        {"x": 3, "y": 76, "c":0}, {"x": 3, "y": 76, "c":1},
        {"x": 4, "y": 80, "c":0}, {"x": 4, "y": 90, "c":1},
        {"x": 5, "y": 90, "c":0}, {"x": 5, "y": 120, "c":1},
        {"x": 6, "y": 100, "c":0}, {"x": 6, "y": 130, "c":1},
        {"x": 7, "y": 110, "c":0}, {"x": 7, "y": 150, "c":1},
        {"x": 8, "y": 100, "c":0}, {"x": 8, "y": 110, "c":1},
        {"x": 9, "y": 90, "c":0}, {"x": 9, "y": 90, "c":1},
        {"x": 10, "y": 70, "c":0}, {"x": 10, "y": 80, "c":1},
        {"x": 11, "y": 60, "c":0}, {"x": 11, "y": 70, "c":1},
        {"x": 12, "y": 65, "c":0}, {"x": 12, "y": 85, "c":1},
        {"x": 0, "y": 40, "c":2}, {"x": 1, "y": 50, "c":2}, {"x": 2, "y": 61, "c":2}, {"x": 3, "y": 76, "c":2}
    ]
    }
]

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
        {"x": 0, "y": 40},
        {"x": 1, "y": 50},
        {"x": 2, "y": 61},
        {"x": 3, "y": 76},
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

    const spec: VisualizationSpec = {
        "$schema": "https://vega.github.io/schema/vega/v5.json",
        "width": width,
        "height": 500,
        "padding": 1,
        "autosize": {"type": "fit", "contains": "padding"},

        "signals": [
            {
                "name": "interpolate",
                "value": "basis",
                "bind": {
                    "input": "select",
                    "options": [
                        "basis",
                        "cardinal",
                        "catmull-rom",
                        "linear",
                        "monotone",
                        "natural",
                        "step",
                        "step-after",
                        "step-before"
                    ]
                }
            }
        ],
        
        "data": data,

    "scales": [
        {
        "name": "x",
        "type": "point",
        "range": "width",
        "domain": {"data": "table", "field": "x"}
        },
        {
        "name": "y",
        "type": "linear",
        "range": "height",
        "nice": true,
        "zero": true,
        "domain": {"data": "table", "field": "y"}
        },
        {
        "name": "color",
        "type": "ordinal",
        "range": ["#8b0000", "#00008b", "#000"],
        "domain": {"data": "table", "field": "c"}
        }
    ],

        "axes": [
        {"orient": "bottom", "scale": "x", "title": "Month"},
        {"orient": "left", "scale": "y", "title": "Water Level (%)", "grid": true}
        ],
    
        "marks": [
            
            {
                "type": "group",
                "from": {
                "facet": {
                    "name": "series",
                    "data": "table",
                    "groupby": "c"
                }
                },
                "marks": [
                {
                    "type": "line",
                    "from": {"data": "series"},
                    "encode": {
                    "enter": {
                        "x": {"scale": "x", "field": "x"},
                        "y": {"scale": "y", "field": "y"},
                        "stroke": {"scale": "color", "field": "c"},
                        "strokeWidth": {"value": 3}
                    },
                    "update": {
                        "interpolate": {"signal": "interpolate"},
                        "strokeOpacity": {"value": 1},
                        "style": {"value": "solid"}, // This line makes the line solid by default
                    "strokeDash": [
                        {"test": "datum.c === 0", "value": [6, 6]}, // Dashed style for the first line
                        {"test": "datum.c === 1", "value": [2, 2]}, // Dotted style for the second line
                        {"value": [0]} // Solid style for any other lines
                    ]
                    },
                    "hover": {
                        "strokeOpacity": {"value": 0.5}
                    }
                    }
                },
                {
                    "type": "text",
                    "encode": {
                    "enter": {
                        "x": {"signal": "width / 9"}, // Center the title horizontally
                        "y": {"value": 20}, // Adjust the y-coordinate as needed
                        "fill": {"value": "#333"},
                        "align": {"value": "center"},
                        "baseline": {"value": "top"},
                        "fontSize": {"value": 16},
                        "fontWeight": {"value": "bold"},
                        "text": {"value": "Lake Level Forecast"} // Set the title text
                    }
                    }
                }
                ]
            }
        ],

        "config": {
        "group": {"fill": backgroundColorClass},
        "arc": {"fill": "#000"},
        "area": {"fill": "#000"},
        "line": {"stroke": "#000"},
        "path": {"stroke": "#000"},
        "rect": {"fill": "#000"},
        "shape": {"stroke": "#000"},
        "symbol": {"fill": "#000", "size": 40},
        "axis": {
            "domain": false,
            "grid": true,
            "gridColor": gridColorClass,
            "gridOpacity": 1,
            "labelColor": "#7F7F7F",
            "labelPadding": 4,
            "tickColor": "#7F7F7F",
            "tickSize": 5.67,
            "titleFontSize": 16,
            "titleFontWeight": "normal",
            "titleColor": textColorClass
        },
        "legend": {
            "labelBaseline": "middle",
            "labelFontSize": 14,
            "symbolSize": 40
        },
        "range": {
            "category": [
            "#000000",
            "#7F7F7F",
            "#1A1A1A",
            "#999999",
            "#333333",
            "#B0B0B0",
            "#4D4D4D",
            "#C9C9C9",
            "#666666",
            "#DCDCDC"
            ]
        }
        }
    }

    const customToolTip = cn(
        "bg-white dark:bg-neutral-800 text-black dark:text-white border border-gray-200 dark:border-gray-800 rounded-lg shadow-md p-2",
    );
  
    return ( 
        <div id='graphContainer' className={cn(`calc(100vw - 18px)`, className) }>
            <Vega spec={spec} />

            <h2 className="text-2xl font-bold text-center">Lake Level Forecast</h2>
            {/* <ResponsiveContainer className={"w-full h-full"}> */}
                <LineChart 
                    className='dark:bg-neutral-700 mx-auto'
                    width={width} 
                    height={500} 
                    margin={{ top: 30, right: 40, bottom: 30, left: 20 }
                }>
                    <CartesianGrid stroke="#777" strokeDasharray="1 1" />
                    <XAxis dataKey={"x"} type='number' domain={[0,12]} tickCount={13}>
                        <Label position="bottom" className='font-bold'>
                            Month
                        </Label>
                    </XAxis>
                    <YAxis dataKey={"y"}>
                        <Label 
                            angle={270} 
                            position="left" 
                            style={{ textAnchor: 'middle' }}
                            className='font-bold'>
                                Water Level (%)
                        </Label>
                    </YAxis>
                    <Tooltip formatter={(value) => parseFloat(String(value))} wrapperClassName="gray" />
                    {/* Render multiple Line components */}
                    <Line data={reData.a} type="monotone" 
                        dataKey="y" stroke="red" strokeDasharray="3 3" strokeWidth={3} />
                    <Line data={reData.b} type="monotone" 
                        dataKey="y" stroke="blue" strokeDasharray="2 2" strokeWidth={3} />
                    <Line data={reData.current} type="monotone" 
                        dataKey="y" stroke="#020"  strokeDasharray="0 0" activeDot={{r: 8}} strokeWidth={5}/>
                </LineChart>
            {/* </ResponsiveContainer> */}
        </div>
    );
}
 
export default Forecasting;