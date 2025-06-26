import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-20 px-6 sm:px-12 md:px-20 bg-gray-50 dark:bg-slate-800 text-gray-800 dark:text-gray-100 flex items-center"
    >
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
          About Me
        </h2>

        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          I'm <span className="font-semibold">Vinay Kushwah</span>, a Full Stack MERN Developer based in Pune, India,
          with <strong>4+ years of professional experience</strong> building fast, scalable, and user-friendly web applications.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          I specialize in <strong>React.js, Node.js, MongoDB, PostgreSQL,</strong> and modern frontend practices using
          <strong> Tailwind CSS</strong>. Whether it's designing reusable components, optimizing APIs (cutting server response by 30%),
          or integrating AWS, I bring clean architecture and real-world problem-solving to every project.
        </p>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          I’m passionate about continuous learning, shipping products users love, and writing maintainable code that teams can rely on.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {["MERN Stack", "Clean Code", "Performance Driven", "Reusable UI"].map((tag, idx) => (
            <span
              key={idx}
              className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-4 py-2 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
