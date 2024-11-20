"use client"
// components/InteractiveMap.tsx
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, GeoJSON, useMap, GeoJSONProps, ZoomControl, Popup, Tooltip } from 'react-leaflet';
import React, { use, useState, useEffect, useMemo } from 'react';
import { GeoJsonObject } from 'geojson';
import { Dialog } from '@/components/ui/dialog';


// const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
// const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
// const SetView = dynamic(() => import('./SetView'), { ssr: false }); // Your custom SetView component

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
    center: [number, number];
    zoom: number;
}

const InteractiveMap = ({ geoJsonData, center, zoom }: InteractiveMapProps) => {
    const [hoveredFeature, setHoveredFeature] = useState<FeatureInfo | null>(null);

    // Define styles for each layer
    const styles = {
        canals: { color: '#287788', weight: 4 },
        drainage: { color: '#3498db', weight: 1 },
        waterbodies: { 
            color: '#2ecc71', 
            weight: 4, 
            fillOpacity: 0.5, 
            interactive: true 
        }
    };

    const highlightStyle = { color: '#00FF00', weight: 8, interactive: true };

    // Define event handlers for each feature
    const onEachFeature = (feature: Feature, layer: Layer, style: { color: string; weight: number }) => {
        layer.on({
            mouseover: () => {
                layer.setStyle(highlightStyle);
                setHoveredFeature({
                    Name: feature.properties.NAME || feature.properties.GNIS_NAME || "Unknown",
                    Description: feature.properties.Type || feature.properties.FTYPE || "No Description"
                });
            },
            mouseout: () => {
                layer.setStyle(style);
                setHoveredFeature(null);
            },
            // click: () => {
            //     alert(`Canal Segment: ${feature.properties.NAME || feature.properties.GNIS_NAME || "Unknown"}\nDescription: ${feature.properties.Type ||feature.properties.FTYPE || "No Description"}`);
            // }
        });
    };

    interface SetViewProps {
        center: [number, number];
        zoom?: number;
    }

    const SetView: React.FC<SetViewProps> = ({ center }) => {
        const map = useMap();
        useEffect(() => {
            if (map) {
                map.setView(center, 10.5);
            }
        }, [map, center]);
        return null;
    };


    

    return (
        <div className="h-[calc(100dvh-4rem)]">
            <MapContainer className={'z-0 h-full w-full'}
            >
                <SetView center={center} />
                {/* <ZoomControl position="bottomleft" /> */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Render Canals Layer */}
                {geoJsonData.canals && (
                    <GeoJSON
                        data={geoJsonData.canals}
                        pathOptions={styles.canals}
                        // eventHandlers={{
                        //     add: (e: { target: any }) => {
                        //         const layerGroup = e.target; // The parent LayerGroup
                        //         layerGroup.eachLayer((subLayer: any) => {
                        //             // Access the feature and attach events
                        //             const feature = subLayer.feature;
                        //             onEachFeature(feature, subLayer, styles.canals);
                        //         });
                        //     }
                        // }}
                    >
                        <Tooltip>
                            <h2>{hoveredFeature?.Name}</h2>
                            <p>Type: {hoveredFeature?.Description}</p>
                            <p>Reach Code: {geoJsonData.canals.bbox?.[0]}</p>
                            <p>Length: {geoJsonData.canals.bbox?.[0]}</p>
                        </Tooltip>
                    </GeoJSON>
                )}
                {/* Render Drainage Layer */}
                {geoJsonData.drainage && (
                    <GeoJSON
                        data={geoJsonData.drainage}
                        pathOptions={styles.drainage}
                        // eventHandlers={{
                        //     add: (e: { target: any }) => {
                        //         const layerGroup = e.target; // The parent LayerGroup
                        //         layerGroup.eachLayer((subLayer: any) => {
                        //             // Access the feature and attach events
                        //             const feature = subLayer.feature;
                        //             onEachFeature(feature, subLayer, styles.drainage);
                        //         });
                        //     }
                        // }}
                    />  
                )}
                {/* Render Waterbodies Layer */}
                {geoJsonData.waterbodies && (
                    <GeoJSON
                        data={geoJsonData.waterbodies}
                        pathOptions={styles.waterbodies}
                        eventHandlers={{
                            add: (e: { target: any }) => {
                                const layerGroup = e.target; // The parent LayerGroup
                                layerGroup.eachLayer((subLayer: any) => {
                                    // Access the feature and attach events
                                    const feature = subLayer.feature;
                                    const toottipContent = (
                                        <>
                                            <h2>{feature.properties.GNIS_NAME}</h2>
                                            <p>Type: {feature.properties.FTYPE}</p>
                                            
                                            <p>Area: {feature.properties.AREASQKM}</p>
                                        </>
                                    )
                                    subLayer.bindTooltip(toottipContent);
                                    // onEachFeature(feature, subLayer, styles.waterbodies);
                                });
                            }
                        }}
                        
                    >
                        <Tooltip>
                            <h2>Name</h2>
                            <p>Type: </p>
                        </Tooltip>
                    </GeoJSON>
                )}
                
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
