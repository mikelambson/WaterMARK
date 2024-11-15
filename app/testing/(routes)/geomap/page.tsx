"use client"
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import InteractiveMap from "./InteractiveMap"

const GeoMap = () => {
    const [geojsonData, setGeojsonData] = useState(null);

    useEffect(() => {
      // Load the GeoJSON file from the public folder or fetch it from an API
      fetch('/geodata/LBAO_Delivery_Features.geojson')
        .then(response => response.json())
        .then(data => setGeojsonData(data));
    }, []);
  
    if (!geojsonData) return <p>Loading map...</p>;
  
    return ( 
        <div>
            <InteractiveMap geojsonData={geojsonData} center={[39.4741, -118.8786]} zoom={10.5} />
        </div>
     );
}
 
export default GeoMap;