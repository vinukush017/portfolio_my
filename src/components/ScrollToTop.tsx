// components/ScrollToTop.tsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    show && (
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-[50px] right-[50px] h-[45px] w-[45px] p-[5px] 
  rounded-full z-50 bg-indigo-600 text-white hover:bg-indigo-700 
  shadow-lg ring-2 ring-white dark:ring-indigo-300 transition"
        aria-label="Scroll to top"
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </motion.button>
    )
  );
};

export default ScrollToTop;
