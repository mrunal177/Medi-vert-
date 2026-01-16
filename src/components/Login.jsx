import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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
  const navigate = useNavigate();

  // 🔐 FIREBASE GOOGLE SIGN-IN
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      console.log("Logged in user:", result.user);

      onClose();                  // close modal
      navigate("/dashboard");     // 🔥 redirect

    } catch (error) {
      console.error("Google Sign-In error:", error);
    }
  };

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
          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* MODAL */}
          <motion.div
            className="relative w-full max-w-[400px] bg-[#EFEDE6] border border-[#1A1A1A]/10 rounded-[24px] shadow-2xl overflow-hidden"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1.5 w-full bg-gradient-to-r from-[#4A5D23] via-[#BC4B28] to-[#2C5F58]" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full hover:bg-[#1A1A1A]/5 text-[#1A1A1A]/40 hover:text-[#BC4B28]"
            >
              ✕
            </button>

            <div className="p-8 pt-10">
              {/* HEADER */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-serif text-[#1A1A1A]">
                  {isSignup ? "Join the Mission." : "Welcome Back."}
                </h2>
              </div>

              {/* FORM (still dummy) */}
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                {isSignup && (
                  <input
                    type="text"
                    placeholder="Codename"
                    className="w-full bg-white border px-4 py-3 rounded-[8px]"
                  />
                )}

                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-white border px-4 py-3 rounded-[8px]"
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-white border px-4 py-3 rounded-[8px]"
                />

                <button className="w-full py-4 bg-[#1A1A1A] text-[#EFEDE6] rounded-[8px] font-mono uppercase tracking-[0.2em]">
                  {isSignup ? "Initialize Profile" : "Authenticate"}
                </button>
              </form>

              {/* DIVIDER */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-[#1A1A1A]/10" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/40">
                  or continue with
                </span>
                <div className="flex-1 h-px bg-[#1A1A1A]/10" />
              </div>

              {/* GOOGLE BUTTON */}
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 border border-[#1A1A1A]/10 bg-white py-3 rounded-[8px] hover:shadow-md transition-all"
              >
                <img
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                <span className="text-sm font-medium">
                  Sign in with Google
                </span>
              </button>

              {/* TOGGLE */}
              <div className="mt-6 text-center text-xs">
                {isSignup ? "Already active?" : "New to the field?"}
                <button
                  onClick={() => setIsSignup(!isSignup)}
                  className="ml-2 font-bold underline"
                >
                  {isSignup ? "Login" : "Request access"}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
