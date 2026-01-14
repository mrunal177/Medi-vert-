import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- ANIMATION VARIANTS ---
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.2 } },
};

export default function Login({ isOpen, onClose }) {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* 1. BACKDROP (Blur & Darken) */}
          <div
            className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-md transition-all"
            onClick={onClose}
          />

          {/* 2. MODAL CARD */}
          <motion.div
            className="relative w-full max-w-[400px] bg-[#EFEDE6] border border-[#1A1A1A]/10 rounded-[24px] shadow-2xl overflow-hidden"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Color Bar (Security Stripe) */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#4A5D23] via-[#BC4B28] to-[#2C5F58]" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1A1A1A]/5 text-[#1A1A1A]/40 hover:text-[#BC4B28] transition-all font-sans font-bold"
            >
              ✕
            </button>

            <div className="p-8 pt-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 border border-[#1A1A1A]/10 px-3 py-1 rounded-full mb-4 bg-white/50">
                  <span
                    className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                      isSignup ? "bg-[#4A5D23]" : "bg-[#BC4B28]"
                    }`}
                  />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/60">
                    {isSignup ? "Registration Protocol" : "Access Control"}
                  </span>
                </div>
                <h2 className="text-3xl font-serif text-[#1A1A1A] mb-1">
                  {isSignup ? "Join the Mission." : "Welcome Back."}
                </h2>
                <p className="text-xs font-sans text-[#1A1A1A]/50">
                  {isSignup
                    ? "Create your volunteer dossier."
                    : "Enter credentials to proceed."}
                </p>
              </div>

              {/* Form */}
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {isSignup && (
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider opacity-40">
                      Codename
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. EcoAgent_01"
                      className="w-full bg-white border border-[#1A1A1A]/10 px-4 py-3 rounded-[8px] outline-none focus:border-[#4A5D23] focus:shadow-[0_0_0_2px_rgba(74,93,35,0.1)] transition-all font-sans text-sm text-[#1A1A1A]"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-bold uppercase tracking-wider opacity-40">
                    Identity (Email)
                  </label>
                  <input
                    type="email"
                    placeholder="agent@medivert.com"
                    className="w-full bg-white border border-[#1A1A1A]/10 px-4 py-3 rounded-[8px] outline-none focus:border-[#4A5D23] focus:shadow-[0_0_0_2px_rgba(74,93,35,0.1)] transition-all font-sans text-sm text-[#1A1A1A]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-[10px] font-mono font-bold uppercase tracking-wider opacity-40">
                      Passcode
                    </label>
                    {!isSignup && (
                      <a
                        href="#"
                        className="text-[10px] text-[#BC4B28] hover:underline opacity-80"
                      >
                        Reset?
                      </a>
                    )}
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white border border-[#1A1A1A]/10 px-4 py-3 rounded-[8px] outline-none focus:border-[#4A5D23] focus:shadow-[0_0_0_2px_rgba(74,93,35,0.1)] transition-all font-sans text-sm text-[#1A1A1A]"
                  />
                </div>

                <button className="w-full py-4 bg-[#1A1A1A] text-[#EFEDE6] rounded-[8px] font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#BC4B28] transition-colors shadow-lg mt-6 group flex items-center justify-center gap-2">
                  <span>
                    {isSignup ? "Initialize Profile" : "Authenticate"}
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>
              </form>

              {/* Footer Toggle */}
              <div className="mt-8 pt-6 border-t border-[#1A1A1A]/5 text-center">
                <p className="text-xs font-sans text-[#1A1A1A]/60">
                  {isSignup ? "Already active?" : "New to the field?"}
                  <button
                    onClick={() => setIsSignup(!isSignup)}
                    className="ml-2 font-bold text-[#1A1A1A] underline decoration-[#BC4B28]/30 underline-offset-4 hover:decoration-[#BC4B28] hover:text-[#BC4B28] transition-all"
                  >
                    {isSignup ? "Login here" : "Request access"}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
``;
