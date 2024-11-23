"use client"
// components/InteractiveMap.tsx
import { MapContainer, TileLayer, GeoJSON, useMap, ZoomControl, Popup, Tooltip, LayersControl, Marker, LayerGroup } from 'react-leaflet';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GeoJsonObject } from 'geojson';
import L from "leaflet";
import { Dialog } from '@/components/ui/dialog';
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon paths
L.Icon.Default.mergeOptions({
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

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
    geoTCIDmapping?: { [key: string]: GeoJsonObject };
    center: [number, number];
    zoom?: number;
    type?: string;
}

const InteractiveMap = ({ geoJsonData, geoTCIDmapping, center, zoom, type}: InteractiveMapProps) => {
    const tooltipRef = useRef<React.RefObject<typeof Tooltip>>(null);
    const [hoveredFeature, setHoveredFeature] = useState<FeatureInfo | null>(null);
    const sizeSettings = type === 'page' ? "h-[calc(100dvh-4rem)]" : type === 'card' ? "h-full" : "h-full";
    

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
        <div className={`${sizeSettings}`}>
            <MapContainer 
                className={'z-0 h-full w-full'}
                zoomControl={type === "page" ? false : true}
            >
                <SetView center={center} />
                {/* <ZoomControl position="bottomleft" /> */}
                {/* <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                /> */}
                {type === "page" ? <ZoomControl position="bottomleft" /> : null}
                <LayersControl>
                    {/* ESRI Satellite */}
                    <LayersControl.BaseLayer checked name="Satellite">
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution='Tiles &copy; <a href="https://www.esri.com/">Esri</a>'
                    />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="OpenStreetMap">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />  
                    </LayersControl.BaseLayer>
                    
                    {/* Mapbox Hybrid (Satellite + Streets) */}
                    {/* <LayersControl.BaseLayer name="Hybrid">
                    <TileLayer
                        url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=YOUR_MAPBOX_ACCESS_TOKEN"
                        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://www.mapbox.com/">Mapbox</a>'
                        tileSize={512}
                        zoomOffset={-1}
                    />
                    </LayersControl.BaseLayer> */}
                    
                    <LayersControl.Overlay checked name="Measurements">
                            <Marker position={[39.4638, -119.0486]}>
                                <Tooltip />
                                    
                                
                                <Popup>
                                    <div className="flex flex-col items-center gap-0 text-center text-lg font-semibold m-0 p-0">
                                        <span>Carson River</span>
                                        <span className="text-xs italic font-light">below Lahontan</span>
                                        <span>24 cfs</span>
                                    </div>
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
                    <LayersControl.Overlay checked name="NHD Waterbodies">
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
                    <LayersControl.Overlay name="Carson Lake Pasture">
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
                            {geoTCIDmapping?.carsonRiver && (
                                <GeoJSON 
                                    data={geoTCIDmapping.carsonRiver} 
                                    pathOptions={{ color: '#4466DD', weight: 4 }}
                                >
                                    <Popup>
                                        <h2>Carson River</h2>
                                    </Popup>
                                    <Tooltip>
                                        <div>
                                            <h2>Carson River</h2>
                                        </div>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="D-Line">
                        <LayerGroup>
                            {geoTCIDmapping?.dLine && (
                                <GeoJSON 
                                    data={geoTCIDmapping.dLine} 
                                    pathOptions={{ color: '#00931B', weight: 4 }}
                                >
                                    <Popup>
                                        <h2>D-Line</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>D-Line</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="E-Line">
                        <LayerGroup>
                            {geoTCIDmapping?.eLine && (
                                <GeoJSON 
                                    data={geoTCIDmapping.eLine} 
                                    pathOptions={{ color: '#590093', weight: 4 }}
                                >
                                    <Popup>
                                        <h2>E-Line</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>E-Line</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="G-Line">
                        <LayerGroup>
                            {geoTCIDmapping?.gLine && (
                                <GeoJSON 
                                    data={geoTCIDmapping.gLine} 
                                    pathOptions={{ color: '#686900', weight: 4 }}
                                >
                                    <Popup>
                                        <h2>G-Line</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>G-Line</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Harmon Reservoir">
                        <LayerGroup>
                            {geoTCIDmapping?.harmonReservoir && (
                                <GeoJSON 
                                    data={geoTCIDmapping.harmonReservoir} 
                                    pathOptions={{ color: '#005CFF', weight: 2, fillOpacity: 0.5 }}
                                >
                                    <Popup>
                                        <h2>Harmon Reservoir</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>Harmon Reservoir</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="L1-Lateral">
                        <LayerGroup>
                            {geoTCIDmapping?.l1Lateral && (
                                <GeoJSON 
                                    data={geoTCIDmapping.l1Lateral} 
                                    pathOptions={{ color: '#FF95FC', weight: 4 }}
                                >
                                    <Popup>
                                        <h2>L1-Lateral</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>L-Lateral</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="L-Line">
                        <LayerGroup>
                            {geoTCIDmapping?.lLine && (
                                <GeoJSON 
                                    data={geoTCIDmapping.lLine} 
                                    pathOptions={{ color: '#FF49FC', weight: 4 }}
                                >
                                    <Popup>
                                        <h2>L-Line</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>L-Line</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Lahontan Reservoir">
                        <LayerGroup>
                            {geoTCIDmapping?.lahontanReservoir && (
                                <GeoJSON 
                                    data={geoTCIDmapping.lahontanReservoir} 
                                    pathOptions={{ color: '#005CFF', weight: 2, fillOpacity: 0.5 }}
                                >
                                    <Popup>
                                        <h2>Lahontan Reservoir</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>Lanhontan Reservoir</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="N-Line">
                        <LayerGroup>
                            {geoTCIDmapping?.nLine && (
                                <GeoJSON 
                                    data={geoTCIDmapping.nLine} 
                                    pathOptions={{ color: '#D10068', weight: 4 }}
                                >
                                    <Popup>
                                        <h2>N-Line</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>N-Line</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="RD-Lateral">
                        <LayerGroup>
                            {geoTCIDmapping?.rdLateral && (
                                <GeoJSON 
                                    data={geoTCIDmapping.rdLateral} 
                                    pathOptions={{ color: '#A46739', weight: 4 }}
                                >
                                    <Popup>
                                        <h2>RD-Lateral</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>RD-Lateral</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="R-Line">
                        <LayerGroup>
                            {geoTCIDmapping?.rLine && (
                                <GeoJSON 
                                    data={geoTCIDmapping.rLine} 
                                    pathOptions={{ color: '#846729', weight: 4 }}
                                >
                                    <Popup>
                                        <h2>R-Line</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>R-Line</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="S-Line">
                        <LayerGroup>
                            {geoTCIDmapping?.sLine && (
                                <GeoJSON 
                                    data={geoTCIDmapping.sLine} 
                                    pathOptions={{ color: '#ECD300', weight: 4 }}
                                >
                                    <Popup>
                                        <h2>S-Line</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>S-Line</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="S-Line Reservoir">
                        <LayerGroup>
                            {geoTCIDmapping?.sLineReservoir && (
                                <GeoJSON 
                                    data={geoTCIDmapping.sLineReservoir} 
                                    pathOptions={{ color: '#005CFF', weight: 2, fillOpacity: 0.5 }}
                                >
                                    <Popup>
                                        <h2>S-Line Reservoir</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>S-Line Reservoir</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Sheckler Reservoir">
                        <LayerGroup>
                            {geoTCIDmapping?.shecklerReservoir && (
                                <GeoJSON 
                                    data={geoTCIDmapping.shecklerReservoir} 
                                    pathOptions={{ color: '#005CFF', weight: 2, fillOpacity: 0.5 }}
                                >
                                    <Popup>
                                        <h2>Sheckler Reservoir</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>Sheckler Reservoir</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Stillwater Point Reservoir">
                        <LayerGroup>
                            {geoTCIDmapping?.stillwaterPointReservoir && (
                                <GeoJSON 
                                    data={geoTCIDmapping.stillwaterPointReservoir} 
                                    pathOptions={{ color: '#005CFF', weight: 2, fillOpacity: 0.5 }}
                                >
                                    <Popup>
                                        <h2>Stillwater Point Reservoir</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>Stillwater Point Reservoir</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="T-Line">
                        <LayerGroup>
                            {geoTCIDmapping?.tLine && (
                                <GeoJSON 
                                    data={geoTCIDmapping.tLine} 
                                    pathOptions={{ color: '#00A4A0', weight: 4 }}
                                >
                                    <Popup>
                                        <h2>T-Line</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>T-Line</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Truckee Canal">
                        <LayerGroup>
                            {geoTCIDmapping?.truckeeCanal && (
                                <GeoJSON 
                                    data={geoTCIDmapping.truckeeCanal} 
                                    pathOptions={{ color: '#006765', weight: 4 }}
                                >
                                    <Popup>
                                        <h2>Truckee Canal</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>Truckee Canal</h2>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="Truckee River">
                        <LayerGroup>
                            {geoTCIDmapping?.truckeeRiver && (
                                <GeoJSON 
                                    data={geoTCIDmapping.truckeeRiver} 
                                    pathOptions={{ color: '#4466DD', weight: 4 }}
                                >
                                    <Popup>
                                        <h2>Truckee River</h2>
                                    </Popup>
                                    <Tooltip>
                                        <div>
                                            <h2>Truckee River</h2>
                                        </div>
                                    </Tooltip>
                                </GeoJSON>
                            )}
                        </LayerGroup>
                    </LayersControl.Overlay>
                    <LayersControl.Overlay checked name="V-Line">
                        <LayerGroup>
                            {geoTCIDmapping?.vLine && (
                                <GeoJSON 
                                    data={geoTCIDmapping.vLine} 
                                    pathOptions={{ color: '#01C700', weight: 4 }}
                                >
                                    <Popup>
                                        <h2>V-Line</h2>
                                    </Popup>
                                    <Tooltip>
                                        <h2>V-Line</h2>
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
