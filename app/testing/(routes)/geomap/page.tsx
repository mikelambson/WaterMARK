"use client"
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import InteractiveMap from "./InteractiveMap"

const GeoMap = () => {
    interface GeojsonData {
      canals: any;
      drainage: any;
      waterbodies: any;
    }
    
    const [geojsonData, setGeojsonData] = useState<GeojsonData | null>(null);

    useEffect(() => {
      // Fetch all GeoJSON files
    Promise.all([
        fetch('/geodata/LBAO_Delivery_Features.geojson').then(res => res.json()),
        fetch('/geodata/LBAO_Drainage_Features.geojson').then(res => res.json()),
        fetch('/geodata/NHD_Waterbodies.geojson').then(res => res.json())
      ]).then(([canals, drainage, waterbodies]) => {
        // Set the GeoJSON data in an object for easy access
        setGeojsonData({ canals, drainage, waterbodies });
      });
    }, []);
  
    if (!geojsonData) return <p>Loading map...</p>;
  
    return ( 
        <div>
            <InteractiveMap geoJsonData={geojsonData} center={[39.4741, -118.8786]} zoom={10.5} />
        </div>
     );
}
 
export default GeoMap;