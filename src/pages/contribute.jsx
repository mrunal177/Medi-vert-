import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// --- BACKGROUND: TOPOGRAPHIC LINES ---
const TopoBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    {/* SVG Topo Pattern */}
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.03]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <pattern
        id="topo-pattern"
        x="0"
        y="0"
        width="100"
        height="100"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M0 100 C 20 0 50 0 100 100 Z"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="1"
        />
        <path
          d="M0 50 C 40 10 60 90 100 50"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="0.5"
        />
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#topo-pattern)" />
    </svg>

    {/* Noise Texture */}
    <div className="absolute inset-0 opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply" />

    {/* Soft Gradient Patches */}
    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#4A5D23]/5 blur-[120px] rounded-full mix-blend-multiply" />
    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#BC4B28]/5 blur-[120px] rounded-full mix-blend-multiply" />
  </div>
);

// --- ANIMATION WRAPPER ---
const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function WhatCanWeDo() {
  return (
    <div className="bg-[#EFEDE6] text-[#1A1A1A] min-h-screen font-sans selection:bg-[#4A5D23] selection:text-white pt-32 pb-32 relative overflow-hidden">
      <TopoBackground />

      {/* ================= HEADER ================= */}
      <Reveal>
        <section className="max-w-7xl mx-auto px-6 mb-24 text-center relative z-10">
          {/* Removed Field Operations Badge Here */}

          <h1 className="text-6xl md:text-8xl font-medium tracking-tighter text-[#1A1A1A] mb-8 leading-[0.9]">
            Mobilize{" "}
            <span className="text-[#4A5D23] italic font-serif">Action.</span>
          </h1>

          <p className="text-xl md:text-2xl font-serif text-[#1A1A1A]/70 leading-relaxed max-w-2xl mx-auto">
            Every action counts. Choose your role in the ecosystem—no pressure,
            just purpose.
          </p>
        </section>
      </Reveal>

      {/* ================= ACTION CARDS (Mission Directives) ================= */}
      <Reveal>
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 relative z-10">
          <ActionCard
            icon="📣"
            title="Awareness Drives"
            desc="Participate in community events and help spread the word about safe medicine disposal."
            link="View Schedule"
            color="#4A5D23" // Olive
            tag="PUBLIC OUTREACH"
          />

          <ActionCard
            icon="📍"
            title="Map Contributor"
            desc="Know a pharmacy or bin that accepts unused medicines? Add it to our verified map."
            link="Add Location"
            color="#BC4B28" // Terracotta
            tag="DATA ENTRY"
          />

          <ActionCard
            icon="🤝"
            title="Volunteer Corps"
            desc="Join our growing network of volunteers helping communities understand safe disposal."
            link="Apply Now"
            color="#2C5F58" // Teal
            tag="RECRUITING"
            isComingSoon={true}
          />
        </section>
      </Reveal>

      {/* ================= EVENTS SCHEDULE (Clipboard Style) ================= */}
      <Reveal>
        <section
          id="events"
          className="max-w-5xl mx-auto px-6 mb-32 relative z-10"
        >
          <div className="flex items-end justify-between mb-12 border-b border-[#1A1A1A]/20 pb-4">
            <h2 className="text-3xl md:text-5xl font-serif text-[#1A1A1A]">
              Upcoming Deployments
            </h2>
            <span className="font-mono text-xs uppercase tracking-widest opacity-40 hidden md:block">
              JANUARY 2026 ROSTER
            </span>
          </div>

          <div className="space-y-4">
            <EventRow
              day="15"
              month="JAN"
              title="Medicine Collection Drive"
              loc="Springfield Community Center"
              time="10:00 AM – 4:00 PM"
              spots="12"
              color="#4A5D23"
            />
            <EventRow
              day="20"
              month="JAN"
              title="Safe Disposal Workshop"
              loc="Online (Zoom Webinar)"
              time="6:00 PM – 7:30 PM"
              spots="45"
              color="#BC4B28"
            />
            <EventRow
              day="28"
              month="JAN"
              title="River Cleanup & Audit"
              loc="Mula-Mutha Riverside"
              time="07:00 AM – 11:00 AM"
              spots="Full"
              color="#2C5F58"
              isFull={true}
            />
          </div>
        </section>
      </Reveal>

      {/* ================= NEWSLETTER (Clean Band) ================= */}
      <Reveal>
        <section className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-[#1A1A1A] rounded-[4px] p-12 md:p-20 text-center relative overflow-hidden group">
            {/* Hover Effect */}
            <div className="absolute inset-0 bg-[#4A5D23]/20 scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom" />

            <div className="relative z-10">
              <span className="font-mono text-xs text-[#EFEDE6]/40 uppercase tracking-[0.3em] mb-6 block">
                Dispatch
              </span>
              <h3 className="text-3xl md:text-5xl font-serif text-[#EFEDE6] mb-6">
                Never miss a mission.
              </h3>
              <p className="text-[#EFEDE6]/60 mb-10 max-w-md mx-auto font-sans leading-relaxed">
                Get notified about new events, collection drives, and ways to
                contribute in your area.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="agent@email.com"
                  className="px-6 py-4 bg-[#EFEDE6]/10 border border-[#EFEDE6]/20 text-[#EFEDE6] placeholder:text-[#EFEDE6]/20 outline-none focus:border-[#4A5D23] transition-colors w-full font-serif"
                />
                <button className="px-8 py-4 bg-[#EFEDE6] text-[#1A1A1A] font-mono text-xs uppercase tracking-widest hover:bg-[#4A5D23] hover:text-white transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

// --- SUB-COMPONENTS ---

const ActionCard = ({ icon, title, desc, link, color, tag, isComingSoon }) => (
  <div className="group relative bg-white border border-[#1A1A1A]/5 p-8 flex flex-col justify-between min-h-[320px] hover:border-[#1A1A1A]/20 transition-all duration-300">
    {/* Top Accent Line */}
    <div
      className="absolute top-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
      style={{ backgroundColor: color }}
    />

    <div>
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#EFEDE6] text-2xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-40 border border-[#1A1A1A]/10 px-2 py-1">
          {tag}
        </span>
      </div>

      <h3 className="text-2xl font-serif mb-4 group-hover:text-[#1A1A1A] transition-colors">
        {title}
      </h3>
      <p className="text-[#1A1A1A]/60 font-sans leading-relaxed text-sm">
        {desc}
      </p>
    </div>

    <div className="mt-8 pt-6 border-t border-[#1A1A1A]/5 flex justify-between items-center">
      {isComingSoon ? (
        <span className="font-mono text-xs text-[#1A1A1A]/30 uppercase tracking-widest cursor-not-allowed">
          Coming Soon
        </span>
      ) : (
        <Link
          to="#"
          className="font-mono text-xs font-bold uppercase tracking-widest hover:underline decoration-1 underline-offset-4"
          style={{ color: color }}
        >
          {link} →
        </Link>
      )}
    </div>
  </div>
);

const EventRow = ({ day, month, title, loc, time, spots, color, isFull }) => (
  <div className="group flex flex-col md:flex-row md:items-center justify-between bg-white border border-[#1A1A1A]/5 p-6 hover:border-[#1A1A1A]/20 transition-all duration-300">
    <div className="flex items-start gap-6">
      {/* Date Box */}
      <div className="w-16 h-16 flex flex-col items-center justify-center border border-[#1A1A1A]/10 bg-[#EFEDE6]/30">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-60">
          {month}
        </span>
        <span className="text-2xl font-serif font-bold text-[#1A1A1A]">
          {day}
        </span>
      </div>

      <div>
        <h3 className="text-xl font-serif mb-1 group-hover:text-[#1A1A1A] transition-colors">
          {title}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-sans text-[#1A1A1A]/50">
          <span className="flex items-center gap-1">📍 {loc}</span>
          <span className="flex items-center gap-1">🕒 {time}</span>
        </div>
      </div>
    </div>

    <div className="flex items-center gap-6 mt-6 md:mt-0 pl-22 md:pl-0">
      {!isFull && (
        <span className="hidden md:block font-mono text-[10px] uppercase tracking-widest text-[#1A1A1A]/40">
          {spots} spots left
        </span>
      )}

      <button
        disabled={isFull}
        className={`px-6 py-2 font-mono text-xs uppercase tracking-widest border transition-all
                    ${
                      isFull
                        ? "bg-[#EFEDE6] text-[#1A1A1A]/20 border-transparent cursor-not-allowed"
                        : "bg-transparent border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
                    }`}
      >
        {isFull ? "Capacity Full" : "Register"}
      </button>
    </div>
  </div>
);
