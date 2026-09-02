import { motion, useReducedMotion } from "framer-motion";
import { FaAws, FaGitAlt, FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { HiOutlineCloud, HiOutlineServerStack } from "react-icons/hi2";
import SectionHeader from "./SectionHeader";

type Skill = {
  name: string;
  icon: React.ReactNode;
};

type SkillGroup = {
  name: string;
  description: string;
  items: Skill[];
};

const groups: SkillGroup[] = [
  {
    name: "Backend",
    description:
      "APIs, services, integrations, and server-side application logic.",
    items: [
      {
        name: "Node.js",
        icon: <FaNodeJs />,
      },
      {
        name: "Express.js",
        icon: <SiExpress />,
      },
      {
        name: "REST APIs",
        icon: <HiOutlineServerStack />,
      },
      {
        name: "JavaScript",
        icon: <FaJs />,
      },
    ],
  },
  {
    name: "Frontend",
    description:
      "Responsive product interfaces and maintainable component systems.",
    items: [
      {
        name: "React",
        icon: <FaReact />,
      },
      {
        name: "TypeScript",
        icon: <SiTypescript />,
      },
      {
        name: "Next.js",
        icon: <SiNextdotjs />,
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss />,
      },
    ],
  },
  {
    name: "Data",
    description:
      "Relational and document databases for production applications.",
    items: [
      {
        name: "PostgreSQL",
        icon: <SiPostgresql />,
      },
      {
        name: "MongoDB",
        icon: <SiMongodb />,
      },
    ],
  },
  {
    name: "Cloud & Tools",
    description:
      "Cloud services, deployment workflows, and engineering tooling.",
    items: [
      {
        name: "AWS",
        icon: <FaAws />,
      },
      {
        name: "Cloud Integrations",
        icon: <HiOutlineCloud />,
      },
      {
        name: "Git",
        icon: <FaGitAlt />,
      },
    ],
  },
];

const Skills = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="site-divider border-b py-16 sm:py-20 lg:py-28"
    >
      <div className="section-shell">
        <div id="expertise-heading">
          <SectionHeader
            subtitle="03 / Expertise"
            title={
              <>
                Technology With a{" "}
                <span className="text-accent-dark dark:text-accent-light">
                  Purpose
                </span>
                .
              </>
            }
            description="A practical engineering toolkit shaped by production work across backend systems, web applications, databases, APIs, and cloud integrations."
          />
        </div>

        <div className="-mt-4 sm:-mt-6">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={group.name}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                    duration: 0.5,
                    delay: Math.min(groupIndex * 0.06, 0.18),
                    ease: [0.22, 1, 0.36, 1],
                  }
              }
              className="grid gap-6 border-b border-gray-300 pb-8 pt-8 first:pt-6 last:border-b-0 dark:border-white/10 sm:pb-10 sm:pt-10 sm:first:pt-8 lg:grid-cols-12 lg:gap-10"
            >
              {/* Group information */}
              <div className="lg:col-span-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] font-medium text-accent-dark dark:text-accent-light">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>

                  <h3 className="font-heading text-xl font-semibold tracking-[-0.025em] text-gray-950 dark:text-white sm:text-2xl">
                    {group.name}
                  </h3>
                </div>

                <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
                  {group.description}
                </p>
              </div>

              {/* Skills */}
              <ul className="flex flex-wrap gap-3 lg:col-span-8">
                {group.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="group/skill flex min-w-[45%] flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_8px_20px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-[#111419] dark:hover:border-accent-light/40 dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] sm:min-w-[180px] sm:flex-none lg:min-w-[190px]"
                  >
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 text-xl text-gray-400 transition-colors duration-300 group-hover/skill:text-accent dark:text-gray-500 dark:group-hover/skill:text-accent-light"
                    >
                      {skill.icon}
                    </span>

                    <span className="text-sm font-semibold text-gray-950 dark:text-white">
                      {skill.name}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
