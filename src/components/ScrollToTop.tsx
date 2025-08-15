import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    setClicked(true);

    // Scroll page
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Reset after animation finishes
    setTimeout(() => setClicked(false), 1500);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 60 }} // start below screen
          animate={{ opacity: 1, scale: 1, y: 0 }} // rise to normal position
          exit={{ opacity: 0, scale: 0.5, y: 60 }} // slide down on hide
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-6 z-50 group"
          aria-label="Scroll to top"
        >
          <motion.div
            className="relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-indigo-500/40 shadow-xl overflow-hidden"
            animate={
              clicked
                ? {
                    y: [-0, -window.innerHeight * 1.2], // blast past top
                    scale: [1, 1.2, 1],
                    opacity: [1, 1, 0],
                  }
                : { y: 0, scale: 1, opacity: 1 }
            }
            transition={{
              duration: 1.3,
              ease: [0.4, 0, 0.2, 1], // cubic-bezier for "rocket"
            }}
          >
            {/* Rocket Glow Trail */}
            {clicked && (
              <motion.div
                className="absolute -bottom-6 left-1/2 w-2 h-16 bg-gradient-to-t from-yellow-400 via-orange-500 to-transparent rounded-full"
                style={{ translateX: "-50%" }}
                initial={{ opacity: 0.8, scaleY: 0.6 }}
                animate={{ opacity: 0, scaleY: 1.5 }}
                transition={{ duration: 0.8 }}
              />
            )}

            {/* Spinning Ring */}
            <div className="absolute inset-0 animate-spin-slow rounded-full border-t-2 border-indigo-500/70"></div>

            {/* Center Pulse */}
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

            {/* Arrow */}
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
              <polyline
                points="18 15 12 9 6 15"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
