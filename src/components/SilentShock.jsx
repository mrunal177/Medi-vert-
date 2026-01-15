import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  // useScroll,  <-- REMOVED
  // useMotionValueEvent, <-- REMOVED
} from "framer-motion";

// --- 1. TYPEWRITER COMPONENT ---
const TypewriterText = ({ text, onComplete, delay = 0 }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const display = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      duration: 2,
      ease: "easeInOut",
      delay: delay,
      onComplete: onComplete,
    });
    return controls.stop;
  }, []);

  return <motion.span>{display}</motion.span>;
};

// --- 2. STACKED MYTHS COMPONENT ---
const StackedMyths = ({ onComplete }) => {
  const myths = [
    "Flushing pills is harmless.",
    "Water treatment filters them.",
    "They dissolve into nothing.",
    "The soil cleans the toxins.",
    "One bottle doesn't matter.",
  ];

  const [visibleCount, setVisibleCount] = useState(0);
  const [isStruck, setIsStruck] = useState(false);

  useEffect(() => {
    const timeline = [
      { t: 500, action: () => setVisibleCount(1) },
      { t: 900, action: () => setVisibleCount(2) },
      { t: 1300, action: () => setVisibleCount(3) },
      { t: 1700, action: () => setVisibleCount(4) },
      { t: 2100, action: () => setVisibleCount(5) },
      { t: 2800, action: () => setIsStruck(true) },
      { t: 4000, action: () => onComplete() },
    ];

    const timers = timeline.map((step) => setTimeout(step.action, step.t));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-2 md:gap-3 px-4 text-center">
      {myths.map((text, i) => (
        <div key={i} className="relative w-fit mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: i < visibleCount ? 1 : 0,
              y: i < visibleCount ? 0 : 10,
            }}
            transition={{ duration: 0.4 }}
            className="text-xl md:text-3xl font-medium text-[#1A1A1A]/70 block"
          >
            {text}
          </motion.span>

          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: isStruck && i < visibleCount ? "100%" : "0%" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="absolute top-1/2 left-0 h-[2px] md:h-[3px] bg-[#BC4B28] rounded-full"
            style={{ transform: "translateY(-50%)" }}
          />
        </div>
      ))}
    </div>
  );
};

