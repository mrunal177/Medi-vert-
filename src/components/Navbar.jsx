import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../auth/AuthContext";

const navLinks = [
  { name: "Learn", path: "/learn" },
  { name: "Map", path: "/map" },
  { name: "Community", path: "/community" },
  { name: "Contribute", path: "/contribute" },
];

const Navbar = ({ onLoginClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-[100] px-6 py-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#EFEDE6]/90 backdrop-blur-md border border-[#1A1A1A]/5 rounded-full px-6 py-3 flex justify-between items-center shadow-lg">
          
          {/* Logo */}
          <Link
            to="/"
            className="text-lg font-serif font-bold text-[#1A1A1A]"
          >
            MediVert.
          </Link>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xs font-bold uppercase tracking-[0.2em] ${
                    isActive
                      ? "text-[#BC4B28]"
                      : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right action */}
          {!user ? (
            <button
              onClick={onLoginClick}
              className="px-5 py-2 rounded-full bg-[#1A1A1A] text-[#EFEDE6] text-[10px] font-bold uppercase tracking-[0.2em]"
            >
              Join Now
            </button>
          ) : (
            <button
              onClick={handleLogout}
              title="Logout"
              className="w-9 h-9 rounded-full bg-[#1A1A1A] text-[#EFEDE6]"
            >
              👤
            </button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
