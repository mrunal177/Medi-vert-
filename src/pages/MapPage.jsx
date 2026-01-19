import React, { useState, useEffect, useMemo } from "react";
import {
  Map,
  AdvancedMarker,
  Pin,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";
import { motion, AnimatePresence } from "framer-motion";

const MAP_ID = "7be9fb0a38da20c51bf644c4";
const DEFAULT_LOCATION = { lat: 18.5204, lng: 73.8567 };

// --- CUSTOM MAP STYLE (Clean & Earthy) ---
const mapStyle = [
  {
    featureType: "all",
    elementType: "geometry.fill",
    stylers: [{ color: "#F2F0E9" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#C8D3D1" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  { featureType: "poi", stylers: [{ visibility: "off" }] },
];

/* ---------------- DIRECTIONS RENDERER COMPONENT ---------------- */
const Directions = ({ origin, destination, onRouteData }) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);

  // 1. Initialize Services
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer({
        map,
        suppressMarkers: true, // We use our own custom markers
        polylineOptions: {
          strokeColor: "#BC4B28",
          strokeOpacity: 0.8,
          strokeWeight: 5,
        },
      }),
    );
  }, [routesLibrary, map]);

  // 2. Calculate Route
  useEffect(() => {
    if (!directionsService || !directionsRenderer || !origin || !destination)
      return;

    directionsService.route(
      {
        origin,
        destination,
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
          // Send distance/duration back to parent
          const leg = response.routes[0].legs[0];
          onRouteData({
            distance: leg.distance.text,
            duration: leg.duration.text,
          });
        } else {
          console.error("Directions request failed due to " + status);
        }
      },
    );

    // Cleanup: Remove route line when component unmounts or destination changes
    return () => directionsRenderer.setDirections(null);
  }, [directionsService, directionsRenderer, origin, destination]);

  return null;
};

