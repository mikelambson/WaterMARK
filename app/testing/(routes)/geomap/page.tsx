"use client"
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ComponentLoader from '@/features/loader/comploader.module';
import dynamic from 'next/dynamic';


const InteractiveMap = dynamic(() => import('@/components/function/InteractiveMap'), { ssr: false });

const GeoMap = () => {
    interface GeojsonData {
      canals: any;
      drainage: any;
      waterbodies: any;
    }

    interface GeoTCIDdata {
        aLine: any;
        carsonLakePasture: any;
        carsonRiver: any;
        dLine: any;
        eLine: any;
        gLine: any;
        harmonReservoir: any;
        lLine: any;
        l1Lateral: any;
        lahontonReservoir: any;
        nLine: any;
        pLateral: any;
        rLine: any;
        rdLateral: any;
        sLine: any;
        sLineReservoir: any;
        shecklerReservoir: any;
        stillwaterPointReservoir: any;
        tLine: any;
        truckeeCanal: any;
        truckeeRiver: any;
    }
    
    const [geojsonData, setGeojsonData] = useState<GeojsonData | null>(null);
    const [geoTCIDjson, setGeoTCIDjson] = useState<GeoTCIDdata | null>(null);

    useEffect(() => {
      // Fetch all GeoJSON files
      
        Promise.all([
            fetch('/geodata/LBAO_Delivery_Features.geojson').then(res => res.json()),
            fetch('/geodata/LBAO_Drainage_Features.geojson').then(res => res.json()),
            fetch('/geodata/NHD_Waterbodies.geojson').then(res => res.json())
        ]).then(([canals, drainage, waterbodies]) => {
            // Set the GeoJSON data in an object for easy access
            setGeojsonData({ canals, drainage, waterbodies });
        }).catch(err => console.error("Failed to fetch GeoJSON files:", err));
    }, []);

    useEffect(() => {
            
        Promise.all([
            fetch('/geodata/A-Line.geojson').then(res => res.json()),
            fetch('/geodata/CarsonLakePasture.geojson').then(res => res.json()),
            fetch('/geodata/CarsonRiver.geojson').then(res => res.json()),
            fetch('/geodata/D-Line.geojson').then(res => res.json()),
            fetch('/geodata/E-Line.geojson').then(res => res.json()),
            fetch('/geodata/G-Line.geojson').then(res => res.json()),
            fetch('/geodata/HarmonReservoir.geojson').then(res => res.json()),
            fetch('/geodata/L-Line.geojson').then(res => res.json()),
            fetch('/geodata/L1-Lateral.geojson').then(res => res.json()),
            fetch('/geodata/LahontonReservoir.geojson').then(res => res.json()),
            fetch('/geodata/N-Line.geojson').then(res => res.json()),
            fetch('/geodata/P-Lateral.geojson').then(res => res.json()),
            fetch('/geodata/R-Line.geojson').then(res => res.json()),
            fetch('/geodata/RD-Lateral.geojson').then(res => res.json()),
            fetch('/geodata/S-Line.geojson').then(res => res.json()),
            fetch('/geodata/S-LineReservoir.geojson').then(res => res.json()),
            fetch('/geodata/ShecklerReservoir.geojson').then(res => res.json()),
            fetch('/geodata/StillwaterPointReservoir.geojson').then(res => res.json()),
            fetch('/geodata/T-Line.geojson').then(res => res.json()),
            fetch('/geodata/TruckeeCanal.geojson').then(res => res.json()),
            fetch('/geodata/TruckeeRiver.geojson').then(res => res.json()),
        ]).then(([aLine, carsonLakePasture, carsonRiver, dLine, eLine, gLine, harmonReservoir, lLine, l1Lateral, lahontonReservoir, nLine, pLateral, rLine, rdLateral, sLine, sLineReservoir, shecklerReservoir, stillwaterPointReservoir, tLine, truckeeCanal, truckeeRiver]) => {
            // Set the GeoJSON data in an object for easy access
            setGeoTCIDjson({ aLine, carsonLakePasture, carsonRiver, dLine, eLine, gLine, harmonReservoir, lLine, l1Lateral, lahontonReservoir, nLine, pLateral, rLine, rdLateral, sLine, sLineReservoir, shecklerReservoir, stillwaterPointReservoir, tLine, truckeeCanal, truckeeRiver });
        }).catch(err => console.error("Failed to fetch GeoJSON files:", err));
    }, []);
      
  
    if (!geojsonData || !geoTCIDjson) return (
        <Skeleton>
            <ComponentLoader className="pt-24 h-screen" />
        </Skeleton>
    );
  
    return ( 
        <div>
            <InteractiveMap 
                geoJsonData={geojsonData} 
                geoTCIDmapping={geoTCIDjson}
                center={[39.4741, -118.8886]}
                zoom={10} 
            />
        </div>
    );
}
 
export default GeoMap;