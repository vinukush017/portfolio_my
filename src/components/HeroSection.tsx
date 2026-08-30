"use client";

import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import { motion, useReducedMotion } from "framer-motion";

const HeroSection = () => {
  const reduceMotion = useReducedMotion();

  const startYear = 2021;
  const years = new Date().getFullYear() - startYear;

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion
      ? { duration: 0 }
      : {
          duration: 0.5,
          delay,
          ease: [0.22, 1, 0.36, 1] as const,
        },
  });

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-gray-200 bg-[#f8f8f4] text-gray-950 dark:border-white/10 dark:bg-[#0b0d10] dark:text-white"
    >
      {/* Grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.45] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, black, transparent 88%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 88%)",
        }}
      />

      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-indigo-400/20 blur-[120px] dark:bg-cyan-400/10"
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center gap-12 px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:grid-cols-12 md:gap-8 lg:gap-10 lg:px-8 lg:pb-24 lg:pt-32">
        {/* Left content */}
        <div className="md:col-span-7 lg:col-span-7">
          {/* Role */}
          <motion.div
            {...reveal(0.05)}
            className="mb-7 flex flex-wrap items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-gray-600 dark:text-gray-400"
          >
            <span className="text-indigo-600 dark:text-cyan-400">
              Software Engineer
            </span>

            <span className="w-8 h-px bg-gray-300 dark:bg-gray-700" />

            <span>Node.js · TypeScript · React · AWS</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            id="hero-title"
            {...reveal(0.12)}
            className="max-w-5xl font-heading text-[clamp(2.75rem,13vw,3.5rem)] font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl md:text-[3.25rem] lg:text-[5.25rem] xl:text-8xl"
          >
            I build scalable
            <br />
            <span className="text-indigo-600 dark:text-cyan-400">
              web systems.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...reveal(0.2)}
            className="max-w-2xl text-base leading-relaxed text-gray-600 mt-7 dark:text-gray-300 sm:mt-8 sm:text-lg"
          >
            I&apos;m Vinay Kushwah, a software engineer building reliable
            backend systems, APIs, integrations, and modern web applications
            using Node.js, TypeScript, React, and AWS.
          </motion.p>

          {/* Mobile profile card */}
          <motion.div
            {...reveal(0.24)}
            className="flex items-center gap-3 p-3 mt-6 border border-gray-300 rounded-2xl bg-white/70 backdrop-blur-sm dark:border-white/10 dark:bg-white/5 sm:hidden"
          >
            <img
              src="/avatar-optimized.jpg"
              alt=""
              width={56}
              height={56}
              loading="eager"
              decoding="async"
              className="object-cover h-14 w-14 rounded-xl"
            />

            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gray-500">
                Currently
              </p>

              <p className="mt-1 text-sm font-semibold truncate">
                Software Engineer · Pune
              </p>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            {...reveal(0.3)}
            className="flex flex-col gap-3 mt-7 sm:mt-8 sm:flex-row sm:items-center md:flex-col md:items-stretch lg:flex-row lg:items-center"
          >
            <a
              href="#projects"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gray-950 px-6 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 dark:bg-white dark:text-gray-950 dark:focus-visible:ring-offset-[#0b0d10]"
            >
              View my work
              <ArrowDownRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>

            <a
              href="/Vinay-Kushwah-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-gray-300 px-6 text-sm font-semibold text-gray-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-950 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-gray-700 dark:text-white dark:hover:border-gray-500 dark:hover:bg-white/5"
            >
              View résumé
              <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.dl
            {...reveal(0.38)}
            className="grid max-w-2xl grid-cols-2 pt-6 mt-10 border-t border-gray-300 gap-x-5 gap-y-6 dark:border-gray-700 sm:mt-12 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3"
          >
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500">
                Experience
              </dt>

              <dd className="mt-1.5 text-sm font-semibold sm:text-base">
                {years}+ years
              </dd>
            </div>

            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500">
                Based in
              </dt>

              <dd className="mt-1.5 text-sm font-semibold sm:text-base">
                Pune, India
              </dd>
            </div>

            <div className="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1">
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500">
                Core stack
              </dt>

              <dd className="mt-1.5 text-sm font-semibold sm:text-base">
                Node.js · TypeScript · React
              </dd>
            </div>
          </motion.dl>
        </div>

        {/* Right image */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: 0.65,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
          className="relative mx-auto hidden w-full max-w-[430px] sm:block md:col-span-5 md:max-w-none lg:col-span-5 lg:mx-0 lg:ml-auto lg:max-w-[430px]"
        >
          {/* Main portrait */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-gray-300 bg-gray-200 shadow-[0_24px_60px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-gray-900 dark:shadow-[0_24px_60px_rgba(0,0,0,0.35)] lg:rounded-[2rem]">
            <img
              src="/avatar-optimized.jpg"
              alt="Vinay Kushwah, Software Engineer"
              width={900}
              height={1200}
              fetchPriority="high"
              decoding="async"
              className="object-cover object-center w-full h-full"
            />

            {/* Image overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/5 to-transparent"
            />

            {/* Image content */}
            <div className="absolute inset-x-0 bottom-0 p-5 text-white lg:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/65">
                Focus
              </p>

              <p className="mt-2 text-xl font-semibold tracking-tight font-heading lg:text-2xl">
                Backend systems · APIs · Cloud
              </p>
            </div>
          </div>

          {/* Current role floating card */}
          <div className="absolute p-3 border border-gray-200 shadow-xl -left-4 top-8 rounded-xl bg-white/95 backdrop-blur-md dark:border-white/10 dark:bg-gray-950/90 lg:-left-12 lg:top-10 lg:rounded-2xl lg:p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-gray-500">
              Current role
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-950 dark:text-white">
              Software Engineer
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
