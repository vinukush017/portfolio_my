import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    show && (
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 group max-w-screen overflow-hidden"
        aria-label="Scroll to top"
      >
        <div className="relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-indigo-500/40 shadow-xl hover:shadow-indigo-400 transition duration-300 ease-in-out overflow-hidden">
          {/* Orbit Ring */}
          <div className="absolute inset-0 animate-spin-slow rounded-full border-t-2 border-indigo-500/70 border-opacity-40"></div>

          {/* Center Dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_12px_4px_rgba(99,102,241,0.6)]"
            style={{ translateX: "-50%", translateY: "-50%" }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />

          {/* Up Arrow */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 absolute top-1/2 left-1/2 text-indigo-300 group-hover:text-indigo-100 transition"
            style={{ translateX: "-50%", translateY: "-50%" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <polyline points="18 15 12 9 6 15" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </div>
      </motion.button>
    )
  );
};

export default ScrollToTop;
