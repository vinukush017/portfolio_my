import { useMemo } from "react";
import { ArrowDownRightIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { motion, useReducedMotion } from "framer-motion";

const HeroSection = () => {
  const reduceMotion = useReducedMotion();

  const years = useMemo(() => {
    const start = new Date("2021-01-01T00:00:00");
    const now = new Date();
    const totalMonths =
      (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
    return Math.max(1, Math.floor(totalMonths / 12));
  }, []);

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-gray-200 bg-[#f8f8f4] text-gray-950 dark:border-white/10 dark:bg-[#0b0d10] dark:text-white"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.45] dark:opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "linear-gradient(to bottom, black, transparent 88%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-indigo-400/20 blur-[120px] dark:bg-cyan-400/10"
      />

      <div className="relative mx-auto grid min-h-[100svh] w-full max-w-7xl items-center gap-12 px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:grid-cols-12 md:gap-8 lg:gap-10 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="md:col-span-7 lg:col-span-7">
          <motion.div
            {...reveal(0.05)}
            className="mb-7 flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-gray-600 dark:text-gray-400"
          >
            <span className="text-indigo-600 dark:text-cyan-400">INTRO</span>
            <span className="h-px w-8 bg-gray-300 dark:bg-gray-700" />
            Full-stack developer
          </motion.div>

          <motion.h1
            id="hero-title"
            {...reveal(0.12)}
            className="max-w-5xl font-heading text-[clamp(2.75rem,13vw,3.5rem)] font-semibold leading-[0.96] tracking-[-0.055em] sm:text-6xl md:text-[3.25rem] lg:text-[5.25rem] xl:text-8xl"
          >
            I build fast,
            <br />
            reliable <span className="text-indigo-600 dark:text-cyan-400">digital products.</span>
          </motion.h1>

          <motion.p
            {...reveal(0.2)}
            className="mt-7 max-w-2xl text-base leading-relaxed text-gray-600 dark:text-gray-300 sm:mt-8 sm:text-lg"
          >
            I&apos;m Vinay Kushwah, a full-stack engineer turning complex product ideas into
            scalable React and Node.js experiences that are clear, dependable, and built to grow.
          </motion.p>

          <motion.div
            {...reveal(0.24)}
            className="mt-6 flex items-center gap-3 rounded-2xl border border-gray-300 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5 sm:hidden"
          >
            <img
              src="/avatar-optimized.jpg"
              alt=""
              width={96}
              height={96}
              className="h-14 w-14 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-gray-500">Currently</p>
              <p className="mt-1 truncate text-sm font-semibold">Software Engineer · Pune</p>
            </div>
            <span className="ml-auto h-2.5 w-2.5 flex-none rounded-full bg-emerald-500" aria-label="Available for work" />
          </motion.div>

          <motion.div
            {...reveal(0.3)}
            className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center md:flex-col md:items-stretch lg:flex-row lg:items-center"
          >
            <a
              href="#projects"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gray-950 px-6 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 dark:bg-white dark:text-gray-950 dark:focus-visible:ring-offset-[#0b0d10]"
            >
              Explore my work
              <ArrowDownRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-gray-300 px-6 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-950 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-gray-700 dark:text-white dark:hover:border-gray-500 dark:hover:bg-white/5"
            >
              Let&apos;s talk
              <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </motion.div>

          <motion.dl
            {...reveal(0.38)}
            className="mt-10 grid max-w-2xl grid-cols-2 gap-x-5 gap-y-6 border-t border-gray-300 pt-6 dark:border-gray-700 sm:mt-12 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3"
          >
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500">Experience</dt>
              <dd className="mt-1.5 text-sm font-semibold sm:text-base">{years}+ years</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500">Based in</dt>
              <dd className="mt-1.5 text-sm font-semibold sm:text-base">Pune, India</dd>
            </div>
            <div className="col-span-2 sm:col-span-1 md:col-span-2 lg:col-span-1">
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-gray-500">Core stack</dt>
              <dd className="mt-1.5 text-sm font-semibold sm:text-base">React · Node · TS</dd>
            </div>
          </motion.dl>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden w-full max-w-[430px] sm:block md:col-span-5 md:max-w-none lg:col-span-5 lg:mx-0 lg:ml-auto lg:max-w-[430px]"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-gray-300 bg-gray-200 shadow-[0_24px_60px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-gray-900 dark:shadow-[0_24px_60px_rgba(0,0,0,0.35)] lg:rounded-[2rem]">
            <img
              src="/avatar-optimized.jpg"
              alt="Vinay Kushwah, full-stack developer"
              width={900}
              height={1200}
              fetchPriority="high"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/65 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white lg:p-8">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-white/65">Current focus</p>
              <p className="mt-2 font-heading text-xl font-semibold tracking-tight lg:text-2xl">
                Scalable product engineering
              </p>
            </div>
          </div>

          <div className="absolute -left-4 top-8 rounded-xl border border-gray-200 bg-white/95 p-3 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-gray-950/90 lg:-left-12 lg:top-10 lg:rounded-2xl lg:p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-gray-500">Current role</p>
            <p className="mt-1 text-sm font-semibold text-gray-950 dark:text-white">Software Engineer</p>
          </div>

          <div className="absolute -right-2 bottom-16 rounded-xl border border-gray-200 bg-white/95 p-3 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-gray-950/90 lg:-right-8 lg:bottom-24 lg:rounded-2xl lg:p-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <p className="text-sm font-semibold text-gray-950 dark:text-white">Available for work</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
