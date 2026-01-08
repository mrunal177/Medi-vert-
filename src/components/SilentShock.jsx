import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

const TypewriterMyth = ({ onComplete }) => {
  const myths = ["dissolve into nothing.", "are filtered by soil."];

  const [index, setIndex] = useState(0);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    myths[index].slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, myths[index].length, {
      type: "tween",
      duration: 1.2,
      ease: "easeInOut",
      onComplete: () => {
        setTimeout(() => {
          animate(count, 0, {
            duration: 0.8,
            onComplete: () => {
              if (index === myths.length - 1) {
                onComplete();
              } else {
                setIndex((prev) => prev + 1);
              }
            },
          });
        }, 1200);
      },
    });
    return controls.stop;
  }, [index]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-x-4 text-center">
      <span className="text-[#1A1A1A]">Discarded pills</span>
      <div className="inline-flex items-baseline min-w-[200px] justify-center md:justify-start">
        <motion.span className="text-[#5D1A1A] italic">
          {displayText}
        </motion.span>
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block w-[2px] md:w-[4px] h-[0.7em] bg-[#5D1A1A] ml-2"
        />
      </div>
    </div>
  );
};

const SilentShock = () => {
  const [step, setStep] = useState(1);
  const [activeCard, setActiveCard] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const pills = Array.from({ length: 15 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      w: Math.random() * 20 + 10,
      h: Math.random() * 60 + 25,
      color: ["#3E4F3C", "#5D1A1A", "#C05621"][Math.floor(Math.random() * 3)],
      angle: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.001,
      vx: (Math.random() - 0.5) * 0.08,
      vy: (Math.random() - 0.5) * 0.08,
      type: Math.random() > 0.5 ? "capsule" : "round",
    }));

    const drawPill = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 1;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      if (p.type === "capsule") {
        ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, p.w / 2);
        ctx.globalAlpha = 0.05;
        ctx.fill();
        ctx.globalAlpha = 0.15;
        ctx.stroke();
      } else {
        ctx.arc(0, 0, p.w, 0, Math.PI * 2);
        ctx.globalAlpha = 0.05;
        ctx.fill();
        ctx.globalAlpha = 0.15;
        ctx.stroke();
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pills.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.rotationSpeed;
        if (p.x < -100) p.x = canvas.width + 100;
        if (p.x > canvas.width + 100) p.x = -100;
        if (p.y < -100) p.y = canvas.height + 100;
        if (p.y > canvas.height + 100) p.y = -100;
        drawPill(p);
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
      val: "70%",
      label: "Water Saturation",
      color: "#3E4F3C",
      curiosity: "Medicated tap water?",
      desc: "Pharmaceutical residues detected in 70% of global aquifers. Compounds bypass filtration.",
    },
    {
      id: 1,
      val: "30%",
      label: "Resistance Rise",
      color: "#5D1A1A",
      curiosity: "Why aren't pills working?",
      desc: "Waste creates superbug breeding grounds. Environmental pollution drives resistance.",
    },
    {
      id: 2,
      val: "50+",
      label: "Species Altered",
      color: "#C05621",
      curiosity: "The end of species?",
      desc: "Over 50 aquatic species face behavioral shifts and gender collapse due to re-coded biology.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#F9F7F2] text-[#1A1A1A] font-serif overflow-hidden flex flex-col items-center justify-center">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none fixed"
      />
      <div className="absolute inset-0 z-[1] opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-multiply fixed" />

      {/* Vignette to help stats visibility */}
      <motion.div
        animate={{ opacity: step === 3 ? 1 : 0 }}
        className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-t from-[#1A1A1A]/5 via-transparent to-transparent"
      />

      <main className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center">
        {/* ACT I & II: HEADLINE SECTION */}
        <motion.div
          animate={{ y: step > 1 ? -60 : 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full text-center mb-8"
        >
          <div className="text-3xl md:text-[4.2vw] font-medium tracking-tight leading-none mb-6">
            {step === 1 ? (
              <TypewriterMyth onComplete={() => setStep(2)} />
            ) : (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Unused medicines don't disappear.
              </motion.span>
            )}
          </div>

          <AnimatePresence onExitComplete={() => setStep(3)}>
            {step >= 2 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onAnimationComplete={() => setTimeout(() => setStep(3), 800)}
                className="text-lg md:text-2xl font-light text-[#1A1A1A]/50 tracking-wide italic"
              >
                They move through water, soil, and life.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ACT III: STATS REVEAL (FORCED VISIBILITY) */}
        <div className="w-full min-h-[350px] flex items-center justify-center">
          <AnimatePresence>
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full flex flex-col md:flex-row gap-6 h-auto md:h-[320px]"
              >
                {stats.map((stat) => (
                  <motion.div
                    key={stat.id}
                    layout
                    onHoverStart={() => setActiveCard(stat.id)}
                    onHoverEnd={() => setActiveCard(null)}
                    style={{ backgroundColor: stat.color }}
                    animate={{
                      flex: activeCard === stat.id ? 2 : 1,
                      boxShadow:
                        activeCard === stat.id
                          ? "0 25px 50px -12px rgba(0,0,0,0.25)"
                          : "0 10px 15px -3px rgba(0,0,0,0.1)",
                    }}
                    className="relative rounded-[32px] overflow-hidden cursor-pointer p-8 flex flex-col justify-between transition-all duration-300"
                  >
                    <div className="z-10 flex justify-between items-start text-[#F9F7F2]/60">
                      <span className="text-[10px] font-sans font-bold tracking-[0.2em]">
                        0{stat.id + 1}
                      </span>
                      <motion.div
                        animate={{ rotate: activeCard === stat.id ? 90 : 0 }}
                      >
                        →
                      </motion.div>
                    </div>

                    <div className="z-10 text-[#F9F7F2]">
                      <motion.h3
                        layout="position"
                        className="text-5xl md:text-7xl font-light mb-2 tracking-tighter"
                      >
                        {stat.val}
                      </motion.h3>
                      <motion.p
                        layout="position"
                        className="text-sm font-medium italic opacity-90 mb-1 leading-tight"
                      >
                        {stat.curiosity}
                      </motion.p>

                      <AnimatePresence>
                        {activeCard === stat.id && (
                          <motion.p
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-[11px] md:text-xs opacity-80 border-t border-white/20 pt-4 mt-4 leading-relaxed max-w-xs"
                          >
                            {stat.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <motion.h4
                        layout="position"
                        className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-40 mt-4"
                      >
                        {stat.label}
                      </motion.h4>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ACTION LINK */}
        <AnimatePresence>
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 w-full flex justify-end px-4"
            >
              <a href="#" className="group flex items-center gap-4">
                <span className="text-[10px] md:text-xs font-sans font-bold tracking-[0.2em] uppercase opacity-60">
                  Initiate the Shift
                  <Link to="/actions">Initiate the shift</Link>
                </span>

                <div className="w-12 h-12 rounded-full border border-[#1A1A1A]/10 flex items-center justify-center group-hover:bg-[#5D1A1A] transition-all duration-500">
                  <span className="text-white opacity-0 group-hover:opacity-100 font-bold">
                    ↓
                  </span>
                </div>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent Micro Copy */}
      <AnimatePresence>
        {step === 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            className="fixed bottom-6 left-10 text-[10px] tracking-[0.2em] uppercase hidden md:block"
          >
            Compounds persist for decades.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SilentShock;
