import React from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaAws,
  FaGitAlt,
  FaJs,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiExpress,
} from "react-icons/si";

const skillIcons: Record<string, JSX.Element> = {
  "Node.js": <FaNodeJs />,
  "React.js": <FaReact />,
  JavaScript: <FaJs />,
  TypeScript: <SiTypescript />,
  HTML: <FaHtml5 />,
  CSS: <FaCss3Alt />,
  "Express.js": <SiExpress />,
  "REST APIs": <SiExpress />,
  MongoDB: <SiMongodb />,
  PostgreSQL: <SiPostgresql />,
  "AWS S3": <FaAws />,
  Git: <FaGitAlt />,
};
const skillColors: Record<string, { text: string; border: string }> = {
  "Node.js": { text: "text-green-500", border: "#22c55e" },
  "React.js": { text: "text-cyan-400", border: "#06b6d4" },
  JavaScript: { text: "text-yellow-400", border: "#facc15" },
  TypeScript: { text: "text-blue-500", border: "#3b82f6" },
  HTML: { text: "text-orange-500", border: "#f97316" },
  CSS: { text: "text-blue-400", border: "#60a5fa" },
  "Express.js": { text: "text-gray-300", border: "#d1d5db" },
  "REST APIs": { text: "text-gray-300", border: "#d1d5db" },
  MongoDB: { text: "text-green-600", border: "#16a34a" },
  PostgreSQL: { text: "text-blue-600", border: "#2563eb" },
  "AWS S3": { text: "text-orange-400", border: "#fb923c" },
  Git: { text: "text-red-500", border: "#ef4444" },
};

const Skills = () => (
  <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
    >
      Skills
    </motion.h2>

    <motion.div
      className="grid gap-x-3 sm:gap-x-4 gap-y-6 sm:gap-y-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center max-w-7xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {Object.entries(skillIcons).map(([skill, icon], idx) => {
        const { text, border } = skillColors[skill];

        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={{ 
              scale: 1.1, 
              y: -8,
              rotateY: 5,
              rotateX: 5,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="w-full max-w-[140px] sm:max-w-[180px] md:w-48 h-32 sm:h-36 md:h-40 bg-gradient-to-br from-white to-indigo-50/50 dark:from-gray-900 dark:to-indigo-900/20 rounded-2xl sm:rounded-[25px] relative flex flex-col items-center justify-center overflow-hidden transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/30 border-wrapper group"
            style={{ "--tw-border-color": border, transformStyle: "preserve-3d" } as React.CSSProperties}
          >
            <motion.span
              className={`z-10 text-5xl sm:text-6xl md:text-7xl ${text} transition-transform duration-300 group-hover:scale-110`}
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
            >
              {icon}
            </motion.span>
            <motion.span
              className="mt-2 text-center font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent z-10"
              whileHover={{ scale: 1.1 }}
            >
              {skill}
            </motion.span>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-all duration-500 rounded-[25px]" />
          </motion.div>
        );
      })}
    </motion.div>
  </section>
);

export default Skills;

