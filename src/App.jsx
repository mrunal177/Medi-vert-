import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// --- COMPONENTS ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import Login from "./components/Login";
import ScrollToTop from "./components/ScrollToTop"; // <--- 1. IMPORT THIS

// --- PAGES ---
import SilentScene from "./components/SilentShock";
import WhatCanWeDo from "./pages/WhatCanWeDo";
import Community from "./pages/Community";
import Contribute from "./pages/contribute";
import MapPage from "./pages/MapPage";
import LearnPage from "./pages/LearnPage";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  // --- STATE FOR LOGIN POPUP ---
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-[#EFEDE6]">
      <ScrollToTop /> {/* <--- 2. PLACE IT HERE (Top of the tree) */}
      {!hideNavbar && <Navbar onLoginClick={() => setShowLogin(true)} />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <SilentScene />
              </PageTransition>
            }
          />

          <Route
            path="/actions"
            element={
              <PageTransition>
                <WhatCanWeDo onJoinClick={() => setShowLogin(true)} />
              </PageTransition>
            }
          />

          <Route
            path="/community"
            element={
              <PageTransition>
                <Community onWriteClick={() => setShowLogin(true)} />
              </PageTransition>
            }
          />

          <Route
            path="/learn"
            element={
              <PageTransition>
                <LearnPage />
              </PageTransition>
            }
          />

          <Route
            path="/contribute"
            element={
              <PageTransition>
                <Contribute onRegisterClick={() => setShowLogin(true)} />
              </PageTransition>
            }
          />

          <Route
            path="/map"
            element={
              <PageTransition>
                <MapPage />
              </PageTransition>
            }
          />

          <Route
            path="/login"
            element={
              <PageTransition>
                <div className="h-screen flex items-center justify-center font-serif text-[#1A1A1A]/50">
                  Redirecting...
                </div>
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}

export default App;
