import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'SYMBtechnologies, Noida',
    title: 'Software Engineer (MERN Stack)',
    date: 'Nov 2024 – Present',
    description: [
      'Boosted server response speed by 30% with optimized Express.js routes.',
      'Reduced MongoDB latency by 25% using indexes and aggregation.',
      'Built scalable React components and implemented Redux for global state.',
      'Handled secure media uploads via AWS S3 integration.',
    ],
    stack: ['Node.js', 'Express.js', 'MongoDB', 'React', 'Redux', 'AWS S3'],
  },
  {
    company: 'ARIPRA Infotech, Indore',
    title: 'Full Stack Developer (MERN)',
    date: 'Feb 2022 – May 2024',
    description: [
      'Engineered RESTful APIs with Express.js, improving performance by 35%.',
      'Implemented efficient SQL queries with PostgreSQL + Knex.js.',
      'Reduced bugs by 20% through unit testing and PR reviews.',
    ],
    stack: ['Node.js', 'Redux', 'React', 'MongoDB', 'Express.js'],
  },
  {
    company: 'JERK Trend, Pune',
    title: 'Junior Node.js Developer',
    date: 'Jan 2021 – Feb 2022',
    description: [
      'Built scalable backend using Node.js and Express with 20% faster load time.',
      'Redesigned responsive UIs with React, improving mobile retention by 25%.',
    ],
    stack: ['Node.js', 'Express.js', 'React', 'MongoDB'],
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
          <div className="flex flex-wrap gap-2 mt-4">
            {exp.stack.map((tech, i) => (
              <span
                key={i}
                className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 text-xs px-3 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Experience;
