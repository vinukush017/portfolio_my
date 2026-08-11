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
    initial: reduceMotion ? undefined : { opacity: 0, y: 30 },
    animate: reduceMotion ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
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
      <div className="w-full max-w-full mx-auto relative overflow-x-hidden">
        <SocialIcons />

        <section
          aria-label="Introduction"
          className="snap-start min-h-[100dvh] w-full max-w-full flex items-center justify-center bg-transparent text-gray-900 dark:text-white pt-24 pb-16 md:py-24 overflow-x-hidden"
        >
          {/* Subtle background glow for hero */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/20 dark:bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

          <div className="container mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              {...containerMotion}
              className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8"
            >
              {/* Left/Main Content - Centered on Mobile/Tablet, Left-aligned on Desktop */}
              <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left">
                {/* Greeting Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mb-6"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50/80 dark:bg-indigo-900/40 backdrop-blur-md border border-indigo-200 dark:border-indigo-700/50 text-xs sm:text-sm font-semibold text-indigo-700 dark:text-indigo-300 shadow-sm transition-all hover:shadow-md">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    Available for opportunities
                  </span>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg sm:text-xl md:text-2xl font-medium mb-1 text-gray-600 dark:text-gray-400"
                >
                  Hi, I'm
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight mb-4"
                >
                  <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent drop-shadow-sm">
                    Vinay Kushwah
                  </span>
                </motion.h1>

                <div className="mb-8 min-h-[2.5rem] sm:min-h-[3rem] w-full flex justify-center lg:justify-start">
                  <TextScrambler
                    texts={[
                      "Full-Stack Developer",
                      "React & Next.js Expert",
                      "Node.js Backend Specialist",
                      "TypeScript Enthusiast",
                    ]}
                    speed={50}
                    interval={3000}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
                  />
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed font-medium"
                >
                  I'm a passionate <span className="font-semibold text-indigo-600 dark:text-indigo-400 border-b border-indigo-400/30">Full-Stack Developer</span> specializing in building scalable web applications. Transforming ideas into modern, high-performance solutions.
                </motion.p>

                {/* Info Cards & Skills Row */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 w-full"
                >
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 shadow-sm text-sm font-semibold text-gray-700 dark:text-gray-200 transition-transform hover:-translate-y-1">
                    <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Pune, India
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/60 shadow-sm text-sm font-semibold text-gray-700 dark:text-gray-200 transition-transform hover:-translate-y-1">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {years}+ Years Experience
                  </div>
                  
                  {/* Subtle divider on larger screens */}
                  <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 mx-1"></div>

                  <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {["React", "Next.js", "Node.js", "TS"].map((skill) => (
                      <span key={skill} className="text-xs px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-medium tracking-wide">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                >
                  <motion.a
                    href="#projects"
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
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center justify-center bg-indigo-600 text-white px-8 py-3.5 sm:py-4 rounded-xl hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-lg shadow-indigo-500/30 font-bold text-base w-full sm:w-auto overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
                    View My Projects
                    <motion.svg 
                      className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </motion.svg>
                  </motion.a>

                  <motion.a
                    href="/Vinay_Kushwah_Resume_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center justify-center border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-600 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400 px-8 py-3.5 sm:py-4 rounded-xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-all duration-300 font-bold text-base w-full sm:w-auto shadow-sm"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Resume
                  </motion.a>
                </motion.div>
              </div>

              {/* Right/Visual Content - IDE Style Terminal */}
              <div className="w-full lg:w-2/5 flex justify-center lg:justify-end mt-4 lg:mt-0 relative">
                <motion.div
                  initial={{ opacity: 0, x: 40, rotateY: 10 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 100 }}
                  className="relative w-full max-w-lg"
                  style={{ perspective: 1200 }}
                >
                  {/* Outer Hologram Glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-indigo-500 via-cyan-500 to-purple-500 rounded-3xl blur-2xl opacity-20 dark:opacity-30 animate-pulse-slow z-0" />
                  
                  {/* Futuristic Bento Card */}
                  <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-indigo-400/50 via-cyan-400/20 to-purple-500/50 z-10 transform transition-transform hover:scale-[1.02] duration-500">
                    
                    {/* Inner Tech Panel */}
                    <div className="relative bg-white/70 dark:bg-[#060b14]/80 backdrop-blur-3xl rounded-2xl h-full p-8 sm:p-10 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                      
                      {/* Blueprint Grid Overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(rgba(99,102,241,0.15)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

                      {/* Sci-Fi Corner Brackets */}
                      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-indigo-500/60 dark:border-cyan-400/60 rounded-tl-2xl pointer-events-none"></div>
                      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-500/60 dark:border-indigo-400/60 rounded-tr-2xl pointer-events-none"></div>
                      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-500/60 dark:border-purple-400/60 rounded-bl-2xl pointer-events-none"></div>
                      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-indigo-500/60 dark:border-cyan-400/60 rounded-br-2xl pointer-events-none"></div>

                      {/* Clean Code Content */}
                      <div className="relative z-10 text-sm sm:text-base font-mono leading-relaxed text-gray-800 dark:text-indigo-100">
                        <CodeVisual
                          lines={codeLines}
                          speed={22}
                          lineDelay={700}
                          loop={true}
                          className="w-full drop-shadow-md"
                          maxWidth={520}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating Elements (Decorative Data Node) */}
                  <motion.div 
                    animate={{ y: [0, -15, 0], rotate: [0, 90, 180, 270, 360] }} 
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -right-4 -bottom-4 w-16 h-16 rounded-lg blur-[1px] opacity-80 backdrop-blur-md bg-white/20 dark:bg-cyan-500/10 border border-indigo-300 dark:border-cyan-400/50 hidden md:flex items-center justify-center z-20 overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                  >
                    <svg className="w-8 h-8 text-indigo-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HeroSection;
