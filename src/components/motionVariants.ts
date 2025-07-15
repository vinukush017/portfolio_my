// motionVariants.ts
import { Variants, easeOut } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

export const staggerContainer: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};
