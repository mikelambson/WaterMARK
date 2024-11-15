// components/InteractiveMap.tsx
import { MapContainer, TileLayer, GeoJSON, MapContainerProps } from 'react-leaflet';
import { useState } from 'react';

import { GeoJsonObject } from 'geojson';

import { useMap } from 'react-leaflet';

const SetView = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
};

const InteractiveMap = ({ geojsonData, center, zoom }: { geojsonData: GeoJsonObject; center: [number, number]; zoom: number }) => {
    // const mapProps: MapContainerProps = {
    //     style: { height: '500px', width: '100%' },
    //     center: [39.529, -119.812],
    //     zoom: 10
    // };
    const [hoveredFeature, setHoveredFeature] = useState<FeatureProperties | null>(null);

    // Define the default and highlighted styles
    const defaultStyle = {
        color: '#287788',
        weight: 3
    };

    const highlightStyle = {
        color: '#00FF00',
        weight: 8
    };

  // Define event handlers for each feature
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

    const onEachFeature = (feature: Feature, layer: Layer) => {
        layer.on({
            mouseover: (e) => {
                layer.setStyle(highlightStyle);
                setHoveredFeature(feature.properties);
            },
            mouseout: (e) => {
                layer.setStyle(defaultStyle);
                setHoveredFeature(null);
            },
            click: (e) => {
                alert(`Canal Segment: ${feature.properties.CommonName || "Unknown"}\nDescription: ${feature.properties.Description || "No Description"}`);
            }
        });
    };



  return (
    <div className='h-[calc(100dvh-4rem)]'>
        <MapContainer 
            style={{ height: '100%', width: '100%' }}
            
            >
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <SetView center={center} zoom={zoom} />
            {geojsonData && (
            <GeoJSON
                data={geojsonData}
                pathOptions={defaultStyle}
                eventHandlers={{ onEachFeature }}
            />
            )}
        </MapContainer>

      {hoveredFeature && (
        <div className="tooltip" style={{ position: 'absolute', top: 10, left: 10, backgroundColor: 'white', padding: '5px', borderRadius: '3px', border: '1px solid #ccc' }}>
          <strong>{hoveredFeature?.CommonName || "Canal Segment"}</strong>
          <p>{hoveredFeature?.Description || "No Description"}</p>
        </div>
      
      )}
    </div>
  );
};

export default InteractiveMap;
