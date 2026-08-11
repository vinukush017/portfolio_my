import { motion, useReducedMotion } from "framer-motion";
import { FaAws, FaCss3Alt, FaGitAlt, FaHtml5, FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import { SiExpress, SiMongodb, SiNextdotjs, SiPostgresql, SiTailwindcss, SiTypescript } from "react-icons/si";
import SectionHeader from "./SectionHeader";

const groups = [
  {
    name: "Frontend",
    items: [
      ["React.js", <FaReact />], ["Next.js", <SiNextdotjs />], ["TypeScript", <SiTypescript />],
      ["JavaScript", <FaJs />], ["HTML", <FaHtml5 />], ["CSS", <FaCss3Alt />], ["Tailwind CSS", <SiTailwindcss />],
    ],
  },
  { name: "Backend", items: [["Node.js", <FaNodeJs />], ["Express.js", <SiExpress />], ["REST APIs", <SiExpress />]] },
  { name: "Data", items: [["MongoDB", <SiMongodb />], ["PostgreSQL", <SiPostgresql />]] },
  { name: "Tools", items: [["AWS S3", <FaAws />], ["Git", <FaGitAlt />]] },
] as const;

const Skills = () => {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b border-gray-200 py-16 dark:border-white/10 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="03 / Expertise"
          title="Tools for the whole product."
          description="A practical full-stack toolkit shaped through production work, from interface systems to APIs and cloud infrastructure."
        />

        <div className="space-y-10">
          {groups.map((group, groupIndex) => (
            <motion.div
              key={group.name}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.05 }}
              className="grid gap-4 lg:grid-cols-12"
            >
              <div className="flex items-baseline justify-between lg:col-span-3 lg:block">
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-gray-950 dark:text-white">{group.name}</h3>
                <span className="font-mono text-xs text-gray-500 lg:mt-2 lg:block">{String(group.items.length).padStart(2, "0")}</span>
              </div>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:col-span-9">
                {group.items.map(([name, icon]) => (
                  <li
                    key={name}
                    className="group flex min-h-24 flex-col justify-between rounded-xl border border-gray-300 bg-white p-4 transition-colors hover:border-indigo-500 dark:border-white/10 dark:bg-[#111419] dark:hover:border-cyan-400"
                  >
                    <span className="text-2xl text-gray-500 transition-colors group-hover:text-indigo-600 dark:text-gray-500 dark:group-hover:text-cyan-400">{icon}</span>
                    <span className="text-sm font-semibold text-gray-950 dark:text-white">{name}</span>
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
