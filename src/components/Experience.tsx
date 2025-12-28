import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader";

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
        <SectionHeader
          subtitle="Career Journey"
          title="Professional Experience"
          description="Building impactful solutions across diverse industries, from startups to established companies, delivering measurable results and driving innovation."
        />

        {/* Experience Introduction */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Over the years, I've had the privilege of working with diverse teams and technologies, 
            consistently delivering high-quality solutions that drive business value. My experience spans 
            from junior roles to senior positions, with a focus on continuous growth and learning.
          </p>
        </motion.div>

        {/* Modern Card Stack Design */}
        <div className="relative max-w-5xl mx-auto space-y-6">
          {EXPERIENCES.map((exp, idx) => {
            const isPresent = exp.end === null;
            const gradientConfigs = [
              { from: "from-indigo-500", via: "via-purple-500", to: "to-pink-500" },
              { from: "from-blue-500", via: "via-cyan-500", to: "to-teal-500" },
              { from: "from-purple-500", via: "via-pink-500", to: "to-rose-500" },
            ];
            const gradient = gradientConfigs[idx % gradientConfigs.length];
            const gradientClass = `bg-gradient-to-b ${gradient.from} ${gradient.via} ${gradient.to}`;
            const gradientBrClass = `bg-gradient-to-br ${gradient.from} ${gradient.via} ${gradient.to}`;

            return (
              <motion.article
                key={`${exp.company}-${exp.title}-${exp.start}`}
                initial={reduceMotion ? false : { opacity: 0, x: -30 }}
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={reduceMotion ? undefined : { y: -8, scale: 1.01 }}
                className="group relative"
              >
                {/* Gradient Accent Bar */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${gradientClass} opacity-80 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Main Card */}
                <div className="ml-4 sm:ml-6 glass-enhanced border-indigo-200/50 dark:border-indigo-800/50 rounded-3xl p-7 sm:p-9 shadow-premium hover:shadow-premium-lg transition-all duration-500 overflow-hidden relative card-premium">
                  {/* Background Pattern */}
                  <div className={`absolute inset-0 ${gradientBrClass} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header Section */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div className="flex-1">
                        {/* Role Badge */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 + 0.1 }}
                          className="inline-block mb-3"
                        >
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${gradient.from} ${gradient.via} ${gradient.to} text-white shadow-md`}>
                            {isPresent ? "Current Role" : "Previous Role"}
                          </span>
                        </motion.div>

                        <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                          {exp.title}
                        </h3>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 dark:text-gray-400">
                          <span className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {exp.company}
                          </span>
                        </div>
                      </div>

                      {/* Date Badge */}
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-right">
                          <div className="text-xs text-gray-500 dark:text-gray-500 mb-1">Duration</div>
                          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            <time dateTime={exp.start}>{fmt(exp.start)}</time>
                            <span className="mx-1">—</span>
                            <time dateTime={exp.end ?? ""}>{fmt(exp.end)}</time>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-lg text-xs font-medium bg-gradient-to-r ${gradient.from} ${gradient.via} ${gradient.to} bg-opacity-10 dark:bg-opacity-20 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700`}>
                          {diffYM(exp.start, exp.end)}
                        </span>
                      </div>
                    </div>

                    {/* Achievements List */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                        Key Achievements
                      </h4>
                      <ul className="space-y-3">
                        {exp.description.map((achievement, achIdx) => (
                          <motion.li
                            key={achIdx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 + achIdx * 0.05 + 0.2 }}
                            className="flex items-start gap-3 text-sm sm:text-base text-gray-700 dark:text-gray-300"
                          >
                            <div className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-gradient-to-r ${gradient.from} ${gradient.via} ${gradient.to}`} />
                            <span className="leading-relaxed">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.stack.map((tech, techIdx) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 + techIdx * 0.03 + 0.3 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all duration-300 cursor-default"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${gradientBrClass} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-bl-full`} />
                </div>

                {/* Connection Line (except last) */}
                {idx < EXPERIENCES.length - 1 && (
                  <div className="absolute left-2 sm:left-3 top-full w-0.5 h-6 bg-gradient-to-b from-indigo-300/50 to-transparent" />
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
