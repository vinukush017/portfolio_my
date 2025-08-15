import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "DharmaPath",
    description:
      "A spiritual platform providing bhajans, shlokas, chalisas, and divine knowledge in Hindi. Built with React, Tailwind CSS, and a mobile-first responsive design.",
    link: "https://dharmapath.in",
    image: [
      "/projects/dharmapath-main.webp",
      "/projects/dharmapath-gods.webp",
      "/projects/dharmapath-divine.webp",
      "/projects/dharmapath-aarti.webp",
    ],
    stack: ["React", "Tailwind CSS"],
  },

  {
    title: "My Task Board",
    description:
      "A full-stack productivity app with user authentication (email/password, Google, and GitHub), task creation, prioritization, status tracking, and board/list views. Features category filters, due dates, and a fully responsive UI. Built with PostgreSQL and Prisma backend.",
    link: "https://my-task-board-frontend.vercel.app/",
    image: [
      "/projects/my-task-board-app-login.webp",
      "/projects/my-task-board-frontend-main-white.webp",
      "/projects/my-task-board-frontend-main-table.webp",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Prisma", "Tailwind"],
  },
  {
    title: "FactGully",
    description:
      "A fact-sharing platform with daily themes in science, history, and myths. Built in React and Vercel.",
    link: "https://fact-gully.vercel.app",
    image: [
      "/projects/fact-gully.webp",
      "/projects/screencapture-fact-gully-vercel-app-filter.webp",
      "/projects/screencapture-fact-gully-vercel-app-contact.webp",
      "/projects/screencapture-fact-gully-vercel-app.webp",
      "/projects/screencapture-fact-gully-vercel-app-about.webp",
    ],
    stack: ["React", "Tailwind", "Vercel", "Node.js", "MongoDB"],
  },
  {
    title: "Vinay Kushwah Portfolio",
    description:
      "A visually polished and interactive developer portfolio showcasing projects, skills, and experience. Built with React, Tailwind CSS, Framer Motion, and a custom canvas-based galaxy background.",
    link: "https://vinay-kushwah.vercel.app",
    image: [
      "/projects/vinay-kushwah.vercel.app_.webp",
      "/projects/vinay-kushwah.vercel.app_(1).webp",
      "/projects/vinay-kushwah.vercel.app_(2).webp",
    ],
    stack: ["React", "Tailwind", "Framer Motion", "Vercel"],
  },
  {
    title: "Car Daddy CRM",
    description:
      "Built a scalable car registration and customer management system with JWT auth, AWS S3, and real-time WhatsApp/email integrations.",
    link: "https://www.cardaddys.co.uk/",
    image: ["/projects/fact-gully.webp"],
    stack: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "DropChat AI",
    description:
      "AI chatbot builder with OpenAI APIs, document training, and embeddable bots. Boosted engagement by 40%.",
    link: "https://app.dropchat.co/",
    image: ["/projects/fact-gully.webp"],
    stack: ["OpenAI", "React", "MongoDB"],
  },
];

// 🔄 Reusable Card Component with Auto Image Slide
const ProjectCard = ({
  proj,
  index,
}: {
  proj: (typeof projects)[0];
  index: number;
}) => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (proj.image.length <= 1) return;

    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % proj.image.length);
    }, 6000); // 6 seconds

    return () => clearInterval(interval);
  }, [proj.image.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group h-full flex flex-col backdrop-blur-md bg-white/20 dark:bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={proj.image[imgIndex]}
          alt={proj.title}
          className="w-full h-60 object-cover  group-hover:scale-110 transition duration-500 ease-in-out"
        />
      </div>

      <div className="flex flex-col flex-grow p-4">
        <div className="flex items-center justify-between mb-2">
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

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          {proj.description}
        </p>

        <div className="mt-auto pt-2 flex flex-wrap gap-2">
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
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Projects
        </h2>

        <div className="grid gap-8 sm:grid-cols-2">
          {projects.map((proj, index) => (
            <ProjectCard key={index} proj={proj} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
