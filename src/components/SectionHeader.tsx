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
  const reveal = reduceMotion ? false : { opacity: 0, y: 16 };

  return (
    <motion.div
      initial={reveal}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-10 grid gap-5 border-b border-gray-300 pb-8 dark:border-white/10 sm:mb-12 lg:grid-cols-12 lg:items-end"
    >
      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={reveal}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-indigo-600 dark:text-cyan-400 lg:col-span-3"
        >
          {subtitle}
        </motion.p>
      )}

      {/* Main Title */}
      <motion.h2
        initial={reveal}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="font-heading text-4xl font-semibold tracking-[-0.045em] text-gray-950 dark:text-white sm:text-5xl lg:col-span-5"
      >
        {title}
      </motion.h2>

      {/* Description */}
      {description && (
        <motion.p
          initial={reveal}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400 lg:col-span-4 lg:justify-self-end"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
