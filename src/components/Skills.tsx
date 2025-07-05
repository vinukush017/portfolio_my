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
  "React.js": <FaReact />,
  JavaScript: <FaJs />,
  TypeScript: <SiTypescript />,
  HTML: <FaHtml5 />,
  CSS: <FaCss3Alt />,
  "Node.js": <FaNodeJs />,
  "Express.js": <SiExpress />,
  "REST APIs": <SiExpress />,
  MongoDB: <SiMongodb />,
  PostgreSQL: <SiPostgresql />,
  "AWS S3": <FaAws />,
  Git: <FaGitAlt />,
};

const skillGroups = {
  Frontend: ["React.js", "JavaScript", "TypeScript", "HTML", "CSS"],
  Backend: ["Node.js", "Express.js", "REST APIs"],
  Databases: ["MongoDB", "PostgreSQL"],
  "DevOps & Tools": ["AWS S3", "Git"],
};

const Skills = () => (
  <section className="py-20 px-6 bg-white dark:bg-black" id="skills">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white"
    >
      Skills
    </motion.h2>

    <motion.div
      className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {Object.entries(skillGroups).map(([category, techs]) => (
        <div key={category} className="mb-6 w-full max-w-4xl text-center">
          <h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-3">
            {category}
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {techs.map((skill, idx) => (
              <motion.span
                key={idx}
                className="px-5 py-2 bg-gray-200 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-800 dark:text-white"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{skillIcons[skill]}</span>
                  <span className="font-semibold text-indigo-700 dark:text-indigo-300">
                    {skill}
                  </span>
                </span>
              </motion.span>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  </section>
);

export default Skills;
