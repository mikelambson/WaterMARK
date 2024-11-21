"use client"
// components/InteractiveMap.tsx
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, GeoJSON, useMap, GeoJSONProps, ZoomControl, Popup, Tooltip, LayersControl, Marker, LayerGroup } from 'react-leaflet';
import React, { use, useState, useEffect, useMemo, useRef } from 'react';
import { GeoJsonObject } from 'geojson';
import { Dialog } from '@/components/ui/dialog';

// import { useTCIDjsonData } from '@/app/testing/(routes)/geomap/importGeojson';


interface FeatureInfo {
    Name: string;
    Description: string;
}

interface FeatureProperties {
    COMID?: number;
    FDATE?: string;
    GNIS_ID?: string;
    GNIS_NAME?: string;
    NAME?: string;
    AREASQKM?: number;
    ELEVATION?: number;
    REACHCODE?: string;
    FTYPE?: string;
    FCODE?: number;
    ONOFFNET?: number;
    MeanDepth?: number;
    LakeVolume?: number;
    MaxDepth?: number;
    LakeArea?: number;
    FCODEDesc?: string;
    Esri_Symbo?: string;
    PopupTitle?: string;
    PopupSubti?: string | null;
    Shape__Are?: number;
    Shape__Len?: number;
    Type?: string;
    GlobalID?: string;
}

interface Feature {
    properties: FeatureProperties;
}

interface Layer {
    on: (eventHandlers: { [key: string]: (e: any) => void }) => void;
    setStyle: (style: { color: string; weight: number }) => void;
}

interface InteractiveMapProps {
    geoJsonData: {
        canals: GeoJsonObject;
        drainage: GeoJsonObject;
        waterbodies: GeoJsonObject;
    };
    geoTCIDmapping?: {
        aLine: GeoJsonObject;
        carsonLakePasture: GeoJsonObject;
        carsonRiver: GeoJsonObject;
        dLine: GeoJsonObject;
        eLine: GeoJsonObject;
        gLine: GeoJsonObject; 
        harmonReservoir: GeoJsonObject;
        lLine: GeoJsonObject;
        l1Lateral: GeoJsonObject;
        lahontonReservoir: GeoJsonObject;
        nLine: GeoJsonObject;
        pLateral: GeoJsonObject;
        rLine: GeoJsonObject;
        rdLateral: GeoJsonObject;
        sLine: GeoJsonObject;
        sLineReservoir: GeoJsonObject;
        shecklerReservoir: GeoJsonObject;
        stillwaterPointReservoir: GeoJsonObject;
        tLine: GeoJsonObject;
        truckeeCanal: GeoJsonObject;
        truckeeRiver: GeoJsonObject;
    };
    center: [number, number];
    zoom?: number;
}

