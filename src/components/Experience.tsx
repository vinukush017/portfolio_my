import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader";

type ExperienceItem = {
  company: string;
  location: string;
  title: string;
  period: string;
  current?: boolean;
  summary: string;
  achievements: string[];
  stack: string[];
};

const experiences: ExperienceItem[] = [
  {
    company: "SYMBtechnologies",
    location: "Noida, India",
    title: "Software Engineer",
    period: "Nov 2024 — Present",
    current: true,
    summary:
      "Building and improving production web applications across backend services, frontend interfaces, databases, and cloud integrations.",
    achievements: [
      "Optimized Express.js APIs and backend workflows to improve application response times and overall reliability.",
      "Improved MongoDB query performance through indexing, aggregation pipelines, and more efficient data access patterns.",
      "Built reusable React components and structured application state for scalable frontend development.",
      "Implemented secure media upload and storage workflows using AWS S3.",
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "React", "Redux", "AWS S3"],
  },
  {
    company: "ARIPRA Infotech",
    location: "Indore, India",
    title: "Full Stack Developer",
    period: "Feb 2022 — May 2024",
    summary:
      "Worked across frontend and backend systems, building APIs, database-driven features, and maintainable product workflows.",
    achievements: [
      "Designed and developed REST APIs for application features, integrations, and data-driven workflows.",
      "Built and optimized PostgreSQL queries using Knex.js for reliable and efficient data access.",
      "Developed responsive React interfaces and reusable components across multiple product features.",
      "Improved code quality through testing, pull-request reviews, debugging, and ongoing refactoring.",
    ],
    stack: [
      "Node.js",
      "Express.js",
      "React",
      "Redux",
      "PostgreSQL",
      "Knex.js",
      "MongoDB",
    ],
  },
  {
    company: "JERK Trend",
    location: "Pune, India",
    title: "Junior Node.js Developer",
    period: "Jan 2021 — Feb 2022",
    summary:
      "Started my professional engineering journey building backend services and responsive web experiences with the MERN stack.",
    achievements: [
      "Built and maintained Node.js and Express.js backend services for production application features.",
      "Designed REST API endpoints and integrated application data with MongoDB.",
      "Developed responsive React interfaces with a focus on usability across desktop and mobile devices.",
      "Worked on debugging, performance improvements, and maintaining existing application functionality.",
    ],
    stack: ["Node.js", "Express.js", "React", "MongoDB"],
  },
];

const Experience = () => {
  const reduceMotion = useReducedMotion();

  const reveal = (index: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: {
      once: true,
      amount: 0.15,
    },
    transition: reduceMotion
      ? { duration: 0 }
      : {
          duration: 0.5,
          delay: Math.min(index * 0.06, 0.15),
          ease: [0.22, 1, 0.36, 1] as const,
        },
  });

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="site-divider border-b py-16 sm:py-20 lg:py-28"
    >
      <div className="section-shell">
        <div id="experience-heading">
          <SectionHeader
            subtitle="04 / Experience"
            title="Building production software."
            description="My experience spans backend systems, APIs, databases, frontend applications, and cloud integrations — with a focus on reliable software that is easier to scale and maintain."
          />
        </div>

        <div className="border-y border-gray-300 dark:border-white/10">
          {experiences.map((experience, index) => (
            <motion.article
              key={`${experience.company}-${experience.period}`}
              {...reveal(index)}
              className="grid gap-7 border-b border-gray-300 py-8 last:border-b-0 dark:border-white/10 sm:py-10 lg:grid-cols-12 lg:gap-10 lg:py-12"
            >
              {/* Number + Period */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] font-medium text-indigo-600 dark:text-cyan-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {experience.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                      />
                      Current
                    </span>
                  )}
                </div>

                <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-gray-400">
                  {experience.period}
                </p>
              </div>

              {/* Role information */}
              <div className="lg:col-span-4">
                <h3 className="font-heading text-2xl font-semibold tracking-[-0.035em] text-gray-950 dark:text-white sm:text-[1.7rem]">
                  {experience.title}
                </h3>

                <div className="flex flex-wrap items-center mt-2 text-sm gap-x-2 gap-y-1">
                  <p className="font-semibold text-gray-700 dark:text-gray-300">
                    {experience.company}
                  </p>

                  <span
                    aria-hidden="true"
                    className="hidden text-gray-400 sm:inline"
                  >
                    ·
                  </span>

                  <p className="text-gray-500">
                    {experience.location}
                  </p>
                </div>

                <p className="mt-5 max-w-md text-sm leading-7 text-gray-600 dark:text-gray-400">
                  {experience.summary}
                </p>

                {/* Technology stack */}
                <div className="mt-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">
                    Technologies
                  </p>

                  <ul className="flex flex-wrap gap-2 mt-3">
                    {experience.stack.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 font-mono text-[10px] font-medium text-gray-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400 sm:text-[11px]"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contributions */}
              <div className="lg:col-span-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">
                  Selected contributions
                </p>

                <ul className="mt-4 space-y-4">
                  {experience.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex gap-3 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-[15px]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[10px] h-1.5 w-1.5 flex-none rounded-full bg-indigo-600 dark:bg-cyan-400"
                      />

                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
