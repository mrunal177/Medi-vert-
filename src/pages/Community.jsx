import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../auth/AuthContext"; // 1. Import Auth
import { subscribeToPosts } from "../firebase/postService"; // 2. Import Service
import CreatePost from "../components/CreatePost"; // 3. Import Modal

// --- ANIMATION VARIANTS (Keep your existing variants) ---
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

// --- STATIC DATA (Keep as fallback or initial data) ---
const initialStories = [
  {
    id: "static-1",
    author: "Priya M.",
    role: "Home Organizer",
    date: "Dec 28, 2025",
    tag: "Experience",
    title: "How I cleared out 5 years of expired medicines",
    preview: "I had no idea how many unused medicines had accumulated...",
    color: "#BC4B28",
  },
  // ... keep your other static stories if you want mixed content
];

const tips = [
  {
    id: 1,
    text: "Keep a small box near your medicine cabinet...",
    author: "Anjali D.",
  },
  {
    id: 2,
    text: "Check expiry dates before buying new strips...",
    author: "Dr. Sharma",
  },
];

// --- SUBTLE MARQUEE (Keep as is) ---
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
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Community = ({ onWriteClick }) => {
  const { user } = useAuth(); // Get current user
  const [activeTab, setActiveTab] = useState("stories");
  const [realPosts, setRealPosts] = useState([]); // State for Firebase posts
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Fetch posts from Firebase
  useEffect(() => {
    const unsubscribe = subscribeToPosts((fetchedPosts) => {
      setRealPosts(fetchedPosts);
    });
    return () => unsubscribe();
  }, []);

  // Combine Real + Static posts
  const allStories = [...realPosts, ...initialStories];

  // Logic: If logged in -> Open Post Modal. If not -> Open Login (via App.jsx)
  const handleShareClick = () => {
    if (user) {
      setIsPostModalOpen(true);
    } else {
      onWriteClick(); // This opens the Login modal from App.jsx
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#EFEDE6] text-[#1A1A1A] font-serif overflow-hidden pt-32">
      {/* Post Modal */}
      <AnimatePresence>
        {isPostModalOpen && (
          <CreatePost
            isOpen={isPostModalOpen}
            onClose={() => setIsPostModalOpen(false)}
          />
        )}
      </AnimatePresence>

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

      <div className="absolute inset-0 opacity-[0.12] z-[0] pointer-events-none mix-blend-multiply fixed bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <main className="relative z-10 w-full pb-32">
        <SubtleMarquee />

        <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-medium tracking-tight text-[#1A1A1A]"
          >
            Shared{" "}
            <span className="italic text-[#BC4B28] font-light">Voices.</span>
          </motion.h1>
          <motion.p className="mt-6 text-xl text-[#1A1A1A]/60 max-w-2xl mx-auto font-serif italic">
            Real stories from people making a tangible difference.
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* === LEFT: FEED === */}
          <div className="lg:col-span-8">
            <div className="flex gap-8 mb-12 border-b border-[#1A1A1A]/10 pb-4">
              <button
                onClick={() => setActiveTab("stories")}
                className={`text-xs uppercase tracking-[0.2em] font-sans font-bold transition-colors relative ${
                  activeTab === "stories"
                    ? "text-[#BC4B28]"
                    : "text-[#1A1A1A]/40"
                }`}
              >
                STORIES
                {activeTab === "stories" && (
                  <motion.div
                    layoutId="tabLine"
                    className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-[#BC4B28]"
                  />
                )}
              </button>
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
                    {/* MAP OVER COMBINED STORIES */}
                    {allStories.map((story, index) => (
                      <motion.div
                        key={story.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-white/40 backdrop-blur-md border border-[#1A1A1A]/5 rounded-[32px] p-8 md:p-10 hover:bg-white/70 transition-all duration-500 hover:shadow-lg"
                      >
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
                              {/* Show Avatar or Initial */}
                              <div className="w-8 h-8 rounded-full bg-[#BC4B28] text-white flex items-center justify-center text-xs font-serif italic overflow-hidden">
                                {story.authorPhoto ? (
                                  <img
                                    src={story.authorPhoto}
                                    alt=""
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  story.author[0]
                                )}
                              </div>
                              <span className="text-xs font-sans font-bold text-[#1A1A1A]/60 uppercase tracking-wider">
                                {story.author}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* === RIGHT: SIDEBAR === */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
            <div className="bg-[#1A1A1A] text-[#EFEDE6] rounded-[32px] p-8 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[#BC4B28] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <div className="relative z-10">
                <h4 className="text-2xl font-serif italic mb-2">
                  Have a story?
                </h4>
                <p className="text-xs font-sans opacity-60 mb-6">
                  Your experience can inspire others.
                </p>

                {/* UPDATED BUTTON */}
                <button
                  onClick={handleShareClick}
                  className="w-full py-3 bg-[#EFEDE6] text-[#1A1A1A] rounded-full text-[10px] font-sans font-bold uppercase tracking-[0.2em] cursor-pointer hover:bg-[#EFEDE6]/90 transition-colors"
                >
                  {user ? "Write Post" : "Login to Share"}
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
