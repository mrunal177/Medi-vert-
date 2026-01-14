import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20, // Starts slightly below
    filter: "blur(10px)", // Starts blurry
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)", // Becomes clear
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom "easeOutQuint" for smooth/premium feel
    },
  },
  exit: {
    opacity: 0,
    y: -20, // Moves slightly up
    filter: "blur(10px)",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
