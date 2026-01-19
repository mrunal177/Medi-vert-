import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addPost } from "../firebase/postService";
import { useAuth } from "../auth/AuthContext";

const tags = ["Experience", "Impact", "Guide", "Question"];

const CreatePost = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTag, setSelectedTag] = useState("Experience");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    setLoading(true);
    try {
      await addPost(user, {
        title,
        preview: content, // using 'preview' to match your existing data structure
        tag: selectedTag,
        role: "Community Member", // Default role
        color: "#BC4B28", // Default color
      });
      setTitle("");
      setContent("");
      onClose();
    } catch (error) {
      alert("Failed to post story");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-[#EFEDE6] w-full max-w-lg rounded-3xl p-8 shadow-2xl border border-[#1A1A1A]/10 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl opacity-50 hover:opacity-100"
        >
          ✕
        </button>

        <h2 className="text-2xl font-serif mb-6 text-[#1A1A1A]">
          Share your story
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-60">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl bg-white/50 border border-[#1A1A1A]/10 focus:outline-none focus:border-[#BC4B28]"
              placeholder="e.g. How I started recycling..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-60">
              Tag
            </label>
            <div className="flex gap-2 flex-wrap">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all ${
                    selectedTag === tag
                      ? "bg-[#BC4B28] text-white border-[#BC4B28]"
                      : "bg-white/50 border-[#1A1A1A]/10 hover:border-[#BC4B28]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 opacity-60">
              Story
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 h-32 rounded-xl bg-white/50 border border-[#1A1A1A]/10 focus:outline-none focus:border-[#BC4B28] resize-none"
              placeholder="Share your experience..."
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-3 bg-[#1A1A1A] text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#BC4B28] transition-colors disabled:opacity-50"
          >
            {loading ? "Posting..." : "Publish Story"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePost;
