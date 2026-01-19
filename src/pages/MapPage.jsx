import React, { useEffect, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  useMap,
  ControlPosition,
} from "@vis.gl/react-google-maps";
import Navbar from "../components/Navbar"; // adjust path if needed

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAP_ID = "7be9fb0a38da20c51bf644c4";

const DEFAULT_LOCATION = { lat: 18.5204, lng: 73.8567 };

/* ---------------- MAP HANDLER ---------------- */
const MapHandler = ({ selectedPlace }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !selectedPlace) return;
    map.panTo(selectedPlace.position);
    map.setZoom(15);
  }, [map, selectedPlace]);

  return null;
};

/* ---------------- MAIN PAGE ---------------- */
const MapPage = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);

  const places = [
    {
      id: 1,
      name: "Govt. Health Center",
      type: "GOVT",
      position: { lat: 18.5314, lng: 73.8446 },
    },
    {
      id: 2,
      name: "Eco-Bin Drop",
      type: "24/7",
      position: { lat: 18.5099, lng: 73.8648 },
    },
    {
      id: 3,
      name: "City Pharmacy",
      type: "PHARMACY",
      position: { lat: 18.5204, lng: 73.8567 },
    },
    {
      id: 4,
      name: "Apollo Chemist",
      type: "PHARMACY",
      position: { lat: 18.5529, lng: 73.8031 },
    },
  ];

  const userLocation = DEFAULT_LOCATION;

  return (
    <APIProvider apiKey={API_KEY} libraries={["places"]}>
      <div className="flex h-screen w-full bg-[#EFEDE6] overflow-hidden">
        {/* ================= SIDEBAR CONTAINER ================= */}
        <div className="relative w-[420px] h-full bg-[#EFEDE6] px-8 pt-24 pb-6 overflow-y-auto">
          {/* Badge */}
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 border border-[#BC4B28]/30 px-3 py-1 rounded-full bg-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BC4B28] animate-pulse" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#BC4B28]/80">
                Locator
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-serif font-medium leading-[0.95] mb-4">
            Locate <span className="text-[#BC4B28] italic">Safety.</span>
          </h1>

          <p className="text-sm text-[#1A1A1A]/70 mb-6 leading-relaxed max-w-xs">
            Verified locations accepting unused medicines to prevent soil &
            water contamination.
          </p>

          {/* Cards */}
          <div className="space-y-4">
            {places.map((place) => (
              <div
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                className={`bg-white rounded-[18px] p-6 cursor-pointer transition-all ${
                  selectedPlace?.id === place.id
                    ? "shadow-xl scale-[1.02]"
                    : "shadow-sm hover:shadow-md"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-serif font-medium mb-1">
                      {place.name}
                    </h3>
                    <span className="text-[11px] font-sans uppercase tracking-widest opacity-40">
                      {place.type}
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[#EFEDE6] flex items-center justify-center text-lg">
                    {place.type === "PHARMACY" ? "💊" : "🏛️"}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-[#1A1A1A]/5 pt-4">
                  <span className="text-xs font-bold text-[#4A5D23]">
                    Open Now
                  </span>

                  {/* View → Google Maps */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${place.position.lat},${place.position.lng}`,
                        "_blank",
                      );
                    }}
                    className="text-xs font-bold text-[#BC4B28] hover:underline"
                  >
                    View →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= MAP CONTAINER ================= */}
        <div className="flex-1 relative">
          {/* 🔥 NAVBAR ONLY FOR MAP */}
          <div className="absolute top-0 left-0 right-0 z-[1000]">
            <Navbar />
          </div>

          <Map
            defaultCenter={userLocation}
            defaultZoom={13}
            mapId={MAP_ID}
            disableDefaultUI
            zoomControl
            zoomControlOptions={{ position: ControlPosition.RIGHT_BOTTOM }}
            className="w-full h-full pt-20"
          >
            <MapHandler selectedPlace={selectedPlace} />

            {places.map((p) => (
              <AdvancedMarker
                key={p.id}
                position={p.position}
                onClick={() => setSelectedPlace(p)}
              >
                <Pin
                  background={
                    selectedPlace?.id === p.id ? "#BC4B28" : "#2C5F58"
                  }
                  glyphColor="#fff"
                  scale={selectedPlace?.id === p.id ? 1.3 : 1}
                />
              </AdvancedMarker>
            ))}

            <AdvancedMarker position={userLocation}>
              <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md animate-pulse" />
            </AdvancedMarker>
          </Map>
        </div>
      </div>
    </APIProvider>
  );
};

export default MapPage;
