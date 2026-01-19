import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../auth/AuthContext";
import { subscribeToPosts, updatePost } from "../firebase/postService"; // Added updatePost
import CreatePost from "../components/CreatePost";

// --- ANIMATION VARIANTS ---
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

// ==========================================
// 💡 NEW: STORY CARD COMPONENT
// Handles "Read More" and "Editing" logic
// ==========================================
const StoryCard = ({ story, user, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Edit State
  const [editTitle, setEditTitle] = useState(story.title);
  const [editContent, setEditContent] = useState(story.preview);
  const [isSaving, setIsSaving] = useState(false);

  // Check if current user is the author
  const isAuthor = user?.uid && story.uid === user.uid;

  // Truncation Logic
  const TRUNCATE_LENGTH = 180;
  const isLongText = story.preview.length > TRUNCATE_LENGTH;
  const displayedText =
    isExpanded || !isLongText
      ? story.preview
      : story.preview.slice(0, TRUNCATE_LENGTH) + "...";

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updatePost(story.id, {
        title: editTitle,
        preview: editContent,
      });
      setIsEditing(false);
    } catch (error) {
      alert("Failed to update story.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white/40 backdrop-blur-md border border-[#1A1A1A]/5 rounded-[32px] p-8 md:p-10 hover:bg-white/70 transition-all duration-500 hover:shadow-lg"
    >
      {/* BACKGROUND GRADIENT */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-[32px] pointer-events-none"
        style={{
          background: `linear-gradient(to bottom right, ${story.color || "#BC4B28"}15, transparent)`,
        }}
      />

      <div className="relative z-10">
        {/* HEADER: Tags & Date */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-[#1A1A1A]/5 rounded-full text-[10px] font-bold font-sans uppercase tracking-wider text-[#1A1A1A]/60">
              {story.tag || "Story"}
            </span>
            <span className="text-xs font-sans text-[#1A1A1A]/40">
              {story.date}
            </span>
          </div>

          {/* EDIT BUTTON (Only for Author) */}
          {isAuthor && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/30 hover:text-[#BC4B28] transition-colors"
            >
              Edit
            </button>
          )}
        </div>

        {/* --- CONTENT AREA --- */}
        {isEditing ? (
          /* EDIT MODE */
          <div className="space-y-4">
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full bg-white/50 border border-[#1A1A1A]/10 p-2 rounded text-2xl font-medium focus:outline-none focus:border-[#BC4B28]"
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full bg-white/50 border border-[#1A1A1A]/10 p-2 rounded h-32 text-lg font-sans leading-relaxed focus:outline-none focus:border-[#BC4B28] resize-none"
            />
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-4 py-2 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-[#BC4B28] transition-colors"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-transparent border border-[#1A1A1A]/20 text-[#1A1A1A] text-xs font-bold uppercase tracking-wider rounded hover:bg-[#1A1A1A]/5 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* VIEW MODE */
          <>
            <h3 className="text-3xl font-medium mb-4 group-hover:text-[#BC4B28] transition-colors duration-300">
              {story.title}
            </h3>

            <div className="mb-8">
              <p className="text-lg font-sans text-[#1A1A1A]/60 leading-relaxed inline">
                {displayedText}
              </p>

              {/* READ MORE TOGGLE */}
              {isLongText && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="ml-2 text-sm font-bold text-[#BC4B28] hover:underline focus:outline-none"
                >
                  {isExpanded ? "Read Less" : "Read More"}
                </button>
              )}
            </div>
          </>
        )}

        {/* FOOTER: Author Info */}
        <div className="flex items-center justify-between border-t border-[#1A1A1A]/5 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#BC4B28] text-white flex items-center justify-center text-xs font-serif italic overflow-hidden">
              {story.authorPhoto ? (
                <img
                  src={story.authorPhoto}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                story.author?.[0] || "U"
              )}
            </div>
            <span className="text-xs font-sans font-bold text-[#1A1A1A]/60 uppercase tracking-wider">
              {story.author}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================
const Community = ({ onWriteClick }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("stories");
  const [realPosts, setRealPosts] = useState([]);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  // Static fallback data
  const initialStories = [
    {
      id: "static-1",
      author: "Priya M.",
      date: "Dec 28, 2025",
      tag: "Experience",
      title: "How I cleared out 5 years of expired medicines",
      preview:
        "I had no idea how many unused medicines had accumulated in my cabinet until I decided to organize them. The local pharmacy accepted everything and it felt great to declutter safely.",
      color: "#BC4B28",
    },
  ];

  useEffect(() => {
    const unsubscribe = subscribeToPosts((fetchedPosts) => {
      setRealPosts(fetchedPosts);
    });
    return () => unsubscribe();
  }, []);

  const allStories = [...realPosts, ...initialStories];

  const handleShareClick = () => {
    if (user) {
      setIsPostModalOpen(true);
    } else {
      onWriteClick();
    }
  };

  return (
    <section className="relative min-h-screen w-full bg-[#EFEDE6] text-[#1A1A1A] font-serif overflow-hidden pt-32">
      <AnimatePresence>
        {isPostModalOpen && (
          <CreatePost
            isOpen={isPostModalOpen}
            onClose={() => setIsPostModalOpen(false)}
          />
        )}
      </AnimatePresence>

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
                    {allStories.map((story, index) => (
                      /* Using the new StoryCard component here */
                      <StoryCard
                        key={story.id || index}
                        story={story}
                        user={user}
                        index={index}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

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
