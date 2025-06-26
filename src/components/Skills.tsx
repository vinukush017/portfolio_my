import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  'JavaScript', 'TypeScript', 'React.js', 'Node.js', 'Express.js',
  'MongoDB', 'PostgreSQL', 'Redux', 'AWS S3', 'REST APIs',
  'Git', 'Tailwind CSS', 'HTML', 'CSS', 'GraphQL',
];

const Skills = () => (
  <section className="py-20 px-6 bg-white dark:bg-slate-800" id="skills">
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
      {skills.map((skill, idx) => (
        <motion.span
          key={idx}
          className="px-5 py-2 bg-gray-200 dark:bg-slate-700 rounded-full text-sm font-medium text-gray-800 dark:text-white"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {skill}
        </motion.span>
      ))}
    </motion.div>
  </section>
);

export default Skills;
