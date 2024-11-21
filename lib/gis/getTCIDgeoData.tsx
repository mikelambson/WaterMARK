// getGeojsonData.tsx
interface GeoTCIDdata {
    [key: string]: any;
}

const geojsonFiles = {
    aLine: '/geodata/A-Line.geojson',
    carsonLakePasture: '/geodata/CarsonLakePasture.geojson',
    carsonRiver: '/geodata/CarsonRiver.geojson',
    dLine: '/geodata/D-Line.geojson',
    eLine: '/geodata/E-Line.geojson',
    gLine: '/geodata/G-Line.geojson',
    harmonReservoir: '/geodata/HarmonReservoir.geojson',
    lLine: '/geodata/L-Line.geojson',
    l1Lateral: '/geodata/L1-Lateral.geojson',
    lahontanReservoir: '/geodata/LahontanReservoir.geojson',
    nLine: '/geodata/N-Line.geojson',
    pLateral: '/geodata/P-Lateral.geojson',
    rLine: '/geodata/R-Line.geojson',
    rdLateral: '/geodata/RD-Lateral.geojson',
    sLine: '/geodata/S-Line.geojson',
    sLineReservoir: '/geodata/S-LineReservoir.geojson',
    shecklerReservoir: '/geodata/ShecklerReservoir.geojson',
    stillwaterPointReservoir: '/geodata/StillwaterPointReservoir.geojson',
    tLine: '/geodata/T-Line.geojson',
    truckeeCanal: '/geodata/TruckeeCanal.geojson',
    truckeeRiver: '/geodata/TruckeeRiver.geojson',
    vLine: '/geodata/V-Line.geojson',
};

export async function getTCIDjsonData(retryCount = 3): Promise<GeoTCIDdata> {
    const geoData: GeoTCIDdata = {};

    // Helper function to fetch with retries
    const fetchWithRetry = async (url: string, retries: number): Promise<any> => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            if (retries > 0) {
                console.warn(`Retrying fetch for ${url}. Retries left: ${retries}`);
                return fetchWithRetry(url, retries - 1);
            } else {
                console.error(`Failed to fetch ${url} after retries.`);
                return null; // Return null on failure
            }
        }
    };

    // Fetch all files with retries
    await Promise.all(
        Object.entries(geojsonFiles).map(async ([key, url]) => {
            const data = await fetchWithRetry(url, retryCount);
            if (data) {
                geoData[key] = data; // Save successful data
            }
        })
    );

    return geoData; // Return whatever data was successfully fetched
}
