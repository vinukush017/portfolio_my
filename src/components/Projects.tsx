import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Car Daddy CRM',
    description:
      'Built scalable car registration & CRM app with JWT auth, AWS S3, WhatsApp/email integration, and frontend in React.js.',
    link: '#',
  },
  {
    title: 'DropChat AI',
    description:
      'Created chatbot builder with OpenAI API, file training, user plans, and embed features — improved UX by 40%.',
    link: '#',
  },
];

const Projects = () => (
  <section className="py-20 px-6 bg-gray-100 dark:bg-slate-900" id="projects">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white"
    >
      Projects
    </motion.h2>

    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {projects.map((proj, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.2 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">{proj.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{proj.description}</p>
          <a
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
          >
            🔗 View Project
          </a>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Projects;
