import { cn } from '@/lib/utils';
import { Vega, VisualizationSpec } from 'react-vega';
//npm rebuild canvas --update-binary for major version changes

import { useTheme } from "next-themes";


interface ForecastProps {
    className?: string;
}


const Forecasting: React.FC<ForecastProps> = ({className}) => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  const textColorClass = isDarkMode ? "#AFBFCF" : "#102030";
  const gridColorClass = isDarkMode ? "#1A202C" : "#F7FAFC";
  const backgroundColorClass = isDarkMode ? "#555" : "#e5e5e5";

  const spec: VisualizationSpec = {
    "$schema": "https://vega.github.io/schema/vega/v5.json",
    "width": 800,
    "height": 400,
    "padding": 5,
    
    "data": [
      {
        "name": "table",
        "values": [
          {"month": "Jan", "value": 60},
          {"month": "Feb", "value": 62},
          {"month": "Mar", "value": 64},
          {"month": "Apr", "value": 68},
          {"month": "May", "value": 72},
          {"month": "Jun", "value": 76},
          {"month": "Jul", "value": 80},
          {"month": "Aug", "value": 85},
          {"month": "Sep", "value": 90},
          {"month": "Oct", "value": 95},
          {"month": "Nov", "value": 100},
          {"month": "Dec", "value": 105}
        ]
      },
      {
        "name": "projectedLines",
        "values": [
          {"month": "Mar", "value": 64},
          {"month": "Apr", "value": 72},
          {"month": "May", "value": 95},
          {"month": "Jun", "value": 100},
          {"month": "Jul", "value": 105},
          {"month": "Aug", "value": 110},
          {"month": "Sep", "value": 115},
          {"month": "Oct", "value": 120},
          {"month": "Nov", "value": 125},
          {"month": "Dec", "value": 150}
        ]
      }
    ],
    "scales": [
      {
        "name": "x",
        "type": "band",
        "domain": {"data": "table", "field": "month"},
        "range": "width",
        "padding": 0.05
      },
      {
        "name": "y",
        "type": "linear",
        "domain": {"data": "table", "field": "value"},
        "range": "height",
        "nice": 2
      }
    ],
    "axes": [
      {"orient": "bottom", "scale": "x", "title": "Month"},
      {"orient": "left", "scale": "y", "title": "Water Level (%)", "grid": true}
    ],
  
    "marks": [
      {
        "type": "line",
        "from": {"data": "table"},
        "encode": {
          "enter": {
            "x": {"scale": "x", "field": "month"},
            "y": {"scale": "y", "field": "value"},
            "stroke": {"value": "steelblue"},
            "strokeWidth": {"value": 2}
          }
        }
      },
      {
        "type": "line",
        "from": {"data": "projectedLines"},
        "encode": {
          "enter": {
            "x": {"scale": "x", "field": "month"},
            "y": {"scale": "y", "field": "value"},
            "stroke": {"value": "red"},
            "strokeWidth": {"value": 2},
            "strokeDash": {"value": [5, 5]}
          }
        }
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
        "labelFontSize": 11,
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

  return ( 
    <div className={cn("p-2",className) }>
      <Vega spec={spec} />
    </div>
  );
}
 
export default Forecasting;