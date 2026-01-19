import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../auth/AuthContext";

const navLinks = [
  { name: "Learn", path: "/learn" },
  { name: "Map", path: "/map" },
  { name: "Community", path: "/community" },
  { name: "Contribute", path: "/contribute" },
];

const Navbar = ({ onLoginClick }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // New state to track if image fails to load
  const [imgError, setImgError] = useState(false);

  // Scroll Logic
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    setIsScrolled(latest > 10);

    // Always show on Map page
    if (location.pathname.includes("/map")) {
      setVisible(true);
      return;
    }

    if (latest < 50) {
      setVisible(true);
    } else if (latest > previous && latest > 50) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`sticky top-0 left-0 right-0 z-[100] w-full px-6 py-4 transition-all duration-300 ${
            isScrolled || location.pathname.includes("/map")
              ? "bg-[#EFEDE6]/80 backdrop-blur-xl border-b border-white/20 shadow-sm"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* --- LOGO --- */}
            <Link
              to="/"
              className="text-2xl font-serif font-bold tracking-tighter text-[#1A1A1A] hover:text-[#BC4B28] transition-colors"
            >
              MediVert<span className="text-[#BC4B28]">.</span>
            </Link>

            {/* --- DESKTOP NAVIGATION --- */}
            <div className="hidden md:flex items-center gap-8 bg-white/40 backdrop-blur-md px-8 py-2.5 rounded-full border border-white/50 shadow-sm">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="relative group"
                  >
                    <span
                      className={`
                      text-xs font-sans font-bold uppercase tracking-[0.15em] transition-colors duration-200
                      ${isActive ? "text-[#BC4B28]" : "text-[#1A1A1A]/70 group-hover:text-[#1A1A1A]"}
                    `}
                    >
                      {link.name}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="navDot"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#BC4B28] rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* --- AUTH SECTION --- */}
            <div className="flex items-center gap-4">
              {!user ? (
                /* STATE A: LOGGED OUT */
                <button
                  onClick={onLoginClick}
                  className="group relative overflow-hidden rounded-full bg-[#1A1A1A] px-6 py-2.5 shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <div className="absolute inset-0 bg-[#BC4B28] translate-y-[102%] transition-transform duration-300 ease-out group-hover:translate-y-0" />
                  <span className="relative text-xs font-bold uppercase tracking-[0.2em] text-[#EFEDE6] group-hover:text-white">
                    Join Now
                  </span>
                </button>
              ) : (
                /* STATE B: LOGGED IN */
                <div className="flex items-center gap-3">
                  {/* User Pill */}
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 pl-1.5 pr-4 py-1.5 rounded-full bg-white/60 border border-white/50 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 group"
                  >
                    {/* Avatar Circle */}
                    <div className="w-9 h-9 rounded-full bg-[#BC4B28] text-white flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform overflow-hidden relative">
                      {/* LOGIC: Show Image ONLY if URL exists AND no error. Otherwise show Icon. */}
                      {user.photoURL && !imgError ? (
                        <img
                          src={user.photoURL}
                          alt="User"
                          className="w-full h-full object-cover"
                          onError={() => setImgError(true)} // <-- This fixes the broken icon!
                        />
                      ) : (
                        // Fallback Icon
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 opacity-90"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>

                    {/* "Hello, Name" */}
                    <div className="flex flex-col items-start justify-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/40 leading-none mb-0.5">
                        Hello,
                      </span>
                      <span className="text-sm font-serif font-bold text-[#1A1A1A] leading-none group-hover:text-[#BC4B28] transition-colors max-w-[100px] truncate">
                        {user.displayName?.split(" ")[0] || "User"}
                      </span>
                    </div>
                  </Link>

                  {/* Logout Icon */}
                  <button
                    onClick={handleLogout}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/40 hover:bg-red-50 text-[#1A1A1A]/40 hover:text-red-500 transition-colors"
                    title="Sign Out"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
