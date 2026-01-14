import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#EFEDE6] pt-24 pb-12 font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4A5D23] via-[#BC4B28] to-[#2C5F58] opacity-50" />
      <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] bg-[#4A5D23]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-[#EFEDE6]/10 pb-16 mb-12">
          {/* Column 1: Brand */}
          <div className="md:col-span-5">
            <h2 className="text-3xl font-serif font-bold tracking-tight mb-6">
              MediVert.
            </h2>
            <p className="text-sm opacity-60 leading-relaxed max-w-sm font-serif italic">
              Mobilizing communities to safely dispose of pharmaceutical waste.
              Protecting soil, water, and future generations through collective
              action.
            </p>

            <div className="mt-8 flex gap-4">
              {/* Social Placeholders */}
              <div className="w-10 h-10 rounded-full border border-[#EFEDE6]/20 flex items-center justify-center hover:bg-[#EFEDE6] hover:text-[#1A1A1A] transition-colors cursor-pointer">
                𝕏
              </div>
              <div className="w-10 h-10 rounded-full border border-[#EFEDE6]/20 flex items-center justify-center hover:bg-[#EFEDE6] hover:text-[#1A1A1A] transition-colors cursor-pointer">
                Ig
              </div>
              <div className="w-10 h-10 rounded-full border border-[#EFEDE6]/20 flex items-center justify-center hover:bg-[#EFEDE6] hover:text-[#1A1A1A] transition-colors cursor-pointer">
                In
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] opacity-40 mb-8">
              Operations
            </h3>
            <ul className="space-y-4 text-sm font-sans opacity-80">
              <li>
                <Link
                  to="/map"
                  className="hover:text-[#BC4B28] transition-colors"
                >
                  Locator Map
                </Link>
              </li>
              <li>
                <Link
                  to="/actions"
                  className="hover:text-[#BC4B28] transition-colors"
                >
                  Missions
                </Link>
              </li>
              <li>
                <Link
                  to="/community"
                  className="hover:text-[#BC4B28] transition-colors"
                >
                  Community Logs
                </Link>
              </li>
              <li>
                <Link
                  to="/learn"
                  className="hover:text-[#BC4B28] transition-colors"
                >
                  Education Dossier
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal / Contact */}
          <div className="md:col-span-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] opacity-40 mb-8">
              Secure Channel
            </h3>
            <p className="text-sm opacity-60 mb-2">General Inquiries:</p>
            <a
              href="mailto:contact@medivert.org"
              className="text-xl font-serif hover:text-[#4A5D23] transition-colors block mb-8"
            >
              contact@medivert.org
            </a>

            <div className="flex gap-4 text-xs opacity-40 font-mono">
              <a href="#" className="hover:opacity-100">
                Privacy Protocol
              </a>
              <span>/</span>
              <a href="#" className="hover:opacity-100">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center opacity-40 text-[10px] font-mono uppercase tracking-widest">
          <span>© 2026 MediVert Initiative. All systems operational.</span>
          <span className="mt-2 md:mt-0">Designed for Earth.</span>
        </div>
      </div>
    </footer>
  );
}
