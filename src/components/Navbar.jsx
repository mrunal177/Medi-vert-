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
  { name: "contribute", path: "/contribute" },
];

const Navbar = () => {
  const location = useLocation();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false); // Default hidden logic handles initial state

  const isHome = location.pathname === "/actions";

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();

    // LOGIC:
    // 1. If we are on Home and at the very top (< 100px), ALWAYS hide (Immersive Hero).
    // 2. If scrolling DOWN (latest > previous) and we are not at the very top, hide.
    // 3. If scrolling UP (latest < previous), show.

    if (isHome && latest < 100) {
      setVisible(false);
    } else if (latest > previous && latest > 50) {
      setVisible(false); // Scrolling Down
    } else {
      setVisible(true); // Scrolling Up
    }
  });

  return (
    <AnimatePresence>
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

              {/* Action Button */}
              <Link
                to="/start"
                className="group relative px-5 py-2 overflow-hidden rounded-full bg-[#1A1A1A] text-[#EFEDE6]"
              >
                <div className="absolute inset-0 bg-[#BC4B28] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 text-[10px] font-sans font-bold uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                  Join Now
                </span>
              </Link>
            </div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
