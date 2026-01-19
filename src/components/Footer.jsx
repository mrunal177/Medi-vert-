import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#101010] text-[#EFEDE6] pt-10 pb-5 font-sans relative overflow-hidden">
      {/* --- TEXTURE & DECOR --- */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#1A1A1A] via-[#EFEDE6]/20 to-[#1A1A1A]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* --- MAIN CONTENT (Compact Flex) --- */}
        <div className="flex flex-col lg:flex-row lg:justify-between items-start gap-10 mb-10">
          {/* LEFT: MISSION (Smaller Text) */}
          <div className="max-w-sm">
            <h2 className="text-3xl md:text-4xl font-serif leading-[0.9] tracking-tighter mb-3 text-[#EFEDE6]">
              Close the <br />
              <span className="text-[#4A5D23] italic font-light">Loop.</span>
            </h2>
            <p className="text-xs opacity-50 leading-relaxed font-sans font-light">
              We are building the infrastructure for a toxin-free future.
              Guardians of soil and water tables.
            </p>
          </div>

          {/* RIGHT: COMPACT GRID */}
          <div className="w-full max-w-lg flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-end">
            {/* 1. TEAM (Architects) */}
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-30 block mb-3">
                Architects
              </span>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-1 text-s font-serif opacity-80">
                <li className="hover:text-[#4A5D23] cursor-default">Mrunal</li>
                <li className="hover:text-[#4A5D23] cursor-default">Avni</li>
                <li className="hover:text-[#4A5D23] cursor-default">Sawani</li>
                <li className="hover:text-[#4A5D23] cursor-default">Mihika</li>
              </ul>
            </div>

            {/* 2. NEWSLETTER (Condensed) */}
            <div className="flex-1 w-full">
              <div className="relative group border-b border-[#EFEDE6]/20">
                <input
                  type="email"
                  placeholder="Field Updates..."
                  className="w-full bg-transparent py-2 text-sm font-serif placeholder:text-[#EFEDE6]/20 outline-none focus:border-[#BC4B28] transition-colors"
                />
                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-[9px] font-mono font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity text-[#BC4B28]">
                  ↵
                </button>
              </div>
              <div className="mt-2 text-right">
                <a
                  href="mailto:habitz19.23@gmail.com"
                  className="text-[10px] font-mono opacity-40 hover:text-[#BC4B28] transition-colors"
                >
                  contact@medivert.org
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* --- BOTTOM: SYSTEM STATUS --- */}
        <div className="border-t border-[#EFEDE6]/10 pt-4 flex justify-between items-center relative z-20">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4A5D23] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#4A5D23]"></span>
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-40">
              System Active
            </span>
          </div>

          <div className="text-right">
            <span className="font-mono text-[9px] uppercase tracking-widest opacity-20">
              © 2026 MediVert
            </span>
          </div>
        </div>

        {/* --- WATERMARK (Low Profile) --- */}
        <h1 className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-full text-center text-[12vw] font-bold text-[#EFEDE6] opacity-[0.04] pointer-events-none select-none tracking-tighter leading-none z-0">
          MEDIVERT
        </h1>
      </div>
    </footer>
  );
}
