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
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-100/80 to-purple-100/80 dark:from-indigo-900/40 dark:to-purple-900/40 backdrop-blur-md border border-indigo-200/60 dark:border-indigo-800/60 text-sm font-semibold text-indigo-700 dark:text-indigo-300 shadow-lg shadow-indigo-500/20 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse shadow-lg shadow-green-500/50" />
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
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient">
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
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-enhanced border-indigo-200/60 dark:border-indigo-800/60 shadow-md hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Pune, India</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-enhanced border-purple-200/60 dark:border-purple-800/60 shadow-md hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 shadow-md group-hover:scale-110 transition-transform">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{years}+ Years Experience</span>
                  </motion.div>
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
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 transition-all duration-300 shadow-premium hover:shadow-premium-lg font-bold text-base sm:text-lg w-full sm:w-auto overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    <span className="relative z-10 flex items-center gap-2">
                      View My Projects
                      <motion.span
                        className="text-xl"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.a>

                  {/* Secondary CTA: Resume */}
                  <motion.a
                    href="/Vinay_Kushwah_Resume_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open resume in a new tab"
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center justify-center border-2 border-indigo-600/80 dark:border-indigo-400/80 text-indigo-600 dark:text-indigo-400 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/40 dark:hover:to-purple-900/40 hover:border-indigo-500 dark:hover:border-indigo-300 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 font-bold glass-enhanced text-base sm:text-lg w-full sm:w-auto shadow-md hover:shadow-lg hover:shadow-indigo-500/20"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl animate-pulse-slow" />
                  
                  {/* Code Visual Card */}
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative glass-enhanced border-indigo-200/60 dark:border-indigo-800/60 rounded-3xl p-5 sm:p-7 shadow-premium hover:shadow-premium-lg transition-all duration-500 overflow-hidden"
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity duration-500" />
                    
                    <CodeVisual
                      lines={codeLines}
                      speed={22}
                      lineDelay={700}
                      loop={true}
                      className="w-full rounded-lg relative z-10"
                      maxWidth={520}
                    />
                    
                    {/* Gradient border glow */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
                  </motion.div>
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
