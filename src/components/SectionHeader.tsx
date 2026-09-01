import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
}) => {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduceMotion
      ? false
      : {
          opacity: 0,
          y: 16,
        },

    whileInView: {
      opacity: 1,
      y: 0,
    },

    viewport: {
      once: true,
      amount: 0.2,
    },

    transition: reduceMotion
      ? { duration: 0 }
      : {
          duration: 0.5,
          delay,
          ease: [0.22, 1, 0.36, 1] as const,
        },
  });

  return (
    <div className="site-divider mb-10 grid gap-5 border-b pb-8 sm:mb-12 lg:grid-cols-12 lg:items-end">
      {subtitle && (
        <motion.p
          {...reveal(0)}
          className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-dark dark:text-accent-light lg:col-span-3"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.h2
        {...reveal(0.06)}
        className="font-heading text-4xl font-semibold tracking-[-0.045em] text-gray-950 dark:text-white sm:text-5xl lg:col-span-5"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          {...reveal(0.12)}
          className="max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400 lg:col-span-4 lg:justify-self-end"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeader;
