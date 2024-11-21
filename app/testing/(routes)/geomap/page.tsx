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

    const [geojsonData, setGeojsonData] = useState<GeojsonData | null>(null);
    const [geoTCIDjson, setGeoTCIDjson] = useState<{ [key: string]: any } | null>(null);
    const [geoLoading, setGeoLoading] = useState(true); // Track loading state

    const fetchWithRetry = async (url: string, retries: number = 3): Promise<any> => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return await response.json();
        } catch (error) {
            if (retries > 0) {
                console.warn(`Retrying fetch for ${url}. Retries left: ${retries}`);
                return fetchWithRetry(url, retries - 1);
            } else {
                console.error(`Failed to fetch ${url} after retries.`);
                return null; // Return null if all retries fail
            }
        }
    };

     useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch core GeoJSON files
                const [canals, drainage, waterbodies] = await Promise.all([
                    fetchWithRetry('/geodata/LBAO_Delivery_Features.geojson'),
                    fetchWithRetry('/geodata/LBAO_Drainage_Features.geojson'),
                    fetchWithRetry('/geodata/NHD_Waterbodies.geojson'),
                ]);

                setGeojsonData({ canals, drainage, waterbodies });

                // Fetch TCID GeoJSON data
                const fetchedTCIDData = await getTCIDjsonData(); // Robust function for TCID data
                setGeoTCIDjson(fetchedTCIDData);
            } catch (error) {
                console.error("Error fetching GeoJSON data:", error);
            } finally {
                setGeoLoading(false); // Ensure loading is false once all requests complete
            }
        };

        fetchData();
    }, []);
      
  
    if (geoLoading) return (
        <Skeleton>
            <ComponentLoader className="pt-24 h-screen" />
        </Skeleton>
    );
  
    return ( 
        <div>
            {geojsonData && (
                <InteractiveMap 
                    geoJsonData={geojsonData} 
                    geoTCIDmapping={geoTCIDjson || undefined}
                    center={[39.4741, -118.8886]}
                    zoom={9} 
                />
            )}
        </div>
    );
}
 
export default GeoMap;