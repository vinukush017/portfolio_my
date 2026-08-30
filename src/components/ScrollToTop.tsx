import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { scrollToSection } from "../config/navigation";

const ScrollToTop = () => {
  const reduceMotion = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 600);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    scrollToSection("home");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={handleScrollToTop}
          aria-label="Back to top"
          title="Back to top"
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 12,
                  scale: 0.95,
                }
          }
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={
            reduceMotion
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: 10,
                  scale: 0.95,
                }
          }
          whileHover={
            reduceMotion
              ? undefined
              : {
                  y: -2,
                }
          }
          whileTap={
            reduceMotion
              ? undefined
              : {
                  scale: 0.95,
                }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 bg-white/95 text-gray-700 shadow-[0_10px_30px_rgba(15,23,42,0.12)] backdrop-blur-md transition-colors hover:border-gray-950 hover:bg-gray-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-white/15 dark:bg-[#111419]/95 dark:text-gray-300 dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] dark:hover:border-white dark:hover:bg-white dark:hover:text-gray-950 sm:right-7"
          style={{
            bottom: "calc(1.25rem + env(safe-area-inset-bottom))",
          }}
        >
          <ArrowUpIcon aria-hidden="true" className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
