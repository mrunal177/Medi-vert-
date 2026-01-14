import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- ANIMATION VARIANTS FOR BG ---
const blobVariant = {
  animate: {
    scale: [1, 1.15, 0.9, 1],
    rotate: [0, 15, -15, 0],
    x: [0, 30, -30, 0],
    y: [0, -30, 30, 0],
    transition: {
      duration: 25,
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
    },
  },
};

// --- DATA ---
const stories = [
  {
    id: 1,
    author: "Priya M.",
    role: "Home Organizer",
    date: "Dec 28, 2025",
    tag: "Experience",
    title: "How I cleared out 5 years of expired medicines",
    preview:
      "I had no idea how many unused medicines had accumulated in my cabinet until I decided to organize them. The local pharmacy accepted everything...",
    color: "#BC4B28",
  },
  {
    id: 2,
    author: "Rahul K.",
    role: "Student",
    date: "Dec 25, 2025",
    tag: "Impact",
    title: "Teaching my parents about safe disposal",
    preview:
      "Growing up, we always flushed expired medicines down the drain. When I learned about the environmental impact, I knew I had to share this with my family...",
    color: "#4A5D23",
  },
  {
    id: 3,
    author: "Sarah J.",
    role: "Volunteer",
    date: "Dec 20, 2025",
    tag: "Guide",
    title: "What happens to the pills you drop off?",
    preview:
      "Ever wondered where the medicines go? I visited a disposal facility last week and learned about the high-temperature incineration process...",
    color: "#2C5F58",
  },
];

const tips = [
  {
    id: 1,
    text: "Keep a small box near your medicine cabinet for expired medicines.",
    author: "Anjali D.",
  },
  {
    id: 2,
    text: "Check expiry dates before buying new strips to avoid waste.",
    author: "Dr. Sharma",
  },
];

