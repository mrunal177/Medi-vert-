import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const actions = [
  {
    id: "01",
    title: "Learn",
    subtitle: "Learn Safe Disposal",
    desc: "Know which medicines can be safely disposed and why improper disposal causes harm.",
    to: "/learn",
    color: "#4A5D23", // Olive Green
    label: "EDUCATION",
    pattern: "growth",
  },
  {
    id: "02",
    title: "Map",
    subtitle: "Find Drop-Off Points",
    desc: "Locate verified medicine disposal bins and authorized collection centers near you.",
    to: "/map",
    color: "#966F33", // Earthy Bronze
    label: "ACCESS",
    pattern: "topo",
  },
  {
    id: "03",
    title: "Voices",
    subtitle: "Community Stories",
    desc: "Explore blogs, experiences, and local initiatives shared by people practicing responsible disposal.",
    to: "/community",
    color: "#BC4B28", // Terracotta
    label: "COMMUNITY",
    pattern: "ripple",
  },
  {
    id: "04",
    title: "Action",
    subtitle: "Join Collection Drives",
    desc: "Participate in local disposal drives and community-led efforts to reduce waste.",
    to: "/contribute", // <--- CHANGED: Now links directly to the Contribute page
    color: "#2C5F58", // Deep Teal
    label: "PARTICIPATE",
    pattern: "wave",
  },
];

// --- 1. SVG FILTER FOR LIQUID/INK EFFECT ---
const WatercolorFilter = () => (
  <svg className="hidden">
    <defs>
      <filter id="ink-bleed">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.03"
          numOctaves="3"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="30"
          xChannelSelector="R"
          yChannelSelector="G"
        />
        <feGaussianBlur stdDeviation="2" />
      </filter>
    </defs>
  </svg>
);

// --- 2. CARD PATTERNS ---
const CardPattern = ({ type, color }) => {
  const strokeProps = {
    stroke: color,
    strokeWidth: "1.5",
    fill: "none",
    vectorEffect: "non-scaling-stroke",
    strokeLinecap: "round",
  };

  switch (type) {
    case "growth":
      return (
        <svg
          className="absolute bottom-0 right-0 w-full h-3/4 opacity-[0.08] pointer-events-none"
          viewBox="0 0 200 200"
          preserveAspectRatio="none"
        >
          <path
            d="M100,200 C100,150 150,150 150,100 C150,50 180,50 180,0"
            {...strokeProps}
          />
          <path
            d="M50,200 C50,120 10,120 10,50"
            {...strokeProps}
            opacity="0.6"
          />
        </svg>
      );
    case "topo":
      return (
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
          viewBox="0 0 200 150"
          preserveAspectRatio="none"
        >
          <path d="M0,50 Q50,20 100,50 T200,50" {...strokeProps} />
          <path d="M0,80 Q50,50 100,80 T200,80" {...strokeProps} />
        </svg>
      );
    case "ripple":
      return (
        <svg
          className="absolute -top-10 -right-10 w-3/4 h-3/4 opacity-[0.07] pointer-events-none"
          viewBox="0 0 100 100"
        >
          <circle cx="100" cy="0" r="40" {...strokeProps} />
          <circle cx="100" cy="0" r="80" {...strokeProps} />
        </svg>
      );
    case "wave":
      return (
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
          viewBox="0 0 200 100"
          preserveAspectRatio="none"
        >
          <path d="M0,100 C50,80 50,20 100,0" {...strokeProps} />
          <path d="M50,100 C100,80 100,20 150,0" {...strokeProps} />
        </svg>
      );
    default:
      return null;
  }
};

