import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- GRAPH PAPER BACKGROUND ---
const GraphBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-0">
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(26, 26, 26, 0.03) 1px, transparent 1px)",
        backgroundSize: "40px 100%",
      }}
    />
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(26, 26, 26, 0.03) 1px, transparent 1px)",
        backgroundSize: "100% 40px",
      }}
    />
    <div className="absolute inset-0 opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply" />
  </div>
);

// --- ANIMATION WRAPPER ---
const Reveal = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default function LearnPage() {
  return (
    <div className="bg-[#EFEDE6] text-[#1A1A1A] min-h-screen font-sans selection:bg-[#2C5F58] selection:text-white pt-32 pb-32 relative overflow-hidden">
      <GraphBackground />

      {/* --- 1. HERO SECTION (Centered) --- */}
      <Reveal>
        <section className="text-center max-w-4xl mx-auto px-6 mb-24 relative z-10">
          <h1 className="text-6xl md:text-8xl font-medium tracking-tighter text-[#1A1A1A] mb-8 leading-[0.9]">
            The{" "}
            <span className="text-[#2C5F58] italic font-serif">Invisible</span>{" "}
            Crisis.
          </h1>

          <p className="text-xl md:text-2xl font-serif text-[#1A1A1A]/70 leading-relaxed max-w-2xl mx-auto">
            When medicines leave your cabinet, they don't disappear. They begin
            a biological journey that affects water, soil, and life.
          </p>
        </section>
      </Reveal>

      {/* --- 2. ANALYSIS (Side-by-Side) --- */}
      <Reveal>
        <Section title="Analysis: Two-Fold Impact">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-6">
            {/* Left Card: Biological */}
            <div className="bg-white border border-[#1A1A1A]/10 p-8 rounded-[4px] relative shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#2C5F58]">
                  Figure A: Biological
                </h3>
                <span className="text-2xl">🧬</span>
              </div>
              <p className="text-lg font-serif leading-relaxed text-[#1A1A1A]/80">
                Pharmaceuticals are designed to be{" "}
                <strong className="text-[#2C5F58]">biologically active</strong>.
                Unlike plastic waste, they interact with living organisms even
                in microscopic amounts, altering hormones and genetics.
              </p>
            </div>

            {/* Right Card: Ecological */}
            <div className="bg-white border border-[#1A1A1A]/10 p-8 rounded-[4px] relative shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#BC4B28]">
                  Figure B: Ecological
                </h3>
                <span className="text-2xl">🐟</span>
              </div>
              <ul className="space-y-4 font-sans text-sm text-[#1A1A1A]/70">
                <li className="flex gap-3">
                  <span className="font-bold text-[#BC4B28]">•</span>
                  <span>
                    <strong>Hormonal Disruption:</strong> Affects reproductive
                    systems in aquatic life.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-[#4A5D23]">•</span>
                  <span>
                    <strong>Antibiotic Resistance:</strong> Creates "superbugs"
                    in groundwater.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-[#966F33]">•</span>
                  <span>
                    <strong>Soil Toxicity:</strong> Leaches into agriculture
                    from landfills.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Section>
      </Reveal>

      {/* --- 3. RISKS (3 Columns) --- */}
      <Reveal>
        <Section title="Improper Methods: Risk Assessment">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
            <SpecimenSlide
              label="SAMPLE A: FLUSHING"
              risk="HIGH CONTAMINATION"
              desc="Direct entry into water tables. Filters fail to catch dissolved compounds."
              code="H2O-FAIL"
            />
            <SpecimenSlide
              label="SAMPLE B: LANDFILL"
              risk="LEACHATE RISK"
              desc="Chemicals seep into soil and groundwater over decades of decomposition."
              code="SOIL-TOX"
            />
            <SpecimenSlide
              label="SAMPLE C: HOARDING"
              risk="ACCIDENTAL USE"
              desc="High probability of pediatric poisoning or geriatric confusion."
              code="HOME-HZRD"
            />
          </div>
        </Section>
      </Reveal>

      {/* --- 4. PROTOCOLS (2x2 Grid) --- */}
      <Reveal>
        <Section title="Standard Operating Procedures">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto px-6 relative z-10">
            <ProtocolCard
              id="01"
              title="Tablets & Capsules"
              detail="Do not crush. Keep in blister packs if possible. Transfer loose pills to a sealed bag before dropping off."
            />
            <ProtocolCard
              id="02"
              title="Liquid Solutions"
              detail="Ensure cap is tight. Place bottle in a leak-proof bag. Never pour down sink, even if diluted."
            />
            <ProtocolCard
              id="03"
              title="Needles & Sharps"
              detail="Requires rigid, puncture-proof container (FDA cleared). Do not mix with regular medical waste."
            />
            <ProtocolCard
              id="04"
              title="Inhalers & Aerosols"
              detail="Explosion hazard. Handle as hazardous waste. Do not puncture or incinerate at home."
            />
          </div>
        </Section>
      </Reveal>

      {/* --- 5. CONCLUSION CTA --- */}
      <Reveal>
        <section className="text-center mt-32 px-6">
          <div className="inline-block border border-[#1A1A1A]/20 p-8 rounded-[4px] bg-white relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#EFEDE6] px-4 font-mono text-xs uppercase tracking-widest text-[#1A1A1A]/40">
              Status Update
            </span>

            <h3 className="text-3xl font-serif italic mb-2">
              You have the facts.
            </h3>
            <p className="text-sm font-sans opacity-60 mb-8 max-w-md mx-auto">
              The dossier is reviewed. The next step is preventing contamination
              at the source.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link
                to="/map"
                className="px-8 py-3 bg-[#1A1A1A] text-[#EFEDE6] font-mono text-xs uppercase tracking-widest hover:bg-[#BC4B28] transition-colors"
              >
                Locate Drop-off
              </Link>
              <Link
                to="/actions"
                className="px-8 py-3 border border-[#1A1A1A] text-[#1A1A1A] font-mono text-xs uppercase tracking-widest hover:bg-[#1A1A1A]/5 transition-colors"
              >
                Join the Movement
              </Link>
            </div>
          </div>
        </section>
      </Reveal>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

// Section Wrapper
function Section({ title, children }) {
  return (
    <section className="mb-24 relative z-10">
      <div className="text-center mb-12">
        <div className="w-1 h-8 bg-[#1A1A1A]/20 mx-auto mb-4" />
        <h2 className="text-2xl md:text-4xl font-serif text-[#1A1A1A]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

// Specimen Slide
const SpecimenSlide = ({ label, risk, desc, code }) => (
  <div className="group relative h-[280px] bg-[#EFEDE6] text-[#1A1A1A] p-2 rounded-[2px] cursor-pointer hover:-translate-y-2 transition-transform duration-500 ease-out">
    <div className="h-full border border-[#1A1A1A]/10 p-6 flex flex-col justify-between relative overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow">
      <div className="flex justify-between items-center border-b border-[#1A1A1A]/10 pb-2">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
          {label}
        </span>
        <span className="font-mono text-[10px] opacity-40">{code}</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] group-hover:opacity-10 transition-opacity">
        <span className="text-9xl font-serif">!</span>
      </div>
      <div className="relative z-10 mt-auto text-center">
        <div className="bg-[#1A1A1A] text-white text-[9px] font-bold inline-block px-2 py-1 mb-4 uppercase tracking-widest">
          {risk}
        </div>
        <p className="font-serif text-lg leading-tight group-hover:text-[#BC4B28] transition-colors duration-300">
          {desc}
        </p>
      </div>
    </div>
  </div>
);

// Protocol Card
const ProtocolCard = ({ id, title, detail }) => {
  return (
    <div className="bg-white border border-[#1A1A1A]/10 p-8 hover:bg-[#F4F2ED] transition-colors duration-300 relative group overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1A1A1A] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-xs font-bold text-[#1A1A1A]/30">
          REF. {id}
        </span>
        <h3 className="text-xl font-serif">{title}</h3>
      </div>
      <p className="font-sans text-sm text-[#1A1A1A]/70 leading-relaxed pl-8 border-l border-[#1A1A1A]/10">
        {detail}
      </p>
    </div>
  );
};
