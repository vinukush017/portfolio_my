// components/HeroSection.tsx
"use client";
import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import TextScrambler from "./TextScrambler";
import Navbar from "./Navbar";
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
      <Navbar />
      <main id="main" className="w-full mx-auto relative mt-20 sm:mt-24 md:mt-0">
        {/* Social icons sidebar - positioned by component itself */}
        <SocialIcons />

        <section
          aria-label="Introduction"
          className="snap-start min-h-screen w-full flex items-center justify-center bg-transparent text-gray-900 dark:text-white py-8 sm:py-12 md:py-16"
        >
          <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              {...containerMotion}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-4 items-center"
            >
              {/* Left/main content */}
              <div className="lg:col-span-7 lg:col-start-2 xl:col-start-2 flex flex-col items-start text-left px-4 sm:px-0">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-base sm:text-lg md:text-xl font-medium mb-2 sm:mb-1 leading-tight text-gray-600 dark:text-gray-300"
                >
                  Hi, I'm
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight sm:leading-snug bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent pb-2 sm:pb-3 font-mono mb-2 sm:mb-1"
                >
                  Vinay Kushwah
                </motion.h1>

                <div aria-live="polite" aria-atomic="true" className="mb-3 sm:mb-2 min-h-[1.5rem] sm:min-h-[2rem]">
                  <TextScrambler
                    texts={[
                      "Full-Stack Developer",
                      "React & Next.js Expert",
                      "Node.js Backend Specialist",
                      "TypeScript Enthusiast",
                    ]}
                    speed={50}
                    interval={3000}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold inline-block font-mono text-gray-800 dark:text-gray-100"
                  />
                </div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-xs sm:text-sm md:text-base font-medium text-indigo-600 dark:text-indigo-400 mb-3 sm:mb-2"
                >
                  📍 Pune, India · {years}+ years experience · Available for opportunities
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mb-4 sm:mb-6 leading-relaxed"
                >
                  I'm a passionate <strong>Full-Stack Developer</strong> specializing in building scalable, 
                  high-performance web applications. With expertise in <strong>React</strong>, <strong>Next.js</strong>, 
                  <strong>Node.js</strong>, and <strong>TypeScript</strong>, I transform ideas into production-ready 
                  solutions that deliver exceptional user experiences and measurable business impact.
                </motion.p>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6" aria-hidden="true">
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
                      transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="text-xs sm:text-sm inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full border border-indigo-200 dark:border-indigo-800 text-gray-700 dark:text-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 font-medium"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-2 w-full sm:w-auto">
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
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full hover:from-indigo-700 hover:to-purple-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 font-semibold text-sm sm:text-base w-full sm:w-auto"
                  >
                    View My Projects
                    <motion.span
                      className="ml-2"
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
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center border-2 border-indigo-600 text-indigo-600 dark:text-indigo-300 dark:border-indigo-300 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 font-semibold backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 text-sm sm:text-base w-full sm:w-auto"
                  >
                    📄 Download Resume
                  </motion.a>
                </div>
              </div>

              {/* Right visual: on small screens it will flow below the text */}
              <div className="lg:col-span-4 lg:col-start-9 flex items-center justify-center mt-8 lg:mt-0">
                <div className="w-full max-w-full sm:max-w-md lg:max-w-lg flex justify-center">
                  {/* responsive width: min(95vw, 520px) ensures it fits phones */}
                  <CodeVisual
                    lines={codeLines}
                    speed={22}
                    lineDelay={700}
                    loop={true}
                    className="w-full max-w-[min(100%,520px)] rounded-lg shadow-lg/10"
                    maxWidth={520}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HeroSection;
