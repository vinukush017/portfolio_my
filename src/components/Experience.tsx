import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Experience = {
  company: string;
  title: string;
  start: string; // "YYYY-MM"
  end?: string | null; // null => Present
  description: string[];
  stack: string[];
};

const EXPERIENCES: Experience[] = [
  {
    company: "SYMBtechnologies, Noida",
    title: "Software Engineer (MERN Stack)",
    start: "2024-11",
    end: null,
    description: [
      "Boosted server response speed by 30% with optimized Express.js routes.",
      "Reduced MongoDB latency by 25% using indexes and aggregation.",
      "Built scalable React components and implemented Redux for global state.",
      "Handled secure media uploads via AWS S3 integration.",
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "React", "Redux", "AWS S3"],
  },
  {
    company: "ARIPRA Infotech, Indore",
    title: "Full Stack Developer (MERN)",
    start: "2022-02",
    end: "2024-05",
    description: [
      "Engineered RESTful APIs with Express.js, improving performance by 35%.",
      "Implemented efficient SQL queries with PostgreSQL + Knex.js.",
      "Reduced bugs by 20% through unit testing and PR reviews.",
    ],
    stack: ["Node.js", "Redux", "React", "MongoDB", "Express.js"],
  },
  {
    company: "JERK Trend, Pune",
    title: "Junior Node.js Developer",
    start: "2021-01",
    end: "2022-02",
    description: [
      "Built scalable backend using Node.js and Express with 20% faster load time.",
      "Redesigned responsive UIs with React, improving mobile retention by 25%.",
    ],
    stack: ["Node.js", "Express.js", "React", "MongoDB"],
  },
];

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const fmt = (iso?: string | null) => {
  if (!iso) return "Present";
  const [y, m] = iso.split("-").map(Number);
  return `${monthNames[(m ?? 1) - 1]} ${y}`;
};
const diffYM = (startISO: string, endISO?: string | null) => {
  const s = new Date(startISO + "-01T00:00:00");
  const e = endISO ? new Date(endISO + "-01T00:00:00") : new Date();
  let months =
    (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  if (months < 0) months = 0;
  const y = Math.floor(months / 12),
    m = months % 12;
  return (
    [
      y ? `${y} yr${y > 1 ? "s" : ""}` : "",
      m ? `${m} mo${m > 1 ? "s" : ""}` : "",
    ]
      .filter(Boolean)
      .join(" ") || "Less than 1 mo"
  );
};

const Experience: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-label="Professional experience"
      className="mt-8 sm:mt-10 py-8 sm:py-12 md:py-16"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
        >
          Experience
        </motion.h2>

        {/* Timeline wrapper */}
        <ol
          className="
            relative mx-auto w-full max-w-5xl
            before:content-[''] before:absolute before:top-0 before:bottom-0 before:w-px
            before:left-4 md:before:left-1/2
            before:bg-gradient-to-b before:from-indigo-300/60 before:to-indigo-500/60
          "
        >
        {EXPERIENCES.map((exp, idx) => {
          const leftSide = idx % 2 === 0; // alternate on md+
          return (
            <motion.li
              key={`${exp.company}-${exp.title}-${exp.start}`}
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true, amount: 0.25 }}
              className="relative mb-12 pl-12 md:pl-0"
            >
              {/* Timeline dot */}
              <motion.span
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                className="
                  absolute left-4 md:left-1/2 md:-translate-x-1/2
                  top-20 h-4 w-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg
                  ring-4 ring-white dark:ring-gray-950
                "
              />
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.3 }}
                className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-20 h-4 w-4 rounded-full bg-indigo-400/30 animate-ping"
              />

              {/* Card: full width on mobile, alternating on md+ */}
              <motion.article
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ duration: 0.3 }}
                className={[
                  "mt-0 md:mt-0",
                  "rounded-lg sm:rounded-xl border border-indigo-200/30 dark:border-indigo-800/30 bg-gradient-to-br from-gray-100/90 to-indigo-50/50 dark:from-gray-900/80 dark:to-indigo-900/30 backdrop-blur-xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300",
                  "md:w-[calc(50%-2.5rem)]", // leave gutter from the center line
                  leftSide ? "md:mr-auto md:pr-6" : "md:ml-auto md:pl-6",
                ].join(" ")}
                aria-label={`${exp.title} at ${exp.company}`}
              >
                <header className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{exp.company}</span>{" "}
                    <span className="mx-1 text-indigo-500">—</span>
                    <time dateTime={exp.start} className="font-medium">{fmt(exp.start)}</time>
                    {" – "}
                    <time dateTime={exp.end ?? ""} className="font-medium">{fmt(exp.end)}</time>
                    <span className="mx-2 text-indigo-400">•</span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                      {diffYM(exp.start, exp.end)}
                    </span>
                  </p>
                </header>

                <ul className="list-disc list-inside space-y-1.5 text-gray-800 dark:text-gray-300 text-sm">
                  {exp.description.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {exp.stack.map((tech, techIdx) => (
                    <motion.li
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: techIdx * 0.05 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <span className="bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-200 text-xs px-3 py-1 rounded-full font-medium border border-indigo-300/50 dark:border-indigo-700/50 shadow-sm">
                        {tech}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            </motion.li>
          );
        })}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
