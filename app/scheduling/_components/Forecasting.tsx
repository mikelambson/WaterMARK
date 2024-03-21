import { cn } from '@/lib/utils';
import { Vega, VisualizationSpec } from 'react-vega';
import { BandScale, LinearScale } from 'vega';

interface ForecastProps {
    className?: string;
}

const xScale: BandScale = {
  "name": "x",
  "type": "band",
  "domain": {"data": "table", "field": "month"},
  "range": "width",
  "padding": 0.05
};

const yScale: LinearScale = {
  "name": "y",
  "type": "linear",
  "domain": {"data": "table", "field": "value"},
  "range": "height",
  "nice": true // Adjust the range to fit the data
};

const data = {
  table: [
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
};

const projectedLines = {
  table: [
    {"month": "Apr", "value": 90},
    {"month": "May", "value": 95},
    {"month": "Jun", "value": 100},
    {"month": "Jul", "value": 105},
    {"month": "Aug", "value": 110},
    {"month": "Sep", "value": 115},
    {"month": "Oct", "value": 120},
    {"month": "Nov", "value": 125},
    {"month": "Dec", "value": 150}
  ]
};

const spec: VisualizationSpec ={
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
        {"month": "Apr", "value": 90},
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
      "nice": true
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
  ]
}


const Forecasting: React.FC<ForecastProps> = ({className}) => {
  return ( 
    <div className={cn("w-full h-full",className) }>
      <Vega spec={spec} />
    </div>
  );
}
 
export default Forecasting;