import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'SYMBtechnologies, Noida',
    title: 'Software Engineer (MERN Stack)',
    date: 'Nov 2024 – Present',
    description: [
      'Improved server response time by 30% using Node.js and Express.js.',
      'Optimized MongoDB queries to reduce latency by 25%.',
      'Built reusable React components and integrated Redux for state management.',
      'Deployed file storage securely on AWS S3.',
    ],
  },
  {
    company: 'ARIPRA Infotech, Indore',
    title: 'Full Stack Developer (MERN)',
    date: 'Feb 2022 – May 2024',
    description: [
      'Accelerated API speeds by 35% with optimized Node.js backends.',
      'Used PostgreSQL with Knex.js to cut data retrieval time by 40%.',
      'Improved UI responsiveness and reduced bugs by 20%.',
    ],
  },
  {
    company: 'JERK Trend, Pune',
    title: 'Junior Node.js Developer',
    date: 'Jan 2021 – Feb 2022',
    description: [
      'Built core Node/Express logic and improved performance by 20%.',
      'Revamped frontend for better mobile experience, boosting retention.',
    ],
  },
];

const Experience = () => (
  <section className="py-20 px-6 bg-white dark:bg-slate-900" id="experience">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white"
    >
      Experience
    </motion.h2>

    <div className="space-y-8 max-w-4xl mx-auto">
      {experiences.map((exp, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-50 dark:bg-slate-800 p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{exp.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-2">
            {exp.company} — {exp.date}
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
            {exp.description.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Experience;
