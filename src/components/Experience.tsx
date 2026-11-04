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
      "Working across Node.js services, MongoDB, React interfaces, and AWS S3 in production web applications.",
    achievements: [
      "Optimized Express.js request handling and backend workflows to address response-time and reliability issues.",
      "Tuned MongoDB data access using indexes, aggregation pipelines, and query changes.",
      "Built reusable React components and organized application state with Redux.",
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
      "Developed product features across Express.js APIs, PostgreSQL data access, and React interfaces.",
    achievements: [
      "Implemented REST endpoints for product features and third-party integrations.",
      "Built and optimized PostgreSQL queries with Knex.js.",
      "Developed responsive React interfaces and shared components for product features.",
      "Contributed tests, reviewed pull requests, and debugged and refactored existing features.",
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
      "Started with Node.js and Express.js backend development, MongoDB integration, and React interfaces.",
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
      className="site-divider border-b py-20 sm:py-24 lg:py-32"
    >
      <div className="section-shell">
        <div id="experience-heading">
          <SectionHeader
            subtitle="04 / Experience"
            title={
              <>
                Building{" "}
                <span className="heading-accent">
                  Production
                </span>{" "}
                Software.
              </>
            }
            description="My roles since 2021, from Node.js backend development to work across production APIs, databases, and React applications."
          />
        </div>

        <div className="experience-timeline">
          {experiences.map((experience, index) => (
            <motion.article
              key={`${experience.company}-${experience.period}`}
              {...reveal(index)}
              data-current={experience.current || undefined}
              className="experience-entry grid gap-7 lg:grid-cols-12 lg:gap-10"
            >
              {/* Number + Period */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs font-medium text-theme-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {experience.current && (
                    <span className="experience-current inline-flex items-center gap-1.5 rounded-full border border-accent/25 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-theme-accent">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                      />
                      Current
                    </span>
                  )}
                </div>

                <p className="mt-4 font-sans text-xs uppercase leading-relaxed tracking-[0.12em] site-text-subtle">
                  {experience.period}
                </p>
              </div>

              {/* Role information */}
              <div className="lg:col-span-4">
                <h3 className="font-heading type-card-title text-theme-heading ">
                  {experience.title}
                </h3>

                <div className="flex flex-wrap items-center mt-2 text-sm gap-x-2 gap-y-1">
                  <p className="font-semibold site-text-primary">
                    {experience.company}
                  </p>

                  <span
                    aria-hidden="true"
                    className="hidden site-text-subtle sm:inline"
                  >
                    ·
                  </span>

                  <p className="site-text-subtle">
                    {experience.location}
                  </p>
                </div>

                <p className="mt-5 max-w-md type-body site-text-muted">
                  {experience.summary}
                </p>

                {/* Technology stack */}
                <div className="mt-6">
                  <p className="font-sans text-xs uppercase tracking-[0.1em] site-text-subtle">
                    Technologies
                  </p>

                  <ul className="flex flex-wrap gap-2 mt-3">
                    {experience.stack.map((technology) => (
                      <li
                        key={technology}
                        className="rounded-full border site-divider bg-surface-elevated px-2.5 py-1 font-sans text-xs font-medium site-text-muted sm:text-xs"
                      >
                        {technology}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contributions */}
              <div className="lg:col-span-6">
                <p className="font-sans text-xs uppercase tracking-[0.1em] site-text-subtle">
                  Selected contributions
                </p>

                <ul className="mt-4 space-y-4">
                  {experience.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex gap-3 type-body site-text-muted "
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[10px] h-1.5 w-1.5 flex-none rounded-full bg-[var(--site-text-subtle)] opacity-60"
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