// --- 3. TRUTH HEADLINE ---
const TruthHeadline = ({ onComplete }) => {
  const [showSubhead, setShowSubhead] = useState(false);

  return (
    <div className="text-center mb-12 md:mb-24 px-4 w-full max-w-4xl">
      <h2 className="text-3xl md:text-5xl lg:text-7xl font-medium tracking-tight leading-tight mb-6 text-[#1A1A1A] break-words">
        <TypewriterText text="Unused medicines" />
        <br />
        <span className="text-[#BC4B28] italic">
          <TypewriterText
            text="don't disappear."
            delay={1.5}
            onComplete={() => setShowSubhead(true)}
          />
        </span>
      </h2>
      <AnimatePresence>
        {showSubhead && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            onAnimationComplete={() => setTimeout(onComplete, 1000)}
            className="text-lg md:text-2xl lg:text-3xl font-light text-[#1A1A1A]/60 tracking-wide italic"
          >
            They move through water, soil, and life.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- BG VARIANTS ---
const blobVariant = {
  animate: {
    scale: [1, 1.15, 0.9, 1],
    rotate: [0, 15, -15, 0],
    x: [0, 40, -40, 0],
    y: [0, -40, 40, 0],
    transition: {
      duration: 25,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

const SilentShock = () => {
  const [step, setStep] = useState(1);
  const [activeCard, setActiveCard] = useState(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  // --- NEW TRANSITION STATE ---
  const [isNavigating, setIsNavigating] = useState(false);

  const handleNextChapter = () => {
    setIsNavigating(true);
    // Wait for animation (800ms) then navigate
    setTimeout(() => {
      navigate("/actions");
    }, 800);
  };

  // --- CANVAS ANIMATION ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    const colors = ["#4A5D23", "#BC4B28", "#2C5F58", "#966F33"];
    const items = Array.from({ length: 15 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      w: Math.random() * 20 + 15,
      h: Math.random() * 50 + 30,
      color: colors[Math.floor(Math.random() * colors.length)],
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.002,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      type:
        Math.random() > 0.6
          ? "capsule"
          : Math.random() > 0.5
          ? "round"
          : "cross",
    }));

    const drawItem = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.fillStyle = p.color;
      ctx.beginPath();
      if (p.type === "capsule") {
        ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, p.w / 2);
        ctx.globalAlpha = 0.02;
        ctx.fill();
        ctx.globalAlpha = 0.15;
        ctx.stroke();
      } else if (p.type === "round") {
        ctx.arc(0, 0, p.w, 0, Math.PI * 2);
        ctx.globalAlpha = 0.02;
        ctx.fill();
        ctx.globalAlpha = 0.15;
        ctx.stroke();
      } else if (p.type === "cross") {
        const size = p.w * 0.8;
        const thickness = size / 3;
        ctx.moveTo(-thickness / 2, -size / 2);
        ctx.lineTo(thickness / 2, -size / 2);
        ctx.lineTo(thickness / 2, -thickness / 2);
        ctx.lineTo(size / 2, -thickness / 2);
        ctx.lineTo(size / 2, thickness / 2);
        ctx.lineTo(thickness / 2, thickness / 2);
        ctx.lineTo(thickness / 2, size / 2);
        ctx.lineTo(-thickness / 2, size / 2);
        ctx.lineTo(-thickness / 2, thickness / 2);
        ctx.lineTo(-size / 2, thickness / 2);
        ctx.lineTo(-size / 2, -thickness / 2);
        ctx.lineTo(-thickness / 2, -thickness / 2);
        ctx.closePath();
        ctx.globalAlpha = 0.02;
        ctx.fill();
        ctx.globalAlpha = 0.15;
        ctx.stroke();
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      items.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.rotationSpeed;
        if (p.x < -100) p.x = canvas.width + 100;
        if (p.x > canvas.width + 100) p.x = -100;
        if (p.y < -100) p.y = canvas.height + 100;
        if (p.y > canvas.height + 100) p.y = -100;
        drawItem(p);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const stats = [
    {
      id: 0,
      val: "80%",
      label: "WATER CONTAMINATION",
      color: "#4A5D23",
      headline: "Your tap water carries pharmaceutical traces",
      body: [
        "Antidepressants, antibiotics, and painkillers enter wastewater systems.",
        "Most treatment plants are not designed to remove drug compounds.",
        "These residues persist in rivers, groundwater, and drinking supplies.",
      ],
    },
    {
      id: 1,
      val: "2050",
      label: "CRITICAL MASS",
      color: "#BC4B28",
      headline: "Antibiotic resistance becomes a dominant threat",
      body: [
        "Low-level pharmaceutical pollution creates constant exposure.",
        "Bacteria adapt faster when drugs are present in the environment.",
        "This accelerates the loss of effectiveness of life-saving medicines.",
      ],
    },
    {
      id: 2,
      val: "DNA",
      label: "BIOLOGICAL COLLAPSE",
      color: "#2C5F58",
      headline: "Pharmaceuticals interfere with natural biology",
      body: [
        "Hormonal compounds disrupt endocrine systems in aquatic life.",
        "Observed effects include altered behavior and reproduction.",
        "Some species show long-term genetic and population-level changes.",
      ],
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#EFEDE6] text-[#1A1A1A] font-serif overflow-x-hidden flex flex-col items-center">
      {/* --- NEW: PAGE TRANSITION OVERLAY (Curtain Wipe) --- */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ originY: 1 }} // Grows from bottom
            className="fixed inset-0 bg-[#1A1A1A] z-[9999]"
          />
        )}
      </AnimatePresence>

      {/* BG LAYERS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          variants={blobVariant}
          animate="animate"
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#4A5D23]/10 blur-[100px] mix-blend-multiply"
        />
        <motion.div
          variants={blobVariant}
          animate="animate"
          transition={{ delay: 5 }}
          className="absolute bottom-[5%] -right-[15%] w-[65%] h-[65%] rounded-full bg-[#BC4B28]/10 blur-[100px] mix-blend-multiply"
        />
        <motion.div
          variants={blobVariant}
          animate="animate"
          transition={{ delay: 2 }}
          className="absolute -bottom-[15%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[#2C5F58]/10 blur-[100px] mix-blend-multiply"
        />
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none fixed"
      />
      <div className="absolute inset-0 opacity-[0.12] z-[1] pointer-events-none mix-blend-multiply fixed bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <main className="relative z-10 w-full max-w-7xl px-4 md:px-6 flex flex-col items-center pt-32 pb-32 min-h-screen justify-center">
        {/* STEP 1 */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="myths"
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
              className="absolute w-full px-4"
            >
              <StackedMyths onComplete={() => setStep(2)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 2 & 3 */}
        {step >= 2 && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="w-full flex flex-col items-center"
          >
            <TruthHeadline onComplete={() => setStep(3)} />

            <AnimatePresence>
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full"
                >
                  <div className="w-full text-center mb-10">
                    <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-sans font-bold text-[#1A1A1A] opacity-40">
                      The trace we ignore
                    </p>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-4 mb-20 w-full">
                    {stats.map((stat) => (
                      <motion.div
                        key={stat.id}
                        layout
                        onHoverStart={() => setActiveCard(stat.id)}
                        onHoverEnd={() => setActiveCard(null)}
                        style={{ backgroundColor: stat.color }}
                        animate={{
                          flex:
                            activeCard === stat.id && window.innerWidth >= 1024
                              ? 1.5
                              : 1,
                        }}
                        transition={{
                          layout: { duration: 0.4, ease: "easeInOut" },
                        }}
                        className="relative rounded-[20px] overflow-hidden cursor-pointer p-6 md:p-8 flex flex-col justify-between shadow-xl min-h-[350px] lg:min-h-[450px]"
                      >
                        <div className="absolute inset-0 opacity-[0.1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply pointer-events-none" />
                        <div className="z-10 flex justify-between items-start text-[#F9F7F2]/60 mb-2">
                          <span className="text-xs font-sans font-bold tracking-[0.2em]">
                            0{stat.id + 1}
                          </span>
                          <motion.div
                            animate={{
                              rotate: activeCard === stat.id ? 90 : 0,
                            }}
                            className="text-lg"
                          >
                            →
                          </motion.div>
                        </div>
                        <div className="z-10 text-[#F9F7F2] flex flex-col h-full">
                          <motion.h3
                            layout="position"
                            className="text-5xl md:text-6xl lg:text-8xl font-light leading-none tracking-tighter mb-4"
                          >
                            {stat.val}
                          </motion.h3>
                          <motion.h4
                            layout="position"
                            className="text-lg md:text-xl lg:text-2xl font-medium italic opacity-100 leading-tight mb-2"
                          >
                            {stat.headline}
                          </motion.h4>
                          <div className="overflow-hidden mt-auto">
                            <AnimatePresence>
                              {activeCard === stat.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{
                                    duration: 0.4,
                                    ease: "circOut",
                                  }}
                                >
                                  <div className="flex flex-col gap-3 pt-6 border-t border-white/20 mt-4">
                                    {stat.body.map((line, i) => (
                                      <motion.p
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="text-sm md:text-base font-sans font-light opacity-80 leading-snug max-w-[95%]"
                                      >
                                        {line}
                                      </motion.p>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                        <motion.h4
                          layout="position"
                          className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 mt-8 text-[#F9F7F2]"
                        >
                          {stat.label}
                        </motion.h4>
                      </motion.div>
                    ))}
                  </div>

                  {/* --- NEW EXPLICIT TRANSITION AREA --- */}
                  <div className="relative w-full flex flex-col items-center pt-12 pb-32">
                    {/* Connector Line */}
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: 80 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      className="w-[1px] bg-[#1A1A1A]/20 mb-8"
                    />

                    {/* CLICKABLE CTA BUTTON */}
                    <motion.button
                      onClick={handleNextChapter}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative px-8 py-4 bg-[#1A1A1A] text-[#EFEDE6] rounded-full overflow-hidden shadow-2xl"
                    >
                      <div className="absolute inset-0 bg-[#BC4B28] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      <span className="relative z-10 font-mono text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3">
                        Break the Cycle <span className="text-lg">→</span>
                      </span>
                    </motion.button>

                    <p className="mt-6 text-sm italic font-serif text-[#1A1A1A]/50">
                      This is not irreversible.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default SilentShock;
