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
      <main id="main" className="w-full relative mt-24 md:mt-0">
        {/* fixed vertical social icons (lg+) */}
        <aside
          aria-hidden="false"
          className="hidden lg:flex fixed left-6 bottom-0 -translate-y-1/2 z-40"
          style={{ pointerEvents: "auto" }}
        >
          <SocialIcons />
        </aside>

        <section
          id="home"
          aria-label="Introduction"
          className="snap-start min-h-screen w-full flex items-center justify-center bg-transparent text-gray-900 dark:text-white"
        >
          <div className="container mx-auto w-[95%]">
            <motion.div
              {...containerMotion}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center"
            >
              {/* Left/main content */}
              <div className="lg:col-span-7 lg:col-start-2 xl:col-start-2 flex flex-col items-start text-left">
                <p className="text-lg sm:text-xl md:text-2xl font-medium mb-1 leading-tight text-gray-600 dark:text-gray-300">
                  Heya — I’m
                </p>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-snug text-indigo-600 dark:text-indigo-400 pb-3 font-mono">
                  Vinay Kushwah
                </h1>

                <div aria-live="polite" aria-atomic="true" className="mb-2">
                  <TextScrambler
                    texts={[
                      "Full-Stack Engineer",
                      "React & Next.js Specialist",
                      "Node.js API Developer",
                    ]}
                    speed={50}
                    interval={3000}
                    className="text-lg sm:text-2xl md:text-2xl font-semibold inline-block font-mono text-gray-800 dark:text-gray-100"
                  />
                </div>

                <h2 className="text-sm sm:text-base md:text-lg font-medium text-indigo-600 dark:text-indigo-400 my-2">
                  Pune, India — {years}+ years building production web apps
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mb-4">
                  I design and ship performant, maintainable web applications
                  using React, Next.js, Node.js and TypeScript. I focus on clean
                  UX, reliable APIs, and measurable results — from prototypes to
                  production.
                </p>

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2 mb-4" aria-hidden="true">
                  {[
                    "React",
                    "Next.js",
                    "Node.js",
                    "MongoDB",
                    "TypeScript",
                    "Tailwind",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="text-xs sm:text-sm inline-flex items-center px-2.5 py-1 rounded-full border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-200 bg-white/60 dark:bg-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  Available for full-time & contract roles · Open to
                  product-focused teams
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-2">
                  {/* Primary CTA: Projects */}
                  <a
                    href="#projects"
                    aria-label="See projects"
                    className="inline-flex items-center justify-center bg-indigo-600 text-white px-4 sm:px-6 py-2.5 rounded-full hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 transition-shadow"
                  >
                    See my work
                  </a>

                  {/* Secondary CTA: Resume */}
                  <a
                    href="/Vinay_Kushwah_Resume_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open resume in a new tab"
                    className="inline-flex items-center justify-center border border-indigo-600 text-indigo-600 dark:text-indigo-300 dark:border-indigo-300 px-4 sm:px-6 py-2.5 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900 transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    Resume (PDF)
                  </a>

                  {/* Tertiary link: contact */}
                  <a
                    href="#contact"
                    aria-label="Jump to contact section"
                    className="inline-flex items-center justify-center px-3 py-2 text-sm text-gray-700 dark:text-gray-200 underline underline-offset-2"
                  >
                    Contact
                  </a>
                </div>
              </div>

              {/* Right visual: on small screens it will flow below the text */}
              <div className="lg:col-span-4 lg:col-start-9 flex items-center justify-center">
                <div className="w-full flex justify-center">
                  {/* responsive width: min(95vw, 520px) ensures it fits phones */}
                  <CodeVisual
                    lines={codeLines}
                    speed={22}
                    lineDelay={700}
                    loop={true}
                    className="w-[min(95vw,520px)] rounded-lg shadow-lg/10"
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
