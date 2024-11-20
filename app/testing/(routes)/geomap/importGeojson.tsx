import { useEffect } from 'react';
import { useState } from 'react';

const useTCIDjsonData = () => {
    interface GeoTCIDdata {
        aLine: any;
        carsonLakePasture: any;
        carsonRiver: any;
    }
    
    const [geoTCIDjson, setGeoTCIDjson] = useState<GeoTCIDdata | null>(null);


    useEffect(() => {
            
        Promise.all([
            fetch('/geodata/A-Line.geojson').then(res => res.json()),
            fetch('/geodata/CarsonLakePasture.geojson').then(res => res.json()),
            fetch('/geodata/CarsonRiver.geojson').then(res => res.json())
        ]).then(([aLine, carsonLakePasture, carsonRiver]) => {
            // Set the GeoJSON data in an object for easy access
            setGeoTCIDjson({ aLine, carsonLakePasture, carsonRiver });
        }).catch(err => console.error("Failed to fetch GeoJSON files:", err));
    }, []);
    
    return geoTCIDjson;
}

export { useTCIDjsonData };
