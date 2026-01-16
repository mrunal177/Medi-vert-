import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// --- COMPONENTS ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import Login from "./components/Login";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute"; // <--- 1. ENSURE IMPORT

// --- PAGES ---
import SilentScene from "./components/SilentShock";
import WhatCanWeDo from "./pages/WhatCanWeDo";
import Community from "./pages/Community";
import Contribute from "./pages/contribute";
import MapPage from "./pages/MapPage";
import LearnPage from "./pages/LearnPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const location = useLocation();

  // FIX 1: Only hide Navbar on the landing page (SilentScene)
  // Removed "/dashboard" from here so Navbar shows up now!
  const hideNavbar = location.pathname === "/";

  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-[#EFEDE6]">
      <ScrollToTop />

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

          {/* FIX 2: DASHBOARD ROUTE IS NOW PROTECTED */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <PageTransition>
                  <Dashboard />
                </PageTransition>
              </ProtectedRoute>
            }
          />
        </Routes>
      </AnimatePresence>

      {/* Hide Footer on Dashboard if you want a cleaner look, otherwise keep it */}
      {location.pathname !== "/dashboard" && <Footer />}

      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
}

export default App;