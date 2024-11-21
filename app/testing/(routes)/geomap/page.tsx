"use client"
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import ComponentLoader from '@/features/loader/comploader.module';
import dynamic from 'next/dynamic';

import { getTCIDjsonData } from '@/lib/gis/getTCIDgeoData';


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
    const [geoTCIDjson, setGeoTCIDjson] = useState<{ [key: string]: any } | null>(null);

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

    // Fetch TCID GeoJSON data with retries
    useEffect(() => {
        const fetchTCIDData = async () => {
            try {
                const fetchedData = await getTCIDjsonData();
                setGeoTCIDjson(fetchedData);
            } catch (error) {
                console.error("Failed to fetch TCID GeoJSON data:", error);
            }
        };

        fetchTCIDData();
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