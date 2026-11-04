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
      className="site-divider border-b py-20 sm:py-24 lg:py-32"
    >
      <div className="section-shell">
        <div id="expertise-heading">
          <SectionHeader
            subtitle="03 / Expertise"
            title={
              <>
                Technology With a{" "}
                <span className="heading-accent">
                  Purpose
                </span>
                .
              </>
            }
            description="A practical engineering toolkit shaped by production work across backend systems, web applications, databases, APIs, and cloud integrations."
          />
        </div>

        <div className="expertise-grid">
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
              className="expertise-card"
            >
              {/* Group information */}
              <div className="expertise-heading">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs font-medium text-theme-accent">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>

                  <h3 className="font-heading type-card-title text-theme-heading">
                    {group.name}
                  </h3>
                </div>

                <p className="mt-3 max-w-sm type-body site-text-muted">
                  {group.description}
                </p>
              </div>

              {/* Skills */}
              <ul className="expertise-tools">
                {group.items.map((skill) => (
                  <li
                    key={skill.name}
                    className="expertise-tool group/skill"
                  >
                    <span
                      aria-hidden="true"
                      className="expertise-icon flex-shrink-0 text-xl"
                    >
                      {skill.icon}
                    </span>

                    <span className="text-sm font-medium site-text-primary">
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
