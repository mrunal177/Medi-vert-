import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

const navLinks = [
  { name: "Learn", path: "/learn" },
  { name: "Map", path: "/map" },
  { name: "Community", path: "/community" },
  { name: "Contribute", path: "/contribute" },
];

const Navbar = ({ onLoginClick }) => {
  const location = useLocation();
  const { scrollY } = useScroll();

  // FIX 1: Default to TRUE so it's visible immediately on load (except on Home)
  const isHome = location.pathname === "/actions";
  const [visible, setVisible] = useState(!isHome);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    // FIX 2: STRICT LOGIC SEPARATION

    // 1. Are we at the very top of the page? (0-50px)
    if (latest < 50) {
      if (isHome) {
        setVisible(false); // Hide on Home (Hero Section)
      } else {
        setVisible(true); // Always Show on other pages
      }
      return; // Stop here, don't run the scroll direction logic
    }

    // 2. Are we scrolling DOWN?
    if (latest > previous) {
      setVisible(false);
    }
    // 3. Are we scrolling UP?
    else {
      setVisible(true);
    }
  });

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-[100] px-6 py-4"
        >
          <div className="max-w-7xl mx-auto">
            {/* Glass Container */}
            <div className="bg-[#EFEDE6]/90 backdrop-blur-md border border-[#1A1A1A]/5 rounded-full px-6 py-3 flex justify-between items-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              {/* Logo */}
              <Link
                to="/actions"
                className="text-lg font-serif font-bold tracking-tight text-[#1A1A1A] hover:text-[#BC4B28] transition-colors"
              >
                MediVert.
              </Link>

              {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="relative text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors"
                    >
                      {link.name}
                      {/* Active Dot Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="navDot"
                          className="absolute -bottom-2 left-0 right-0 h-1 bg-[#BC4B28] rounded-full"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Action Button (Connected to Login Modal) */}
              <button
                onClick={onLoginClick}
                className="group relative px-5 py-2 overflow-hidden rounded-full bg-[#1A1A1A] text-[#EFEDE6] cursor-pointer"
              >
                <div className="absolute inset-0 bg-[#BC4B28] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 text-[10px] font-sans font-bold uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                  Join Now
                </span>
              </button>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
