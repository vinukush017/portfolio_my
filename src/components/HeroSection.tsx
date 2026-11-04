"use client";

import { useId } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { ArrowDownIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { motion, useReducedMotion } from "framer-motion";
import CtaButton from "./CtaButton";

const CIRCULAR_TEXT =
  "SOFTWARE ENGINEER • NODE.JS • REACT • TYPESCRIPT • AWS • ".repeat(2);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vinaykushwah017", Icon: FaLinkedin },
  { label: "GitHub", href: "https://github.com/vinukush017", Icon: FaGithub },
  { label: "Instagram", href: "https://www.instagram.com/azad__parinda__17", Icon: FaInstagram },
  { label: "X (Twitter)", href: "https://x.com/Vinay__17", Icon: XIcon },
] as const;

const CircularText = ({
  text,
  size,
  radius,
  fontSize,
  duration = 46,
  direction = "cw",
  reduceMotion,
  className = "",
}: {
  text: string;
  size: number;
  radius: number;
  fontSize: number;
  duration?: number;
  direction?: "cw" | "ccw";
  reduceMotion: boolean;
  className?: string;
}) => {
  const pathId = useId();
  const cx = size / 2;
  const cy = size / 2;
  const d = `M ${cx},${cy - radius} a ${radius},${radius} 0 1,1 -0.01,0 z`;
  const rotateTo = direction === "ccw" ? -360 : 360;

  return (
    <motion.svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      aria-hidden="true"
      style={{ transformOrigin: "50% 50%" }}
      animate={reduceMotion ? undefined : { rotate: rotateTo }}
      transition={
        reduceMotion
          ? undefined
          : { repeat: Infinity, ease: "linear", duration }
      }
    >
      <defs>
        <path id={pathId} d={d} />
      </defs>

      <text
        fill="currentColor"
        fontSize={fontSize}
        letterSpacing="0.22em"
        fontWeight={500}
        className="font-mono uppercase"
      >
        <textPath href={`#${pathId}`} startOffset="0%">
          {text}
        </textPath>
      </text>
    </motion.svg>
  );
};

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
      className="site-divider site-text-primary relative overflow-hidden border-b"
    >
      <div className="section-shell hero-layout relative grid min-h-[calc(100svh-4rem)] items-center gap-12 pb-14 pt-28 sm:pb-20 sm:pt-32 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-32">
        {/* Left content */}
        <div className="lg:col-span-6">
          {/* Role */}
          <motion.div
            {...reveal(0.05)}
            className="mb-7 flex flex-wrap items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.12em] text-gray-600 dark:text-slate-300"
          >
            <span className="text-accent-dark dark:text-accent-light">
              Software Engineer
            </span>

            <span className="h-px w-8 bg-gray-300 dark:bg-white/20" />

            <span>Node.js · TypeScript · React · AWS</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            id="hero-title"
            {...reveal(0.12)}
            className="max-w-5xl font-heading type-hero"
          >
            I Build Scalable
            <br />
            <span className="bg-gradient-to-r from-accent-dark to-accent bg-clip-text text-transparent dark:from-accent-light dark:to-accent-dark">
              Web Systems.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...reveal(0.2)}
            className="mt-7 max-w-[60ch] type-intro text-gray-600 dark:text-gray-300 sm:mt-8"
          >
            I&apos;m{" "}
            <span className="font-semibold text-accent-dark dark:text-accent-light">
              Vinay Kushwah
            </span>
            , a software engineer building reliable backend systems,
            thoughtful integrations, and modern web applications.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            {...reveal(0.3)}
            className="flex flex-wrap items-center gap-3 mt-7 sm:mt-8"
          >
            <CtaButton href="#projects" variant="primary" className="inline-flex">
              View Work
            </CtaButton>

            <a
              href="/Vinay_Kushwah_Resume_2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-gray-300 bg-white/40 px-6 text-sm font-semibold text-gray-900 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-gray-700 dark:bg-white/[0.04] dark:text-white dark:hover:border-accent-light/40 dark:hover:bg-white/10"
            >
              Download CV
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-400 transition-colors duration-200 group-hover:border-accent dark:border-gray-600 dark:group-hover:border-accent-light">
                <ArrowDownIcon className="h-4 w-4 transition-transform duration-200  group-hover:translate-y-0.5" />
              </span>
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div {...reveal(0.38)} className="mt-8 sm:mt-10">
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-gray-500 dark:text-slate-300">
              Follow me
            </p>

            <div className="mt-3 flex items-center gap-1.5">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group flex h-11 w-11 items-center justify-center rounded-full text-gray-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent/10 hover:text-accent-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:text-slate-300 dark:hover:bg-accent-light/10 dark:hover:text-accent-light"
                >
                  <Icon className="h-[18px] w-[18px] transition-transform duration-200 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </motion.div>

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
          className="hero-portrait relative mx-auto mt-4 w-full max-w-[400px] lg:col-span-5 lg:mx-0 lg:ml-auto lg:mt-0"
        >
          <div className="relative mx-auto aspect-square w-[calc(100%-3.5rem)] max-w-[320px] lg:w-[calc(100%-2rem)] lg:max-w-none">
          {/* Outer circular text */}
          <div className="pointer-events-none absolute -inset-7 select-none lg:-inset-8">
            <CircularText
              text={CIRCULAR_TEXT}
              size={480}
              radius={222}
              fontSize={16}
              duration={54}
              direction="ccw"
              reduceMotion={!!reduceMotion}
              className="h-full w-full text-accent-dark dark:text-accent/80"
            />
          </div>

          {/* Solid outer ring */}
          <div
            className={`absolute inset-0 rounded-full border-2 border-accent/35 dark:border-accent/60  ${reduceMotion ? "" : "animate-spin-slow"
              }`}
          />

          {/* Solid inner ring */}
          <div
            className={`absolute inset-5 rounded-full border border-accent-light/35 dark:border-accent-light/45 ${reduceMotion ? "" : "animate-spin-reverse"
              }`}
          />

          {/* Profile image */}
          <div className="absolute inset-9 overflow-hidden rounded-full border border-accent/25 shadow-sm">
            <img
              src="/avatar-optimized.jpg"
              alt="Vinay Kushwah, Software Engineer"
              width={520}
              height={520}
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-center"
            />
          </div>

          </div>
        </motion.div>

        <motion.dl {...reveal(0.42)} className="hero-facts lg:col-span-12" aria-label="At a glance">
          <div className="hero-fact">
            <dd className="hero-fact-value">{years}<span>+</span></dd>
            <dt>Years experience</dt>
          </div>
          <div className="hero-fact">
            <dd className="hero-fact-value">5<span>+</span></dd>
            <dt>Projects shipped</dt>
          </div>
          <div className="hero-fact hero-fact-location">
            <MapPinIcon aria-hidden="true" className="h-4 w-4 shrink-0 text-accent-dark dark:text-accent-light" />
            <div>
              <dd>Pune, India</dd>
              <dt>Based in</dt>
            </div>
          </div>
        </motion.dl>
      </div>
    </section>
  );
};

export default HeroSection;
