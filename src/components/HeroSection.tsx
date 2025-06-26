import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section
      id="home"
      className="snap-start min-h-screen pt-24 flex flex-col justify-center items-center bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 px-6 sm:px-12 md:px-20 relative"
    >
      <motion.div
        className="max-w-5xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Vinay Kushwah</h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-indigo-600 mb-6">
          Full Stack <span className="underline decoration-indigo-400">MERN Developer</span> | 4+ Years Experience
        </h2>
        <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-8">
          I build scalable, high-performance web applications with clean code and a passion for solving real-world problems using the MERN stack.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <a
            href="/Vinay_Kushwah_Resume_2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition"
          >
            View Resume
          </a>
          <a
            href="#contact"
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-100 transition"
          >
            Contact Me
          </a>
          <a
            href="https://www.linkedin.com/in/vinaykushwah017"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-100 transition"
          >
            LinkedIn Profile
          </a>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 text-2xl text-indigo-500"
      >
        ↓
      </motion.div>
    </section>
  );
};

export default HeroSection;
