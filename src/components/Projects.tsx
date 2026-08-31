import React, { useState } from "react";
import {
  ArrowUpRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader";

type Project = {
  title: string;
  category: string;
  description: string;
  link: string;
  images: string[];
  stack: string[];
  highlights: string[];
};

const projects: Project[] = [
  {
    title: "My Task Board",
    category: "Full-stack productivity application",
    description:
      "A full-stack task management application designed around practical productivity workflows, with authentication, prioritization, status tracking, filters, due dates, and multiple task views.",
    link: "https://my-task-board-frontend.vercel.app/",
    images: [
      "/projects/my-task-board-app-login.webp",
      "/projects/my-task-board-frontend-main-white.webp",
      "/projects/my-task-board-frontend-main-table.webp",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    highlights: [
      "Authentication",
      "Board & list views",
      "Task prioritization",
      "PostgreSQL data layer",
    ],
  },
  {
    title: "Car Daddy CRM",
    category: "Customer management platform",
    description:
      "A scalable vehicle registration and customer management platform with secure authentication, cloud storage, and real-time communication integrations.",
    link: "https://www.cardaddys.co.uk/",
    images: [],
    stack: ["React", "Node.js", "MongoDB", "AWS S3", "JWT"],
    highlights: [
      "JWT authentication",
      "AWS S3 integration",
      "Customer management",
      "WhatsApp & email integrations",
    ],
  },
  {
    title: "DropChat AI",
    category: "AI chatbot platform",
    description:
      "An AI chatbot builder that allows users to create document-trained assistants and embed them into external websites using OpenAI-powered conversational workflows.",
    link: "https://app.dropchat.co/",
    images: [],
    stack: ["OpenAI", "React", "Node.js", "MongoDB"],
    highlights: [
      "OpenAI integration",
      "Document training",
      "Embeddable chatbots",
      "AI-powered conversations",
    ],
  },
  {
    title: "DharmaPath",
    category: "Content platform",
    description:
      "A Hindi spiritual content platform providing bhajans, shlokas, chalisas, and other devotional knowledge through a clean, responsive, mobile-first interface.",
    link: "https://dharmapath.in",
    images: [
      "/projects/dharmapath-1.webp",
      "/projects/dharmapath-2.webp",
      "/projects/dharmapath-3.webp",
      "/projects/dharmapath-4.webp",
      "/projects/dharmapath-5.webp",
      "/projects/dharmapath-6.webp",
      "/projects/dharmapath-7.webp",
    ],
    stack: ["React", "Tailwind CSS"],
    highlights: [
      "Mobile-first design",
      "Responsive UI",
      "Hindi content experience",
      "Reusable React components",
    ],
  },
  {
    title: "FactGully",
    category: "Fact discovery platform",
    description:
      "A fact-sharing platform that organizes engaging content around daily themes including science, history, myths, and other educational topics.",
    link: "https://fact-gully.vercel.app",
    images: [
      "/projects/fact-gully.webp",
      "/projects/screencapture-fact-gully-vercel-app-filter.webp",
      "/projects/screencapture-fact-gully-vercel-app-contact.webp",
      "/projects/screencapture-fact-gully-vercel-app.webp",
      "/projects/screencapture-fact-gully-vercel-app-about.webp",
    ],
    stack: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Vercel"],
    highlights: [
      "Content filtering",
      "Responsive interface",
      "MongoDB integration",
      "Category-based discovery",
    ],
  },
];

type SlideDotsProps = {
  count: number;
  active: number;
  onSelect: (index: number) => void;
  labelPrefix: string;
};

const SlideDots = ({
  count,
  active,
  onSelect,
  labelPrefix,
}: SlideDotsProps) => {
  if (count <= 1) return null;

  return (
    <div className="absolute flex items-center gap-1 px-2 py-1 -translate-x-1/2 rounded-full bottom-3 left-1/2 bg-black/50 backdrop-blur-md">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`${labelPrefix} screenshot ${index + 1}`}
          aria-current={index === active ? "true" : undefined}
          onClick={() => onSelect(index)}
          className="flex items-center justify-center w-6 rounded-full h-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span
            className={`block h-1.5 rounded-full transition-all duration-300 ${
              index === active
                ? "w-4 bg-white"
                : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const reduceMotion = useReducedMotion();
  const [imageIndex, setImageIndex] = useState(0);

  const hasImages = project.images.length > 0;
  const hasMultipleImages = project.images.length > 1;

  const showPreviousImage = () => {
    if (!hasImages) return;

    setImageIndex((current) =>
      current === 0 ? project.images.length - 1 : current - 1,
    );
  };

  const showNextImage = () => {
    if (!hasImages) return;

    setImageIndex((current) =>
      current === project.images.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              duration: 0.5,
              delay: Math.min(index * 0.06, 0.18),
              ease: [0.22, 1, 0.36, 1],
            }
      }
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-[0_24px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#111419] dark:hover:border-white/20 dark:hover:shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
    >
      {/* Project media */}
      <div className="relative overflow-hidden border-b border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-[#0b0d10]">
        <div className="aspect-[16/10] overflow-hidden">
          {hasImages ? (
            <motion.img
              key={`${project.title}-${imageIndex}`}
              src={project.images[imageIndex]}
              alt={`${project.title} screenshot ${imageIndex + 1}`}
              loading="lazy"
              decoding="async"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
            />
          ) : (
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#f3f4f1] px-8 dark:bg-[#0d1014]">
              {/* Decorative grid */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-20"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(15,23,42,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.07) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              <div
                aria-hidden="true"
                className="absolute rounded-full pointer-events-none -right-12 -top-12 h-44 w-44 bg-indigo-400/15 blur-3xl dark:bg-cyan-400/10"
              />

              <div className="relative text-center">
                <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-indigo-600 dark:text-cyan-400">
                  Selected work
                </p>

                <p className="mt-4 font-heading text-3xl font-semibold tracking-[-0.04em] text-gray-950 dark:text-white sm:text-4xl">
                  {project.title}
                </p>

                <p className="max-w-xs mx-auto mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {project.category}
                </p>
              </div>
            </div>
          )}
        </div>

        {hasMultipleImages && (
          <>
            <button
              type="button"
              aria-label={`Previous ${project.title} screenshot`}
              onClick={showPreviousImage}
              className="absolute inline-flex items-center justify-center w-10 h-10 text-white transition-all -translate-y-1/2 border rounded-full opacity-100 left-3 top-1/2 border-white/20 bg-black/45 backdrop-blur-md hover:bg-black/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:opacity-0 lg:group-hover:opacity-100"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            <button
              type="button"
              aria-label={`Next ${project.title} screenshot`}
              onClick={showNextImage}
              className="absolute inline-flex items-center justify-center w-10 h-10 text-white transition-all -translate-y-1/2 border rounded-full opacity-100 right-3 top-1/2 border-white/20 bg-black/45 backdrop-blur-md hover:bg-black/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:opacity-0 lg:group-hover:opacity-100"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>

            <SlideDots
              count={project.images.length}
              active={imageIndex}
              onSelect={setImageIndex}
              labelPrefix={project.title}
            />
          </>
        )}
      </div>

      {/* Project content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6 lg:p-7">
        {/* Category */}
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-indigo-600 dark:text-cyan-400 sm:text-[11px]">
          {project.category}
        </p>

        {/* Title */}
        <div className="flex items-start justify-between gap-5 mt-3">
          <h3 className="font-heading text-2xl font-semibold tracking-[-0.035em] text-gray-950 dark:text-white sm:text-[1.7rem]">
            {project.title}
          </h3>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} in a new tab`}
            className="inline-flex items-center justify-center flex-none w-10 h-10 text-gray-700 transition-all border border-gray-200 rounded-full hover:border-gray-950 hover:bg-gray-950 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/15 dark:text-gray-300 dark:hover:border-white dark:hover:bg-white dark:hover:text-gray-950"
          >
            <ArrowUpRightIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Description */}
        <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-[15px]">
          {project.description}
        </p>

        {/* Highlights */}
        <div className="mt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500">
            Engineering highlights
          </p>

          <ul className="grid grid-cols-1 gap-2 mt-3 sm:grid-cols-2">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
              >
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-indigo-500 dark:bg-cyan-400"
                />

                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-7">
          <div className="pt-5 border-t border-gray-200 dark:border-white/10">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 font-mono text-[10px] font-medium text-gray-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400 sm:text-[11px]"
                >
                  {technology}
                </span>
              ))}
            </div>

            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 text-sm font-semibold group/link text-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-white"
            >
              View live project
              <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="border-b border-gray-200 bg-[#f7f7f2] py-16 dark:border-white/10 dark:bg-[#0d0f13] sm:py-20 lg:py-28"
    >
      <div className="section-shell">
        <div id="projects-heading">
          <SectionHeader
            subtitle="01 / Selected Work"
            title="Projects built around real problems."
            description="A selection of applications I've built across full-stack development, APIs, cloud integrations, AI, and responsive product experiences."
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
