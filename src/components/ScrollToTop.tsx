import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            duration: 0.3
          }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 group"
          aria-label="Scroll to top"
        >
          {/* Main Button Container */}
          <div className="relative">
            {/* Background Glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0, 0.1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Button */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-2 border-indigo-200/50 dark:border-indigo-800/50 shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 overflow-hidden transition-all duration-300 group-hover:border-indigo-400 dark:group-hover:border-indigo-600">
              {/* Gradient Background on Hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />

              {/* Animated Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  background: "conic-gradient(from 0deg, transparent, rgba(99, 102, 241, 0.3), transparent)"
                }}
              />

              {/* Inner Content */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Pulse Effect */}
                <motion.div
                  className="absolute w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.8, 0.4, 0.8]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                {/* Arrow Icon */}
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 sm:w-7 sm:h-7 absolute text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  animate={{ y: [0, -3, 0] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </motion.svg>
              </div>

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut"
                }}
              />
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;