/* ---------------- MAIN PAGE ---------------- */
const MapPage = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);

  // Route Info State
  const [routeInfo, setRouteInfo] = useState(null);

  // --- STATIC DATA ---
  const places = [
    {
      id: 1,
      name: "Govt. Health Center",
      type: "GOVT",
      position: { lat: 18.5314, lng: 73.8446 },
      address: "Shivaji Nagar, Pune",
    },
    {
      id: 2,
      name: "Eco-Bin Drop",
      type: "24/7",
      position: { lat: 18.5099, lng: 73.8648 },
      address: "Camp Area, Pune",
    },
    {
      id: 3,
      name: "City Pharmacy",
      type: "PHARMACY",
      position: { lat: 18.5204, lng: 73.8567 },
      address: "FC Road, Pune",
    },
    {
      id: 4,
      name: "Apollo Chemist",
      type: "PHARMACY",
      position: { lat: 18.5529, lng: 73.8031 },
      address: "Baner, Pune",
    },
    {
      id: 5,
      name: "Ruby Hall Clinic",
      type: "HOSPITAL",
      position: { lat: 18.53, lng: 73.877 },
      address: "Sasson Rd, Pune",
    },
  ];

  const categories = ["All", "Pharmacy", "Govt", "24/7", "Hospital"];

  // --- FILTER LOGIC ---
  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesSearch =
        place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        place.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" ||
        place.type.toUpperCase() === activeCategory.toUpperCase();
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  // --- GET LIVE LOCATION ---
  const handleLocateMe = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(pos);
        },
        () => alert("Location permission denied."),
      );
    }
  };

  // --- HANDLE SELECTION ---
  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
    setRouteInfo(null); // Reset route info until calculated
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-[#EFEDE6] overflow-hidden pt-[70px]">
      {/* ================= SIDEBAR ================= */}
      <div className="relative w-full md:w-[420px] h-full bg-[#EFEDE6] flex flex-col border-r border-[#1A1A1A]/5 z-20 shadow-xl">
        {/* HEADER SECTION */}
        <div className="px-8 pt-6 pb-4 bg-[#EFEDE6] z-10">
          <div className="mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BC4B28]/10 text-[#BC4B28] text-[10px] font-bold uppercase tracking-widest border border-[#BC4B28]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BC4B28] animate-pulse" />
              Live Locator
            </span>
          </div>

          <h1 className="text-4xl font-serif font-medium leading-none mb-4 text-[#1A1A1A]">
            Find <span className="italic text-[#BC4B28]">Disposal.</span>
          </h1>

          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search clinics, areas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/60 border border-[#1A1A1A]/10 rounded-xl py-3 pl-10 pr-4 text-sm font-sans focus:outline-none focus:border-[#BC4B28] focus:bg-white transition-all shadow-sm"
            />
            <svg
              className="w-4 h-4 absolute left-3.5 top-3.5 text-[#1A1A1A]/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                  activeCategory === cat
                    ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                    : "bg-white border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:border-[#1A1A1A]/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* RESULTS LIST */}
        <div className="flex-1 overflow-y-auto px-6 pb-8 space-y-3">
          <AnimatePresence>
            {filteredPlaces.map((place) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelectPlace(place)}
                className={`group relative bg-white rounded-2xl p-5 cursor-pointer transition-all duration-300 border ${
                  selectedPlace?.id === place.id
                    ? "border-[#BC4B28] shadow-lg scale-[1.02] ring-1 ring-[#BC4B28]/20"
                    : "border-transparent shadow-sm hover:shadow-md hover:scale-[1.01]"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-[#1A1A1A] mb-1 group-hover:text-[#BC4B28] transition-colors">
                      {place.name}
                    </h3>
                    <p className="text-xs font-sans text-[#1A1A1A]/50 mb-3">
                      {place.address}
                    </p>
                    <span className="inline-block px-2 py-0.5 rounded bg-[#F2F0E9] text-[9px] font-bold text-[#1A1A1A]/60 uppercase tracking-widest">
                      {place.type}
                    </span>
                  </div>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xl transition-colors ${
                      selectedPlace?.id === place.id
                        ? "bg-[#BC4B28] text-white"
                        : "bg-[#F2F0E9] text-[#1A1A1A]/40"
                    }`}
                  >
                    {place.type === "PHARMACY"
                      ? "💊"
                      : place.type === "HOSPITAL"
                        ? "🏥"
                        : "♻️"}
                  </div>
                </div>

                {/* --- ROUTE INFO (Distance/Time) inside the card --- */}
                {selectedPlace?.id === place.id && routeInfo && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 pt-4 border-t border-[#1A1A1A]/10"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="block text-[9px] font-bold uppercase text-[#1A1A1A]/40">
                            Distance
                          </span>
                          <span className="text-sm font-bold text-[#1A1A1A]">
                            {routeInfo.distance}
                          </span>
                        </div>
                        <div>
                          <span className="block text-[9px] font-bold uppercase text-[#1A1A1A]/40">
                            Est. Time
                          </span>
                          <span className="text-sm font-bold text-[#BC4B28]">
                            {routeInfo.duration}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* PREMIUM DIRECTION BUTTON */}
                    <button
                      className="w-full py-2.5 bg-[#1A1A1A] text-white rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#BC4B28] transition-colors flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        // The "Best" link format for Directions
                        window.open(
                          `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${place.position.lat},${place.position.lng}&travelmode=driving`,
                          "_blank",
                        );
                      }}
                    >
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      Start Navigation
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ================= MAP ================= */}
      <div className="flex-1 relative bg-[#E5E3DC]">
        <Map
          defaultCenter={DEFAULT_LOCATION}
          defaultZoom={13}
          mapId={MAP_ID}
          disableDefaultUI
          zoomControl={false}
          className="w-full h-full"
          styles={mapStyle}
        >
          {/* 1. ROUTE RENDERER */}
          {selectedPlace && (
            <Directions
              origin={userLocation}
              destination={selectedPlace.position}
              onRouteData={setRouteInfo} // Pass data back to sidebar
            />
          )}

          {/* 2. USER MARKER */}
          <AdvancedMarker position={userLocation}>
            <div className="relative flex items-center justify-center w-8 h-8">
              <div className="absolute w-full h-full bg-blue-500/30 rounded-full animate-ping" />
              <div className="relative w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-md z-10" />
            </div>
          </AdvancedMarker>

          {/* 3. PLACE MARKERS */}
          {filteredPlaces.map((p) => (
            <AdvancedMarker
              key={p.id}
              position={p.position}
              onClick={() => handleSelectPlace(p)}
              className="z-10 hover:z-50"
            >
              <Pin
                background={selectedPlace?.id === p.id ? "#BC4B28" : "#2C5F58"}
                borderColor={selectedPlace?.id === p.id ? "#8B361C" : "#1A3A35"}
                glyphColor="#fff"
                scale={selectedPlace?.id === p.id ? 1.4 : 1.1}
              />
            </AdvancedMarker>
          ))}
        </Map>

        {/* FLOATING CONTROLS */}
        <div className="absolute bottom-8 right-8 flex flex-col gap-3">
          <button
            onClick={handleLocateMe}
            className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
            title="Recenter Map"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
