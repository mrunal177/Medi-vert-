import React, { useEffect, useState } from "react";
import {
    Map,
    AdvancedMarker,
    Pin,
    useMap,
    useMapsLibrary,
} from "@vis.gl/react-google-maps";

const DEFAULT_LOCATION = {
    lat: 18.5204,
    lng: 73.8567,
};

const MapView = ({ selectedPlace }) => {
    const map = useMap();
    const placesLib = useMapsLibrary("places");

    const [places, setPlaces] = useState([]);
    const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);

    const searchNearby = (location) => {
        if (!placesLib || !map) return;

        const service = new window.google.maps.places.PlacesService(map);

        service.nearbySearch(
            {
                location,
                radius: 5000,
                type: ["pharmacy", "hospital"],
            },
            (results, status) => {
                if (
                    status === window.google.maps.places.PlacesServiceStatus.OK &&
                    results
                ) {
                    setPlaces(results);
                }
            }
        );
    };

    /* Get user location */
    useEffect(() => {
        if (!map) return;

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const loc = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                };
                setUserLocation(loc);
                map.setCenter(loc);
                map.setZoom(14);
                searchNearby(loc);
            },
            () => {
                map.setCenter(DEFAULT_LOCATION);
                searchNearby(DEFAULT_LOCATION);
            }
        );
    }, [map]);

    /* 🔗 THIS IS THE LINK */
    useEffect(() => {
        if (!map || !selectedPlace) return;
        map.panTo(selectedPlace.position);
        map.setZoom(15);
    }, [selectedPlace, map]);

    return (
        <Map
            defaultCenter={userLocation}
            defaultZoom={13}
            mapId="7be9fb0a38da20c51bf644c4"
            disableDefaultUI
            className="w-full h-full"
        >
            {places.map((place) => (
                <AdvancedMarker
                    key={place.place_id}
                    position={place.geometry.location}
                >
                    <Pin
                        background={
                            place.types?.includes("pharmacy")
                                ? "#2C5F58"
                                : "#BC4B28"
                        }
                        glyphColor="#fff"
                    />
                </AdvancedMarker>
            ))}
        </Map>
    );
};

export default MapView;
