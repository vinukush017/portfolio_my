import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import {
  FaReact,
  FaNodeJs,
  FaAws,
  FaGitAlt,
  FaJs,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa";
import {
  SiTypescript,
  SiPostgresql,
  SiMongodb,
  SiExpress,
  SiNextdotjs,
  SiTailwindcss,
} from "react-icons/si";

type Skill = {
  name: string;
  icon: JSX.Element;
  category: "Frontend" | "Backend" | "Database" | "Tools";
  proficiency: number; // 0-100
  color: string;
  textColor: string;
};

const skills: Skill[] = [
  // Frontend
  { name: "React.js", icon: <FaReact />, category: "Frontend", proficiency: 95, color: "#06b6d4", textColor: "text-cyan-400" },
  { name: "Next.js", icon: <SiNextdotjs />, category: "Frontend", proficiency: 90, color: "#000000", textColor: "text-gray-900 dark:text-gray-100" },
  { name: "TypeScript", icon: <SiTypescript />, category: "Frontend", proficiency: 92, color: "#3b82f6", textColor: "text-blue-500" },
  { name: "JavaScript", icon: <FaJs />, category: "Frontend", proficiency: 95, color: "#facc15", textColor: "text-yellow-400" },
  { name: "HTML", icon: <FaHtml5 />, category: "Frontend", proficiency: 98, color: "#f97316", textColor: "text-orange-500" },
  { name: "CSS", icon: <FaCss3Alt />, category: "Frontend", proficiency: 95, color: "#60a5fa", textColor: "text-blue-400" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, category: "Frontend", proficiency: 93, color: "#06b6d4", textColor: "text-cyan-400" },
  
  // Backend
  { name: "Node.js", icon: <FaNodeJs />, category: "Backend", proficiency: 92, color: "#22c55e", textColor: "text-green-500" },
  { name: "Express.js", icon: <SiExpress />, category: "Backend", proficiency: 90, color: "#6366f1", textColor: "text-indigo-500" },
  { name: "REST APIs", icon: <SiExpress />, category: "Backend", proficiency: 93, color: "#8b5cf6", textColor: "text-purple-500" },
  
  // Database
  { name: "MongoDB", icon: <SiMongodb />, category: "Database", proficiency: 88, color: "#16a34a", textColor: "text-green-600" },
  { name: "PostgreSQL", icon: <SiPostgresql />, category: "Database", proficiency: 85, color: "#2563eb", textColor: "text-blue-600" },
  
  // Tools
  { name: "AWS S3", icon: <FaAws />, category: "Tools", proficiency: 80, color: "#fb923c", textColor: "text-orange-400" },
  { name: "Git", icon: <FaGitAlt />, category: "Tools", proficiency: 90, color: "#f97316", textColor: "text-orange-500" },
];

const categories = ["Frontend", "Backend", "Database", "Tools"] as const;
const categoryColors = {
  Frontend: { bg: "from-indigo-500/10 to-purple-500/10", border: "border-indigo-500/20", text: "text-indigo-600 dark:text-indigo-400" },
  Backend: { bg: "from-green-500/10 to-emerald-500/10", border: "border-green-500/20", text: "text-green-600 dark:text-green-400" },
  Database: { bg: "from-blue-500/10 to-cyan-500/10", border: "border-blue-500/20", text: "text-blue-600 dark:text-blue-400" },
  Tools: { bg: "from-orange-500/10 to-red-500/10", border: "border-orange-500/20", text: "text-orange-600 dark:text-orange-400" },
};

const Skills = () => (
  <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
    <SectionHeader
      subtitle="Technical Expertise"
      title="Skills & Technologies"
      description="A comprehensive toolkit of modern technologies and frameworks I use to build scalable, performant, and user-friendly applications."
    />

    {/* Skills Introduction */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12 text-center"
    >
      <p className="text-base sm:text-lg text-gray-700 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-6">
        I specialize in the MERN stack and modern web technologies, with deep expertise in 
        building responsive frontends, scalable backends, and cloud-based solutions. Each technology 
        in my toolkit has been battle-tested in production environments.
      </p>
    </motion.div>

    {/* Skills by Category */}
    <div className="space-y-12">
      {categories.map((category, catIdx) => {
        const categorySkills = skills.filter(skill => skill.category === category);
        const categoryStyle = categoryColors[category];

        return (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: catIdx * 0.1 }}
            className="relative"
          >
            {/* Category Header */}
            <div className="mb-6 flex items-center gap-4">
              <h3 className={`text-xl sm:text-2xl font-bold ${categoryStyle.text}`}>
                {category}
              </h3>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-gray-700" />
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {categorySkills.length} {categorySkills.length === 1 ? 'skill' : 'skills'}
              </span>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categorySkills.map((skill, skillIdx) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: catIdx * 0.1 + skillIdx * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  {/* Skill Card */}
                  <div className={`
                    relative bg-white/60 dark:bg-gray-900/60 backdrop-blur-md 
                    border ${categoryStyle.border} 
                    rounded-xl p-4 sm:p-5 
                    shadow-sm hover:shadow-xl 
                    transition-all duration-300 
                    overflow-hidden
                    h-full flex flex-col
                  `}>
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${categoryStyle.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-center">
                      {/* Icon */}
                      <motion.div
                        className={`${skill.textColor} mb-3`}
                        whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="text-4xl sm:text-5xl">
                          {skill.icon}
                        </div>
                      </motion.div>

                      {/* Skill Name */}
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-300">
                        {skill.name}
                      </h4>

                      {/* Proficiency Bar */}
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-gray-500 dark:text-gray-400">Proficiency</span>
                          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{skill.proficiency}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: catIdx * 0.1 + skillIdx * 0.05 + 0.3, ease: "easeOut" }}
                            className="h-full rounded-full"
                            style={{ 
                              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`,
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 rounded-xl"
                      style={{ backgroundColor: skill.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  </section>
);

export default Skills;