const WhatCanWeDo = ({ onJoinClick }) => {
  return (
    <section className="relative min-h-screen w-full bg-[#EFEDE6] text-[#1A1A1A] font-serif overflow-hidden flex flex-col justify-between">
      {/* Initialize the Filter */}
      <WatercolorFilter />

      {/* --- BACKGROUND: PAINT DROPS & WASHES --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Large Wash 1: Top Left (Olive) */}
        <motion.div
          animate={{ x: [0, 20, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] rounded-full opacity-[0.12] mix-blend-multiply"
          style={{ backgroundColor: "#4A5D23", filter: "url(#ink-bleed)" }}
        />

        {/* Large Wash 2: Bottom Right (Bronze) */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -right-[15%] w-[55vw] h-[55vw] rounded-full opacity-[0.12] mix-blend-multiply"
          style={{ backgroundColor: "#966F33", filter: "url(#ink-bleed)" }}
        />

        {/* Medium Splatter: Top Right (Terracotta) */}
        <motion.div
          animate={{ y: [0, 15, 0], scale: [1, 0.95, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] -right-[5%] w-[35vw] h-[35vw] rounded-full opacity-[0.1] mix-blend-multiply"
          style={{ backgroundColor: "#BC4B28", filter: "url(#ink-bleed)" }}
        />

        {/* Medium Splatter: Bottom Left (Teal) */}
        <motion.div
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[5%] -left-[5%] w-[40vw] h-[40vw] rounded-full opacity-[0.1] mix-blend-multiply"
          style={{ backgroundColor: "#2C5F58", filter: "url(#ink-bleed)" }}
        />

        {/* Small "Drops" details for texture */}
        <div
          className="absolute top-[20%] left-[15%] w-16 h-16 rounded-full bg-[#4A5D23] opacity-[0.15] mix-blend-multiply"
          style={{ filter: "url(#ink-bleed)" }}
        />
        <div
          className="absolute top-[15%] left-[18%] w-8 h-8 rounded-full bg-[#4A5D23] opacity-[0.2] mix-blend-multiply"
          style={{ filter: "url(#ink-bleed)" }}
        />

        <div
          className="absolute bottom-[30%] right-[10%] w-20 h-20 rounded-full bg-[#BC4B28] opacity-[0.15] mix-blend-multiply"
          style={{ filter: "url(#ink-bleed)" }}
        />
        <div
          className="absolute bottom-[25%] right-[15%] w-10 h-10 rounded-full bg-[#BC4B28] opacity-[0.2] mix-blend-multiply"
          style={{ filter: "url(#ink-bleed)" }}
        />

        <div
          className="absolute top-[60%] left-[5%] w-24 h-24 rounded-full bg-[#2C5F58] opacity-[0.12] mix-blend-multiply"
          style={{ filter: "url(#ink-bleed)" }}
        />
      </div>

      {/* --- TEXTURE OVERLAY (Paper Grain) --- */}
      <div
        className="absolute inset-0 opacity-[0.15] z-[1] pointer-events-none mix-blend-multiply fixed"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-48 md:pt-32">
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="inline-block py-1.5 px-4 rounded-full border border-[#1A1A1A]/10 bg-[#EFEDE6]/50 backdrop-blur-sm text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] opacity-60">
              Moving Forward
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-medium tracking-tight mb-4 text-[#1A1A1A]"
          >
            Turn awareness into agency.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl font-serif italic text-[#1A1A1A]/60"
          >
            Small actions. Real impact.
          </motion.p>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {actions.map((action, index) => {
            const isButton = action.to === null;
            const Wrapper = isButton ? "div" : Link;
            const props = isButton
              ? {
                  onClick: onJoinClick,
                  className: "h-full block cursor-pointer",
                }
              : { to: action.to, className: "h-full block" };

            return (
              <Wrapper key={action.id} {...props}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative h-full bg-[#F4F2ED]/80 backdrop-blur-sm rounded-[24px] p-8 flex flex-col justify-between shadow-sm hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 border border-[#1A1A1A]/5 overflow-hidden"
                >
                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `linear-gradient(to bottom right, ${action.color}, transparent)`,
                    }}
                  />

                  <CardPattern type={action.pattern} color={action.color} />

                  {/* Top Row */}
                  <div className="flex justify-between items-start mb-12 text-[#1A1A1A]/40 relative z-10">
                    <span className="text-xs font-sans font-bold tracking-[0.2em]">
                      {action.id}
                    </span>
                    <motion.span
                      className="text-lg transition-colors duration-300 group-hover:text-[#1A1A1A]"
                      whileHover={{ x: 4 }}
                    >
                      →
                    </motion.span>
                  </div>

                  {/* Main Content */}
                  <div className="flex-grow relative z-10">
                    <h3
                      className="text-5xl font-serif font-medium mb-3 tracking-tight"
                      style={{ color: action.color }}
                    >
                      {action.title}
                    </h3>
                    <h4 className="text-lg font-serif italic text-[#1A1A1A] mb-4">
                      {action.subtitle}
                    </h4>
                    <p className="text-sm font-sans text-[#1A1A1A]/60 leading-relaxed">
                      {action.desc}
                    </p>
                  </div>

                  {/* Footer Label */}
                  <div className="mt-12 pt-6 border-t border-[#1A1A1A]/5 relative z-10">
                    <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#1A1A1A]/40 group-hover:text-[#1A1A1A]/60 transition-colors">
                      {action.label}
                    </span>
                  </div>
                </motion.div>
              </Wrapper>
            );
          })}
        </div>

        {/* --- FOOTER CTA --- */}
        <div className="text-center relative z-20">
          <p className="text-2xl font-serif italic text-[#1A1A1A]/80 mb-8 drop-shadow-sm font-medium">
            Change doesn’t begin with everyone.
          </p>

          <button onClick={onJoinClick} className="inline-block group">
            <span className="relative z-10 inline-flex items-center gap-3 px-8 py-4 bg-[#1A1A1A] text-[#EFEDE6] rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 shadow-xl hover:shadow-2xl">
              <span className="text-xs font-sans font-bold uppercase tracking-[0.2em]">
                Start your journey
              </span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </span>
          </button>
        </div>
      </main>
    </section>
  );
};

export default WhatCanWeDo;
