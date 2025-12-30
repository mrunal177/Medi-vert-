// src/scenes/SilentShock.jsx
import { useEffect, useState } from "react";

const SilentShock = () => {
  const [typedText, setTypedText] = useState("");
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);

  useEffect(() => {
    let index = 0;
    const fullText = "Unused medicines don't disappear."; // FIXED: "Unused" not "Uused"

    const typingInterval = setInterval(() => {
      setTypedText((prev) => prev + fullText[index]);
      index++;

      if (index === fullText.length) {
        clearInterval(typingInterval);
        // Wait 2s, then show second line
        setTimeout(() => setShowSecondLine(true), 2000);
        // Wait another 2s, then show scroll hint
        setTimeout(() => setShowScrollHint(true), 4000);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#F5F1E9] via-[#E8DFCA] to-[#D8C9B4] px-6 relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-10"></div>

      {/* LARGE organic blobs - SLOWER */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Extra large blob 1 */}
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-[#D7CCC8]/15 to-[#BCAAA4]/5 rounded-full blur-3xl animate-pulse-very-slow"></div>

        {/* Extra large blob 2 */}
        <div className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-gradient-to-tr from-[#A1887F]/10 to-[#8D6E63]/5 rounded-full blur-3xl animate-pulse-very-slow animation-delay-2000"></div>

        {/* Medium blob 3 */}
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-gradient-to-bl from-[#8D6E63]/8 to-[#5D4037]/3 rounded-full blur-3xl animate-pulse-very-slow animation-delay-4000"></div>

        {/* Water droplet shapes - larger */}
        <div className="absolute top-1/3 right-1/4 w-10 h-14 bg-gradient-to-b from-[#4FC3F7]/15 to-[#0288D1]/8 rounded-full animate-float-very-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-8 h-12 bg-gradient-to-b from-[#4FC3F7]/15 to-[#0288D1]/8 rounded-full animate-float-very-slow animation-delay-1500"></div>

        {/* Larger decorative dots */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-[#8D6E63]/15 animate-float-very-slow"
            style={{
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 90}%`,
              animationDelay: `${i * 500}ms`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Chemical formula background - larger */}
      <div className="absolute inset-0 opacity-8 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute font-mono text-[#5D4037]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              opacity: Math.random() * 0.2 + 0.1,
              fontSize: `${14 + Math.random() * 10}px`,
              animation: `float-very-slow ${
                15 + Math.random() * 10
              }s infinite alternate ease-in-out`,
              animationDelay: `${i * 1000}ms`,
            }}
          >
            {["H₂O", "C₁₇H₁₉N₃O₅S", "NaCl", "C₉H₈O₄"][i % 4]}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-semibold text-[#5D4037] mb-8">
          {typedText}
          {typedText.length < "Unused medicines don't disappear.".length && (
            <span className="ml-1 animate-pulse text-[#8D6E63]">|</span>
          )}
        </h1>

        {showSecondLine && (
          <p className="mt-6 text-2xl md:text-3xl text-[#6D4C41] transition-opacity duration-700">
            They leak. They pollute. They harm.
          </p>
        )}
      </div>

      {/* Scroll hint */}
      {showScrollHint && (
        <div className="absolute bottom-10 z-10 animate-fadeIn">
          <div className="text-[#558B2F] text-sm mb-2 tracking-wider font-medium">
            SCROLL TO CONTINUE
          </div>
          <div className="w-6 h-10 mx-auto border border-[#8BC34A] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#689F38] rounded-full mt-2 animate-bounce-slow"></div>
          </div>
        </div>
      )}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F5F1E9] to-transparent pointer-events-none"></div>
    </section>
  );
};

export default SilentShock;
