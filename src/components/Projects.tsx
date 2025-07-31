import React from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "My Task Board",
    description:
      "A full-stack productivity app with user authentication, task creation, prioritization, status tracking, and board/list views. Features category filters, due dates, and responsive UI with PostgreSQL and Prisma backend.",
    link: "https://my-task-board-frontend.vercel.app/",
    image: "/projects/my-task-board-frontend-main-white.png",
    stack: ["React", "Node.js", "PostgreSQL", "Prisma", "Tailwind"],
  },
  {
    title: "FactGully",
    description:
      "A fact-sharing platform with daily themes in science, history, and myths. Built in React and Vercel.",
    link: "https://fact-gully.vercel.app",
    image: "/projects/fact-gully.png",
    stack: ["React", "Tailwind", "Vercel"],
  },
  {
    title: "Car Daddy CRM",
    description:
      "Built a scalable car registration and customer management system with JWT auth, AWS S3, and real-time WhatsApp/email integrations.",
    link: "https://www.cardaddys.co.uk/",
    image: "/projects/fact-gully.png",
    stack: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "DropChat AI",
    description:
      "AI chatbot builder with OpenAI APIs, document training, and embeddable bots. Boosted engagement by 40%.",
    link: "https://app.dropchat.co/",
    image: "/projects/fact-gully.png",
    stack: ["OpenAI", "React", "MongoDB"],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Projects
        </h2>

        <div className="grid gap-8 sm:grid-cols-2">
          {projects.map((proj, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group backdrop-blur-md bg-white/20 dark:bg-white/5 border border-white/10 dark:border-white/10 rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-50 object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-500 ease-in-out"
                />
              </div>

              <div className="p-4 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">
                    {proj.title}
                  </h3>
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline transition"
                  >
                    Visit →
                  </a>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-1">
                  {proj.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