// --- SUBTLE MARQUEE COMPONENT ---
const SubtleMarquee = () => {
  return (
    <div className="relative w-full overflow-hidden border-y border-[#1A1A1A]/5 py-4 bg-[#EFEDE6]/50 backdrop-blur-sm mb-12">
      <motion.div
        className="flex whitespace-nowrap gap-16"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
      >
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 opacity-40">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#1A1A1A]">
              Community Voices
            </span>
            <span className="w-1 h-1 rounded-full bg-[#BC4B28]" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#1A1A1A]">
              Shared Impact
            </span>
            <span className="w-1 h-1 rounded-full bg-[#4A5D23]" />
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#1A1A1A]">
              Safe Disposal Network
            </span>
            <span className="w-1 h-1 rounded-full bg-[#2C5F58]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// 1. Accept the onWriteClick prop here 👇
const Community = ({ onWriteClick }) => {
  const [activeTab, setActiveTab] = useState("stories");

  return (
    <section className="relative min-h-screen w-full bg-[#EFEDE6] text-[#1A1A1A] font-serif overflow-hidden pt-32">
      {/* --- BACKGROUND BLOBS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          variants={blobVariant}
          animate="animate"
          className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#BC4B28]/10 blur-[120px] rounded-full mix-blend-multiply"
        />
        <motion.div
          variants={blobVariant}
          animate="animate"
          transition={{ delay: 5 }}
          className="absolute bottom-0 left-0 w-[60vw] h-[60vw] bg-[#4A5D23]/10 blur-[120px] rounded-full mix-blend-multiply"
        />
      </div>

      {/* Texture */}
      <div className="absolute inset-0 opacity-[0.12] z-[0] pointer-events-none mix-blend-multiply fixed bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <main className="relative z-10 w-full pb-32">
        {/* --- 1. MARQUEE --- */}
        <SubtleMarquee />

        {/* --- 2. HEADER --- */}
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-medium tracking-tight text-[#1A1A1A]"
          >
            Shared{" "}
            <span className="italic text-[#BC4B28] font-light">Voices.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-xl text-[#1A1A1A]/60 max-w-2xl mx-auto font-serif italic"
          >
            Real stories from people making a tangible difference.
          </motion.p>
        </div>

        {/* --- 3. GRID LAYOUT --- */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* === LEFT: FEED === */}
          <div className="lg:col-span-8">
            {/* Soft Tabs */}
            <div className="flex gap-8 mb-12 border-b border-[#1A1A1A]/10 pb-4">
              {["stories", "tips"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs uppercase tracking-[0.2em] font-sans font-bold transition-colors relative ${
                    activeTab === tab
                      ? "text-[#BC4B28]"
                      : "text-[#1A1A1A]/40 hover:text-[#1A1A1A]"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="tabLine"
                      className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-[#BC4B28]"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="min-h-[500px]">
              <AnimatePresence mode="wait">
                {activeTab === "stories" && (
                  <motion.div
                    key="stories"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {stories.map((story, index) => (
                      <motion.div
                        key={story.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-white/40 backdrop-blur-md border border-[#1A1A1A]/5 rounded-[32px] p-8 md:p-10 hover:bg-white/70 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
                      >
                        {/* Hover Gradient */}
                        <div
                          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[32px] pointer-events-none"
                          style={{
                            background: `linear-gradient(to bottom right, ${story.color}15, transparent)`,
                          }}
                        />

                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-[#1A1A1A]/5 rounded-full text-[10px] font-bold font-sans uppercase tracking-wider text-[#1A1A1A]/60">
                              {story.tag}
                            </span>
                            <span className="text-xs font-sans text-[#1A1A1A]/40">
                              {story.date}
                            </span>
                          </div>

                          <h3 className="text-3xl font-medium mb-4 group-hover:text-[#BC4B28] transition-colors duration-300">
                            {story.title}
                          </h3>

                          <p className="text-lg font-sans text-[#1A1A1A]/60 leading-relaxed mb-8">
                            {story.preview}
                          </p>

                          <div className="flex items-center justify-between border-t border-[#1A1A1A]/5 pt-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#1A1A1A]/10 flex items-center justify-center text-xs font-serif italic text-[#1A1A1A]">
                                {story.author[0]}
                              </div>
                              <span className="text-xs font-sans font-bold text-[#1A1A1A]/60 uppercase tracking-wider">
                                {story.author}
                              </span>
                            </div>
                            <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300 text-[#BC4B28]">
                              →
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "tips" && (
                  <motion.div
                    key="tips"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {tips.map((tip) => (
                      <div
                        key={tip.id}
                        className="bg-white/40 backdrop-blur rounded-[24px] p-8 border border-[#1A1A1A]/5"
                      >
                        <p className="text-xl font-serif italic mb-6">
                          "{tip.text}"
                        </p>
                        <span className="text-xs font-sans font-bold uppercase tracking-wider opacity-40">
                          — {tip.author}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Load More */}
            <div className="mt-16 text-center">
              <button className="px-8 py-3 rounded-full border border-[#1A1A1A]/10 bg-white/30 text-xs font-sans font-bold uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-[#EFEDE6] transition-all">
                Load More Stories
              </button>
            </div>
          </div>

          {/* === RIGHT: SIDEBAR (Floating Glass) === */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
            {/* Sidebar Card 1 */}
            <div className="bg-white/30 backdrop-blur-md border border-[#1A1A1A]/5 rounded-[32px] p-8">
              <h4 className="text-xs font-sans font-bold uppercase tracking-[0.2em] opacity-40 mb-6">
                Trending Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "#SafeDisposal",
                  "#EcoFriendly",
                  "#PharmacyRun",
                  "#CleanWater",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-sans font-bold bg-[#EFEDE6] border border-[#1A1A1A]/5 px-3 py-1.5 rounded-full hover:bg-[#BC4B28] hover:text-white transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sidebar Card 2: Contributors */}
            <div className="bg-white/30 backdrop-blur-md border border-[#1A1A1A]/5 rounded-[32px] p-8">
              <h4 className="text-xs font-sans font-bold uppercase tracking-[0.2em] opacity-40 mb-6">
                Top Contributors
              </h4>
              <div className="space-y-4">
                {[
                  { name: "Dr. A. Singh", points: "1.2k" },
                  { name: "EcoWarrior_99", points: "980" },
                  { name: "Sarah J.", points: "850" },
                ].map((u, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="font-serif italic text-[#1A1A1A]/80">
                      {u.name}
                    </span>
                    <span className="text-[10px] font-sans font-bold bg-[#1A1A1A]/5 px-2 py-1 rounded">
                      {u.points}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Card 3: CTA */}
            <div className="bg-[#1A1A1A] text-[#EFEDE6] rounded-[32px] p-8 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#BC4B28] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <div className="relative z-10">
                <h4 className="text-2xl font-serif italic mb-2">
                  Have a story?
                </h4>
                <p className="text-xs font-sans opacity-60 mb-6">
                  Your experience can inspire others.
                </p>
                {/* 2. Attached onClick handler here 👇 */}
                <button
                  onClick={onWriteClick}
                  className="w-full py-3 bg-[#EFEDE6] text-[#1A1A1A] rounded-full text-[10px] font-sans font-bold uppercase tracking-[0.2em] cursor-pointer hover:bg-[#EFEDE6]/90 transition-colors"
                >
                  Share Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Community;
