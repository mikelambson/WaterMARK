"use client"
import React, { useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { IoMdPrint } from 'react-icons/io';
import { useTheme } from "next-themes";
import { fi } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { VegaLite } from 'react-vega';
import { BiLeftArrow } from 'react-icons/bi';



interface ForecastProps {
    className?: string;
}



const data75 = [
    { month: 'Jan', value: 30 }, { month: 'Feb', value: 40 }, { month: 'Mar', value: 50 },
    { month: 'Apr', value: 66 }, { month: 'May', value: 80 }, { month: 'Jun', value: 90 },
    { month: 'Jul', value: 100 }, { month: 'Aug', value: 110 }, { month: 'Sep', value: 100 },
    { month: 'Oct', value: 90 }, { month: 'Nov', value: 70 }, { month: 'Dec', value: 60 }
  ];
  
  const data50 = [
    { month: 'Jan', value: 50 }, { month: 'Feb', value: 60 }, { month: 'Mar', value: 70 },
    { month: 'Apr', value: 86 }, { month: 'May', value: 100 }, { month: 'Jun', value: 120 },
    { month: 'Jul', value: 130 }, { month: 'Aug', value: 150 }, { month: 'Sep', value: 110 },
    { month: 'Oct', value: 90 }, { month: 'Nov', value: 80 }, { month: 'Dec', value: 70 }
  ];
  
  const currentData = [
    { month: 'Jan', value: 124000 }, { month: 'Feb', value: 132000 },
    { month: 'Mar', value: 155000 }, { month: 'Apr', value: 189100 },
    { month: 'May', value: 235600 }, { month: 'Jun', value: 268500 }
  ];


  const combinedData = [
    ...data75.map(d => ({ ...d, series: '75% Exceedence' })),
    ...data50.map(d => ({ ...d, series: '50% Exceedence' })),
    ...currentData.map(d => ({ ...d, series: 'Current', value: d.value / 1000 })) // Scale currentData for visual alignment
  ];

  const spec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'A line chart with dual y-axes using dynamic data.',
    width: 800,
    height: 400,
    background: null,
    data: { values: combinedData },
    layer: [
      {
        // Layer for the first Y-axis
        mark: 'line',
        encoding: {
          x: {
            field: 'month',
            type: 'ordinal',
            axis: {
              title: 'Month',
              labelColor: 'currentColor', // Color for the labels
              titleColor: 'currentColor', // Color for the title
            },
          },
          y: {
            field: 'value',
            type: 'quantitative',
            axis: { title: 'Percentage', grid: true, orient: 'left', labelColor: '#999', titleColor: '#999' },
            scale: { domain: [0, 160], name: 'yScaleLeft' }, // Explicit scale name
          },
          color: {
            field: 'series',
            type: 'nominal',
            scale: { range: ['green', 'red', 'blue'] },
            legend: {
              orient: 'top', // Position the legend at the top
              direction: 'horizontal', // Display the legend items in a row
              anchor: 'middle',
              title: null, // Hide the legend title (optional)
              padding: 0, // Add padding (optional)
            },
          },
          tooltip: [
            { field: 'series', type: 'nominal', title: 'Series' },
            { field: 'month', type: 'ordinal', title: 'Month' },
            { field: 'value', type: 'quantitative', title: 'Value' },
          ],
        },
      },
      {
        mark: 'line',
        encoding: {
          x: { field: 'month', type: 'ordinal' },
          y: {
            field: 'value',
            type: 'quantitative',
            axis: { title: 'Acre Feet (in Thousands)', grid: false, orient: 'right', labelColor: '#999', titleColor: '#999' },
            scale: { domain: [0, 310], name: 'yScaleRight' },
          },
          color: {
            field: 'series',
            type: 'nominal',
          },
          tooltip: [
            { field: 'series', type: 'nominal', title: 'Series' },
            { field: 'month', type: 'ordinal', title: 'Month' },
            { field: 'value', type: 'quantitative', title: 'Value' },
          ],
        },
      },
    ],
  };
  

const Forecasting = ({className}: ForecastProps) => {
  const { theme } = useTheme();
  const axisColor = theme === 'dark' ? '#999' : '#444';
  
  // Update the spec with dynamic colors:
  if (spec.layer[0].encoding.x.axis) {
    spec.layer[0].encoding.x.axis.labelColor = axisColor;
    spec.layer[0].encoding.x.axis.titleColor = axisColor;
  }
  if (spec.layer[0].encoding.y.axis) {
    spec.layer[0].encoding.y.axis.labelColor = axisColor;
    spec.layer[0].encoding.y.axis.titleColor = axisColor;
  }
  if (spec.layer[1].encoding.y.axis) {
    spec.layer[1].encoding.y.axis.labelColor = axisColor;
    spec.layer[1].encoding.y.axis.titleColor = axisColor;
  }

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



    return (
        <div className={cn(className, "w-full h-auto")}>
            <div className="flex justify-center items-center gap-2">
                <h2 className="text-2xl font-bold">
                    Lake Level Forecast
                </h2>
                <Button id='printButton' size={"pagination"} variant={'secondary'} onClick={handleSavePrint}>
                    <IoMdPrint />
                </Button>
            </div>
            <VegaLite spec={spec} />
        </div>
    );
};

export default Forecasting;


