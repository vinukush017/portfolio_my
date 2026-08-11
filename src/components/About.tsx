import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const focusAreas = [
  "Product-minded engineering",
  "Scalable frontend architecture",
  "Reliable APIs and data systems",
  "Performance and maintainability",
];

const About = () => {
  const reduceMotion = useReducedMotion();
  const years = useMemo(() => Math.max(1, new Date().getFullYear() - 2021), []);

  return (
    <section className="border-b border-gray-200 py-16 dark:border-white/10 sm:py-20 lg:py-24" aria-label="About Vinay Kushwah">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="02 / About"
          title="Engineering with purpose."
          description="I connect product thinking with dependable engineering to build software that works for users and businesses."
        />

        <div className="grid gap-8 md:grid-cols-12 md:gap-8 lg:gap-12">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7"
          >
            <p className="font-heading text-2xl font-medium leading-snug tracking-[-0.025em] text-gray-950 dark:text-white sm:text-3xl">
              I&apos;m Vinay, a full-stack engineer focused on turning complicated requirements into clear, maintainable products.
            </p>
            <div className="mt-6 grid gap-4 text-base leading-relaxed text-gray-600 dark:text-gray-400 lg:mt-8 lg:grid-cols-2 lg:gap-5">
              <p>
                My work spans React interfaces, Node.js services, databases, cloud integrations, and the decisions that hold them together.
              </p>
              <p>
                I value thoughtful collaboration, measurable improvements, and systems that remain easy to understand after they ship.
              </p>
            </div>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {focusAreas.map((focus, index) => (
                <li key={focus} className="flex items-center gap-3 border-t border-gray-300 py-3 text-sm font-medium dark:border-white/10">
                  <span className="font-mono text-xs text-indigo-600 dark:text-cyan-400">0{index + 1}</span>
                  {focus}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.dl
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 gap-3 md:col-span-5"
          >
            {[
              [`${years}+`, "Years building products"],
              ["6+", "Selected projects"],
              ["15+", "Technologies used"],
              ["Pune", "Based in India"],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`flex min-h-28 flex-col justify-between rounded-2xl border p-4 sm:min-h-32 md:min-h-36 lg:p-5 ${
                  index === 0
                    ? "border-indigo-600 bg-indigo-600 text-white dark:border-cyan-400 dark:bg-cyan-400 dark:text-gray-950"
                    : "border-gray-300 bg-white text-gray-950 dark:border-white/10 dark:bg-[#111419] dark:text-white"
                }`}
              >
                <dt className={`text-xs font-medium uppercase tracking-[0.12em] ${index === 0 ? "opacity-75" : "text-gray-500"}`}>{label}</dt>
                <dd className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">{value}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
};

export default About;
