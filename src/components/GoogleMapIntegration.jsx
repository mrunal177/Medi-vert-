import React, { useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';

// This sub-component handles the "flyTo" effect when a user clicks the sidebar
const MapUpdater = ({ selectedLocation }) => {
    const map = useMap();
    useEffect(() => {
        if (map && selectedLocation) {
            map.panTo(selectedLocation.position);
            map.setZoom(15);
        }
    }, [selectedLocation, map]);
    return null;
};

const GoogleMapIntegration = ({ locations, selectedLocation, onMarkerClick }) => {
    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <div className="w-full h-full rounded-[32px] overflow-hidden shadow-2xl border border-[#1A1A1A]/10 relative bg-[#E5E0D8]">
                <Map
                    defaultCenter={{ lat: 18.5204, lng: 73.8567 }}
                    defaultZoom={13}
                    mapId="YOUR_MAP_ID" // Create a Map ID in Google Cloud Console for Advanced Markers
                    disableDefaultUI={true}
                >
                    <MapUpdater selectedLocation={selectedLocation} />

                    {locations.map((loc) => (
                        <AdvancedMarker
                            key={loc.id}
                            position={loc.position}
                            onClick={() => onMarkerClick(loc)}
                        >
                            {/* Custom Marker UI that matches your current look */}
                            <div
                                className={`w-6 h-6 rounded-full border-2 border-[#EFEDE6] shadow-lg flex items-center justify-center transition-all duration-300 ${selectedLocation?.id === loc.id ? "scale-125" : "scale-100"
                                    }`}
                                style={{ backgroundColor: loc.color }}
                            >
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                        </AdvancedMarker>
                    ))}
                </Map>
            </div>
        </APIProvider>
    );
};

export default GoogleMapIntegration;