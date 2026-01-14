import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";
import "leaflet/dist/leaflet.css";

// --- CUSTOM MARKER ICONS ---
const createCustomIcon = (color) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${color};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid #EFEDE6;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

const icons = {
  default: createCustomIcon("#4A5D23"), // Olive
  selected: createCustomIcon("#BC4B28"), // Terracotta
};

// --- MOCK DATA (With Colors & Icons) ---
const locations = [
  {
    id: 1,
    name: "City Pharmacy",
    type: "Pharmacy",
    position: [18.5204, 73.8567],
    address: "12, FC Road, Deccan Gymkhana",
    status: "Open Now",
    distance: "0.8 km",
    tag: "Verified",
    color: "#2C5F58", // Teal
    icon: "💊",
  },
  {
    id: 2,
    name: "Govt. Health Center",
    type: "Collection Center",
    position: [18.5314, 73.8446],
    address: "Shivajinagar, Near Court",
    status: "Closes 5 PM",
    distance: "2.1 km",
    tag: "Free",
    color: "#966F33", // Bronze
    icon: "🏛️",
  },
  {
    id: 3,
    name: "Eco-Bin Drop",
    type: "Community Bin",
    position: [18.5099, 73.8648],
    address: "Karve Nagar, Main Chowk",
    status: "24/7 Access",
    distance: "3.5 km",
    tag: "Self-Service",
    color: "#4A5D23", // Olive
    icon: "♻️",
  },
  {
    id: 4,
    name: "Apollo Chemist",
    type: "Pharmacy",
    position: [18.5529, 73.8031],
    address: "Baner Road, Near Highway",
    status: "Open Now",
    distance: "5.2 km",
    tag: "Verified",
    color: "#2C5F58", // Teal
    icon: "💊",
  },
];

// --- MAP CONTROLLER ---
const MapController = ({ selectedPos }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedPos) {
      map.flyTo(selectedPos, 14, { duration: 1.5 });
    }
  }, [selectedPos, map]);
  return null;
};

// --- BG VARIANTS ---
const blobVariant = {
  animate: {
    scale: [1, 1.1, 0.9, 1],
    rotate: [0, 10, -10, 0],
    transition: { duration: 20, repeat: Infinity, ease: "easeInOut" },
  },
};

const MapPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-[#EFEDE6] text-[#1A1A1A] font-serif overflow-hidden relative">
      {/* --- GLOBAL BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply" />
        <motion.div
          variants={blobVariant}
          animate="animate"
          className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-[#4A5D23] opacity-[0.1] blur-[100px] rounded-full mix-blend-multiply"
        />
        <motion.div
          variants={blobVariant}
          animate="animate"
          className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-[#BC4B28] opacity-[0.08] blur-[100px] rounded-full mix-blend-multiply"
        />
      </div>

      {/* --- SIDEBAR LIST (Left) --- */}
      <div className="relative w-full lg:w-[450px] flex-shrink-0 h-[45vh] lg:h-full flex flex-col z-20 bg-[#EFEDE6]/90 backdrop-blur-xl border-r border-[#1A1A1A]/5 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        {/* Header Section */}
        <div className="relative z-10 px-8 pt-24 pb-6 flex-shrink-0">
          <div className="mb-4">
            <div className="inline-flex items-center gap-2 border border-[#BC4B28]/20 px-3 py-1 rounded-full bg-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BC4B28] animate-pulse" />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] opacity-60 text-[#BC4B28]">
                Locator
              </span>
            </div>
          </div>

          {/* HEADING with Colors */}
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 leading-[0.9]">
            Locate{" "}
            <span className="text-[#BC4B28] italic font-serif">Safety.</span>
          </h1>

          <p className="text-sm font-serif text-[#1A1A1A]/70 mb-6 leading-relaxed max-w-xs">
            Verified locations accepting unused medicines to prevent soil &
            water contamination.
          </p>

          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search area or pin code..."
              className="w-full bg-white/60 backdrop-blur-md border border-[#1A1A1A]/10 rounded-full py-3 px-6 text-sm font-sans placeholder:text-[#1A1A1A]/40 focus:outline-none focus:border-[#BC4B28]/50 transition-colors shadow-sm"
            />
            <span className="absolute right-5 top-3 opacity-40">🔍</span>
          </div>

          {/* Filters */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {["All", "Pharmacy", "24/7", "Govt"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${
                  activeFilter === filter
                    ? "bg-[#1A1A1A] text-[#EFEDE6] border-[#1A1A1A]"
                    : "bg-transparent border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:border-[#BC4B28] hover:text-[#BC4B28]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Location List */}
        <div className="relative z-10 flex-1 overflow-y-auto px-6 pb-8 space-y-4 scrollbar-hide">
          {locations.map((loc) => (
            <motion.div
              key={loc.id}
              onClick={() => setSelectedLocation(loc)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative p-6 rounded-[12px] cursor-pointer border transition-all duration-300 group overflow-hidden ${
                selectedLocation.id === loc.id
                  ? "bg-white shadow-lg border-transparent"
                  : "bg-white/40 border-transparent hover:bg-white/80"
              }`}
            >
              {/* Colored Left Border (Dossier Style) */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 ${
                  selectedLocation.id === loc.id
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-50"
                }`}
                style={{ backgroundColor: loc.color }}
              />

              <div className="flex justify-between items-start mb-2 pl-2">
                <div>
                  <h3 className="text-lg font-serif font-medium leading-tight group-hover:text-[#1A1A1A] transition-colors">
                    {loc.name}
                  </h3>
                  <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">
                    {loc.type}
                  </span>
                </div>

                {/* Colored Icon Badge */}
                <span
                  className="w-8 h-8 flex items-center justify-center rounded-full text-sm shadow-sm"
                  style={{ backgroundColor: `${loc.color}20` }} // 20% opacity of theme color
                >
                  {loc.icon}
                </span>
              </div>

              <p className="text-sm font-sans text-[#1A1A1A]/60 mb-4 pl-2">
                {loc.address}
              </p>

              <div className="flex items-center justify-between text-xs font-sans border-t border-[#1A1A1A]/5 pt-4 pl-2">
                <div className="flex gap-4">
                  <span
                    className="font-bold flex items-center gap-2"
                    style={{ color: loc.color }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ backgroundColor: loc.color }}
                    />
                    {loc.status}
                  </span>
                  <span className="opacity-40">{loc.distance}</span>
                </div>
                <span className="opacity-40 group-hover:opacity-100 transition-opacity text-[#BC4B28] font-bold">
                  View →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- MAP FRAME (Right) --- */}
      <div className="relative flex-1 h-[55vh] lg:h-full z-0 pt-24 px-4 pb-4 lg:pt-28 lg:px-6 lg:pb-6 flex flex-col justify-center">
        <div className="w-full h-full rounded-[32px] overflow-hidden shadow-2xl border border-[#1A1A1A]/10 relative bg-[#E5E0D8]">
          <MapContainer
            center={[18.5204, 73.8567]}
            zoom={13}
            zoomControl={false}
            className="h-full w-full outline-none z-0"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              className="map-tiles"
            />

            <MapController selectedPos={selectedLocation?.position} />

            {locations.map((loc) => (
              <Marker
                key={loc.id}
                position={loc.position}
                icon={
                  selectedLocation.id === loc.id
                    ? createCustomIcon(loc.color) // Use location color
                    : icons.default
                }
                eventHandlers={{ click: () => setSelectedLocation(loc) }}
              >
                {selectedLocation.id === loc.id && (
                  <Popup
                    className="custom-popup"
                    closeButton={false}
                    offset={[0, -24]}
                  >
                    <div className="p-2 text-center min-w-[120px]">
                      <strong className="block text-sm font-serif mb-1 text-[#1A1A1A]">
                        {loc.name}
                      </strong>
                      <span
                        className="text-[10px] font-sans font-bold uppercase tracking-wider"
                        style={{ color: loc.color }}
                      >
                        {loc.status}
                      </span>
                    </div>
                  </Popup>
                )}
              </Marker>
            ))}
          </MapContainer>

          {/* Map Legend */}
          <div className="absolute top-6 left-6 z-[400] bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl border border-[#1A1A1A]/5 shadow-sm">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#4A5D23] border border-[#EFEDE6]"></span>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider opacity-60">
                  Bin
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#2C5F58] border border-[#EFEDE6]"></span>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider opacity-60">
                  Pharmacy
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#966F33] border border-[#EFEDE6]"></span>
                <span className="text-[10px] font-sans font-bold uppercase tracking-wider opacity-60">
                  Govt
                </span>
              </div>
            </div>
          </div>

          {/* Floating Action Buttons */}
          <div className="absolute bottom-6 right-6 z-[400] flex flex-col gap-3">
            <button className="w-12 h-12 bg-white/90 backdrop-blur rounded-full shadow-lg border border-[#1A1A1A]/5 flex items-center justify-center text-xl hover:scale-110 transition-transform text-[#1A1A1A]">
              📍
            </button>
            <button className="w-12 h-12 bg-[#1A1A1A] text-[#EFEDE6] rounded-full shadow-lg flex items-center justify-center text-xl hover:scale-110 transition-transform">
              +
            </button>
          </div>
        </div>
      </div>

      {/* --- CSS --- */}
      <style>{`
        .leaflet-layer {
          filter: sepia(0.3) saturate(0.6) contrast(1.1) brightness(1.05);
        }
        .leaflet-control-attribution {
          display: none;
        }
        .leaflet-popup-content-wrapper {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          border: 1px solid rgba(0,0,0,0.05);
          padding: 0;
        }
        .leaflet-popup-tip {
          background: rgba(255, 255, 255, 0.95);
        }
        .leaflet-bottom.leaflet-right {
            display: none;
        }
      `}</style>
    </div>
  );
};

export default MapPage;