const InteractiveMap = ({ geoJsonData, geoTCIDmapping, center, zoom}: InteractiveMapProps) => {
    const tooltipRef = useRef<React.RefObject<typeof Tooltip>>(null);
    const [hoveredFeature, setHoveredFeature] = useState<FeatureInfo | null>(null);

    // Define styles for each layer
    const styles = {
        canals: { color: '#28445588', weight: 2 },
        drainage: { color: '#22764566', weight: 2 },
        waterbodies: { 
            color: '#2ecc7122', 
            weight: 4, 
            fillOpacity: 0.5, 
            interactive: false,
        }
    };


    const highlightStyle = { color: '#00FF00', weight: 8, interactive: false };

    // Define event handlers for each feature
    // const onEachFeature = (feature: Feature, layer: Layer, style: { color: string; weight: number }) => {
    //     layer.on({
    //         mouseover: () => {
    //             layer.setStyle(highlightStyle);
    //             setHoveredFeature({
    //                 Name: feature.properties.NAME || feature.properties.GNIS_NAME || "Unknown",
    //                 Description: feature.properties.Type || feature.properties.FTYPE || "No Description"
    //             });
    //         },
    //         mouseout: () => {
    //             layer.setStyle(style);
    //             setHoveredFeature(null);
    //         },
            
    //     });
    // };

    interface SetViewProps {
        center: [number, number];
        zoom?: number;
    }

    const SetView: React.FC<SetViewProps> = ({ center, zoom }) => {
        zoom = zoom || 10.5;
        const map = useMap();
        useEffect(() => {
            if (map) {
                map.setView(center, zoom);
            }
        }, [map, center, zoom]);
        return null;
    };



    useEffect(() => {
        if (tooltipRef.current && tooltipRef.current.current) {
        // Tooltip opening logic can be implemented here if needed
        }
    }, []);

    return (
        <div className="h-[calc(100dvh-4rem)]">
            <MapContainer className={'z-0 h-full w-full'}
            >
                <SetView center={center} />
                {/* <ZoomControl position="bottomleft" /> */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LayersControl>
                    <LayersControl.Overlay name="Marker with popup">
                        <Marker position={center}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                        </Marker>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="All Canals">
                        <LayerGroup>
                            {/* Render Canals Layer */}
                            {geoJsonData.canals && (
                                <GeoJSON
                                    data={geoJsonData.canals}
                                    pathOptions={styles.canals}
                                >
                                    <Popup>
                                        <h2>Canal</h2>
                                    </Popup>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay name="Drainage">
                        {/* Render Drainage Layer */}
                        <LayerGroup>
                        {geoJsonData.drainage && (
                            <GeoJSON
                                data={geoJsonData.drainage}
                                pathOptions={styles.drainage}
                                
                            >  
                                
                                <Popup>
                                    <h2>Drainage</h2>
                                </Popup>
                            </GeoJSON>
                        )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Waterbodies">
                    <LayerGroup>
                        {/* Render Waterbodies Layer */}
                        {geoJsonData.waterbodies && (
                            <GeoJSON
                                data={geoJsonData.waterbodies}
                                pathOptions={styles.waterbodies}
                            >
                            <Popup>
                                <h2>Waterbody</h2>
                            </Popup>
                            </GeoJSON>
                        )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="A-Line">
                        <LayerGroup>
                            {geoTCIDmapping?.aLine && (
                                <GeoJSON 
                                    data={geoTCIDmapping.aLine} 
                                    pathOptions={{ color: '#DD6644', weight: 4 }}
                                >
                                    <Popup>
                                        <h2>A-Line</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>A-Line</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Carson Lake Pasture">
                        <LayerGroup>                   
                            {geoTCIDmapping?.carsonLakePasture && (
                                <GeoJSON 
                                    data={geoTCIDmapping.carsonLakePasture} 
                                    pathOptions={{ color: '#449988AA', weight: 3 }}
                                >
                                    <Popup>
                                        <h2>Carson Lake Pasture</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>Carson Lake Pasture</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Carson River">
                        <LayerGroup>
                            <Marker position={[39.4741, -119.0306]}>
                                <Popup>
                                    Carson <br /> River 
                                </Popup>
                            </Marker>
                            {geoTCIDmapping?.carsonRiver && (
                                <GeoJSON 
                                    data={geoTCIDmapping.carsonRiver} 
                                    pathOptions={{ color: '#4466DD', weight: 4 }}
                                >
                                    
                                    <Tooltip>
                                        <div>
                                            <h2>Carson River</h2>
                                        </div>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>
                {/* <MinimapControl position="topright" /> */}
            </MapContainer>

            {/* Tooltip for hovered feature */}
            {hoveredFeature && (
                <div
                    className="absolute tooltip z-[1000] top-[4.5rem] left-36 bg-card p-2 rounded-md border border-gray-300"
                >
                    <strong>{hoveredFeature.Name || "Canal Segment"}</strong>
                    <p>{hoveredFeature.Description || "No Description"}</p>
                </div>
            )}
        </div>
    );
};

export default InteractiveMap;
