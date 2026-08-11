import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const experiences = [
  {
    company: "SYMBtechnologies, Noida", title: "Software Engineer (MERN Stack)", period: "Nov 2024 — Present", current: true,
    achievements: ["Boosted server response speed by 30% with optimized Express.js routes.", "Reduced MongoDB latency by 25% using indexes and aggregation.", "Built scalable React components and Redux state architecture.", "Implemented secure media uploads through AWS S3."],
    stack: ["Node.js", "Express.js", "MongoDB", "React", "Redux", "AWS S3"],
  },
  {
    company: "ARIPRA Infotech, Indore", title: "Full Stack Developer (MERN)", period: "Feb 2022 — May 2024", current: false,
    achievements: ["Engineered REST APIs that improved application performance by 35%.", "Implemented efficient PostgreSQL queries with Knex.js.", "Reduced bugs by 20% through unit testing and pull-request reviews."],
    stack: ["Node.js", "React", "Redux", "MongoDB", "Express.js"],
  },
  {
    company: "JERK Trend, Pune", title: "Junior Node.js Developer", period: "Jan 2021 — Feb 2022", current: false,
    achievements: ["Built a scalable Node.js backend with 20% faster load time.", "Redesigned responsive React interfaces, improving mobile retention by 25%."],
    stack: ["Node.js", "Express.js", "React", "MongoDB"],
  },
];

const Experience = () => {
  const reduceMotion = useReducedMotion();
  return (
    <section className="border-b border-gray-200 py-16 dark:border-white/10 sm:py-20 lg:py-24" aria-label="Professional experience">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader subtitle="04 / Experience" title="Measured work, real outcomes." description="A progression from backend foundations to full-stack product ownership, with improvements measured in speed, reliability, and user impact." />

        <div className="divide-y divide-gray-300 border-y border-gray-300 dark:divide-white/10 dark:border-white/10">
          {experiences.map((experience, index) => (
            <motion.article
              key={experience.company}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid gap-6 py-8 lg:grid-cols-12 lg:gap-10 lg:py-10"
            >
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-indigo-600 dark:text-cyan-400">0{index + 1}</span>
                  {experience.current && <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">Current</span>}
                </div>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-gray-500">{experience.period}</p>
              </div>

              <div className="lg:col-span-4">
                <h3 className="font-heading text-2xl font-semibold tracking-tight text-gray-950 dark:text-white">{experience.title}</h3>
                <p className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">{experience.company}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {experience.stack.map((technology) => <li key={technology} className="rounded-md border border-gray-300 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-gray-600 dark:border-white/10 dark:text-gray-400">{technology}</li>)}
                </ul>
              </div>

              <ul className="space-y-3 lg:col-span-5">
                {experience.achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:text-base">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-indigo-600 dark:bg-cyan-400" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
