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
          className="fixed right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--site-background)] bg-[var(--theme-accent)] text-[var(--theme-on-accent)] shadow-lg transition-shadow hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--site-background)] sm:right-7"
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
