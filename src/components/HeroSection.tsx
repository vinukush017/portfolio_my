// components/HeroSection.tsx
"use client";
import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import TextScrambler from "./TextScrambler";
import SocialIcons from "./SocialIcons";
import CodeVisual from "./CodeVisual";

const HeroSection: React.FC = () => {
  const reduceMotion = useReducedMotion();

  const years = useMemo(() => {
    const startYear = 2021;
    const now = new Date();
    const baseYears = now.getFullYear() - startYear;
    const half = now.getMonth() >= 6 ? 0.5 : 0;
    const value = baseYears + half;
    return Number.isInteger(value) ? `${value}` : value.toFixed(1);
  }, []);

  const containerMotion = {
    initial: reduceMotion ? undefined : { opacity: 0, y: 28 },
    animate: reduceMotion ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] as const },
  };

  const codeLines = [
    "const Vinay = {",
    '  role: "Full Stack Developer",',
    '  stack: ["React", "Next.js", "Node.js", "Tailwind"],',
    '  location: "Pune, India",',
    '  openTo: "frontend & backend roles"',
    "};",
    "",
    "export default Vinay;",
  ];

  return (
    <>
      <div id="main" className="w-full max-w-full mx-auto relative overflow-x-hidden">
        {/* Social icons sidebar - positioned by component itself */}
        <SocialIcons />

        <section
          aria-label="Introduction"
          className="snap-start min-h-screen w-full max-w-full flex items-center justify-center bg-transparent text-gray-900 dark:text-white py-16 md:py-20 overflow-x-hidden"
        >
          <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              {...containerMotion}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left/main content */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                {/* Greeting Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-4"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 border border-indigo-200/50 dark:border-indigo-800/50 text-sm font-medium text-indigo-700 dark:text-indigo-300">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Available for opportunities
                  </span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="text-lg sm:text-xl md:text-2xl font-medium mb-3 text-gray-700 dark:text-gray-400"
                >
                  Hi, I'm
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4"
                >
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                    Vinay Kushwah
                  </span>
                </motion.h1>

                <div aria-live="polite" aria-atomic="true" className="mb-4 min-h-[2rem] sm:min-h-[2.5rem]">
                  <TextScrambler
                    texts={[
                      "Full-Stack Developer",
                      "React & Next.js Expert",
                      "Node.js Backend Specialist",
                      "TypeScript Enthusiast",
                    ]}
                    speed={50}
                    interval={3000}
                    className="text-xl sm:text-2xl md:text-3xl font-bold inline-block bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
                  />
                </div>

                {/* Info Cards */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-wrap gap-3 mb-6"
                >
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 shadow-sm">
                    <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Pune, India</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 shadow-sm">
                    <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{years}+ Years Experience</span>
                  </div>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-base sm:text-lg text-gray-800 dark:text-gray-400 max-w-2xl mb-6 leading-relaxed"
                >
                  I'm a passionate <span className="font-semibold text-indigo-700 dark:text-indigo-400">Full-Stack Developer</span> specializing in building scalable, 
                  high-performance web applications. With expertise in <span className="font-semibold text-purple-700 dark:text-purple-400">React</span>, <span className="font-semibold text-pink-700 dark:text-pink-400">Next.js</span>, 
                  <span className="font-semibold text-indigo-700 dark:text-indigo-400">Node.js</span>, and <span className="font-semibold text-purple-700 dark:text-purple-400">TypeScript</span>, I transform ideas into production-ready 
                  solutions that deliver exceptional user experiences.
                </motion.p>

                {/* Skill chips */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-wrap gap-2 mb-8"
                  aria-hidden="true"
                >
                  {[
                    "React",
                    "Next.js",
                    "Node.js",
                    "TypeScript",
                    "MongoDB",
                    "PostgreSQL",
                    "Tailwind CSS",
                    "AWS",
                  ].map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.1, y: -3 }}
                      className="text-xs sm:text-sm inline-flex items-center px-3 py-1.5 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
                >
                  {/* Primary CTA: Projects */}
                  <motion.a
                    href="#projects"
                    aria-label="See projects"
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById("projects");
                      if (element) {
                        const offset = 100;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - offset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth",
                        });
                      }
                    }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 font-semibold text-base sm:text-lg w-full sm:w-auto"
                  >
                    View My Projects
                    <motion.span
                      className="ml-2 text-xl"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </motion.a>

                  {/* Secondary CTA: Resume */}
                  <motion.a
                    href="/Vinay_Kushwah_Resume_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open resume in a new tab"
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center justify-center border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 font-semibold bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm text-base sm:text-lg w-full sm:w-auto shadow-sm hover:shadow-md"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </motion.a>
                </motion.div>
              </div>

              {/* Right visual: Code Visual */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="lg:col-span-5 flex items-center justify-center mt-8 lg:mt-0"
              >
                <div className="relative w-full max-w-lg">
                  {/* Decorative Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-3xl" />
                  
                  {/* Code Visual Card */}
                  <div className="relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-4 sm:p-6 shadow-xl">
                    <CodeVisual
                      lines={codeLines}
                      speed={22}
                      lineDelay={700}
                      loop={true}
                      className="w-full rounded-lg"
                      maxWidth={520}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HeroSection;
