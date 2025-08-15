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
  <section className="py-20 px-6" id="skills">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
    >
      Skills
    </motion.h2>

    <motion.div
      className="grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center max-w-4xl mx-auto"
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
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-48 h-40 bg-white dark:bg-gray-900 rounded-[25px] relative flex flex-col items-center justify-center overflow-hidden transition-all duration-500 shadow-md border-wrapper"
            style={{ "--tw-border-color": border } as React.CSSProperties}
          >
            <span className={`z-10 text-7xl ${text}`}>{icon}</span>
            <span className="mt-2 text-center font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent z-10">
              {skill}
            </span>
          </motion.div>
        );
      })}
    </motion.div>
  </section>
);

export default Skills;
