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
      <main id="main" className="w-full relative mt-20 md:mt-0">
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
          className="snap-start min-h-screen w-full flex items-center justify-center bg-transparent text-gray-900 dark:text-white py-12"
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              {...containerMotion}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left/main content */}
              <div className="lg:col-span-7 lg:col-start-2 xl:col-start-2 flex flex-col items-start text-left">
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 leading-tight break-words pt-2 md:pt-6">
                  Heya 👋, I&apos;m
                </p>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-snug text-indigo-600 dark:text-indigo-400 pb-3 font-mono">
                  Vinay Kushwah
                </h1>

                <div aria-live="polite" aria-atomic="true" className="mb-2">
                  <TextScrambler
                    texts={[
                      "Full Stack Developer",
                      "Backend Developer",
                      "Software Engineer",
                    ]}
                    speed={50}
                    interval={3000}
                    className="text-lg sm:text-xl md:text-2xl font-semibold inline-block font-mono"
                  />
                </div>

                <h2 className="text-sm sm:text-lg md:text-xl font-medium text-indigo-600 dark:text-indigo-400 my-2">
                  Pune, India
                </h2>

                <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mb-6">
                  Empowering businesses with scalable web applications and
                  clean, modern code. I bring{" "}
                  <span className="font-semibold">{years}+ years</span> of
                  real-world MERN stack experience — from intuitive frontends to
                  optimized backends. Let’s build something impactful together.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-2">
                  <a
                    href="/Vinay_Kushwah_Resume_2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View resume as PDF in a new tab"
                    className="inline-flex items-center justify-center bg-indigo-600 text-white px-4 sm:px-6 py-2.5 rounded-full hover:bg-indigo-700 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    View Resume
                  </a>

                  <a
                    href="#contact"
                    aria-label="Jump to contact section"
                    className="inline-flex items-center justify-center border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 px-4 sm:px-6 py-2.5 rounded-full hover:bg-indigo-50 dark:hover:bg-indigo-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                  >
                    Contact Me
                  </a>
                </div>
              </div>

              {/* Right visual: on small screens it will flow below the text */}
              <div className="lg:col-span-4 lg:col-start-10 flex items-center justify-center">
                <div className="w-full flex justify-center">
                  {/* Use responsive width: min(95vw, 520px) ensures it fits phones */}
                  <CodeVisual
                    lines={codeLines}
                    speed={22}
                    lineDelay={700}
                    loop={true}
                    className="w-[min(95vw,520px)]"
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
