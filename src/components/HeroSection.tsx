import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="snap-start min-h-screen pt-24 flex flex-col justify-center items-center bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 px-6 sm:px-12 md:px-20 relative"
    >
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-2 leading-tight">
          Vinay Kushwah
        </h1>

        <h2 className="text-2xl sm:text-3xl font-medium text-indigo-600 mb-6">
          Full Stack MERN Developer · Pune, India
        </h2>

        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-10 text-balance">
          Empowering businesses with scalable web applications and clean, modern
          code. I bring 4+ years of real-world MERN stack experience — from
          intuitive frontends to optimized backends. Let’s build something
          impactful together.
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
            aria-label="Vinay Kushwah LinkedIn Profile"
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
