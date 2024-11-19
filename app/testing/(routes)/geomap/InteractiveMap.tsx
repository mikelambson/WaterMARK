// components/InteractiveMap.tsx
import { MapContainer, TileLayer, GeoJSON, useMap, GeoJSONProps } from 'react-leaflet';
import { useState } from 'react';
import { GeoJsonObject } from 'geojson';

// Component to set map center and zoom
const SetView = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
};

interface FeatureProperties {
    CommonName?: string;
    Description?: string;
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
    const [hoveredFeature, setHoveredFeature] = useState<FeatureProperties | null>(null);

    // Define styles for each layer
    const styles = {
        canals: { color: '#287788', weight: 3 },
        drainage: { color: '#3498db', weight: 1 },
        waterbodies: { color: '#2ecc71', weight: 3, fillOpacity: 0.5 }
    };

    const highlightStyle = { color: '#00FF00', weight: 8 };

    // Define event handlers for each feature
    const onEachFeature = (feature: Feature, layer: Layer, style: { color: string; weight: number }) => {
        layer.on({
            mouseover: () => {
                layer.setStyle(highlightStyle);
                setHoveredFeature(feature.properties);
            },
            mouseout: () => {
                layer.setStyle(style);
                setHoveredFeature(null);
            },
            click: () => {
                alert(`Canal Segment: ${feature.properties.CommonName || "Unknown"}\nDescription: ${feature.properties.Description || "No Description"}`);
            }
        });
    };

    return (
        <div className="h-[calc(100dvh-4rem)]">
            <MapContainer style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <SetView center={center} zoom={zoom} />
                {/* Render Canals Layer */}
                {geoJsonData.canals && (
                    <GeoJSON
                        data={geoJsonData.canals}
                        pathOptions={styles.canals}
                        eventHandlers={{
                            add: (e: { target: any; }) => {
                                const layer = e.target;
                                const feature = layer.feature;
                                onEachFeature(feature, layer, styles.canals);
                            }
                        }}
                    />
                )}
                {/* Render Drainage Layer */}
                {geoJsonData.drainage && (
                    <GeoJSON
                    data={geoJsonData.drainage}
                    pathOptions={styles.drainage}
                    eventHandlers={{
                        add: (e: { target: any; }) => {
                            const layer = e.target;
                            const feature = layer.feature;
                            onEachFeature(feature, layer, styles.drainage);
                        }
                    }}
                    />  
                )}
                {/* Render Waterbodies Layer */}
                {geoJsonData.waterbodies && (
                    <GeoJSON
                        data={geoJsonData.waterbodies}
                        pathOptions={styles.waterbodies}
                        eventHandlers={{
                            add: (e: { target: any; }) => {
                                const layer = e.target;
                                const feature = layer.feature;
                                onEachFeature(feature, layer, styles.waterbodies);
                            }
                        }}
                    />
                )}
            </MapContainer>

            {/* Tooltip for hovered feature */}
            {hoveredFeature && (
                <div
                    className="tooltip"
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        backgroundColor: 'white',
                        padding: '5px',
                        borderRadius: '3px',
                        border: '1px solid #ccc'
                    }}
                >
                    <strong>{hoveredFeature.CommonName || "Canal Segment"}</strong>
                    <p>{hoveredFeature.Description || "No Description"}</p>
                </div>
            )}
        </div>
    );
};

export default InteractiveMap;
