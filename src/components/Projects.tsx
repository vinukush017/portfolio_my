import React, { useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import SectionHeader from "./SectionHeader";
import CtaButton from "./CtaButton";

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
      "A focused workspace for organizing tasks, setting priorities, and switching between board and list views.",
    link: "https://my-task-board-frontend.vercel.app/",
    images: [
      "/projects/my-task-board-frontend-main-white.webp",
      "/projects/my-task-board-app-login.webp",
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
      "Vehicle registration and customer management, connected through secure access, cloud storage, and communication tools.",
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
      "Create document-trained AI assistants and embed conversational support directly into a website.",
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
      "A mobile-first home for Hindi devotional content, from bhajans and shlokas to chalisas.",
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
      "Discover science, history, and everyday curiosities through themed collections and simple content filters.",
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
    <div className="absolute flex items-center gap-0 px-1 py-0 -translate-x-1/2 rounded-full bottom-3 left-1/2 bg-black/50 ">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          aria-label={`${labelPrefix} screenshot ${index + 1}`}
          aria-current={index === active ? "true" : undefined}
          onClick={() => onSelect(index)}
          className="flex items-center justify-center w-8 rounded-full h-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
  const number = String(index + 1).padStart(2, "0");

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
    <div className="project-entry">
      <motion.article
        initial={reduceMotion ? false : { y: 24 }}
        whileInView={{ y: 0 }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }
        }
        className="project-card group"
      >
      {/* Project media */}
      <div className="project-media relative order-1 lg:order-2">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 dark:border-white/20 dark:bg-surface">
          <div className="project-preview-bar" aria-hidden="true">
            <span className="project-window-dots"><i /><i /><i /></span>
            <span>{new URL(project.link).hostname}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </div>
          <div className="aspect-[16/11] overflow-hidden sm:aspect-[16/10]">
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
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#f3f4f1] px-8 dark:bg-surface">
                <div className="relative text-center">
                  <p className="font-sans text-xs font-medium uppercase tracking-[0.2em] text-accent-dark dark:text-accent-light">
                    Selected work
                  </p>

                  <p className="mt-4 font-heading text-3xl font-semibold tracking-[-0.04em] text-gray-950 dark:text-white sm:text-4xl">
                    {project.title}
                  </p>

                  <p className="max-w-xs mx-auto mt-3 type-body text-gray-500 dark:text-slate-300">
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
                className="absolute inline-flex items-center justify-center w-11 h-11 text-white transition-all -translate-y-1/2 border rounded-full opacity-100 left-3 top-1/2 border-white/20 bg-black/45  hover:bg-black/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>

              <button
                type="button"
                aria-label={`Next ${project.title} screenshot`}
                onClick={showNextImage}
                className="absolute inline-flex items-center justify-center w-11 h-11 text-white transition-all -translate-y-1/2 border rounded-full opacity-100 right-3 top-1/2 border-white/20 bg-black/45  hover:bg-black/65 focus:outline-none focus-visible:ring-2 focus-visible:ring-white lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100"
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
      </div>

      {/* Project information */}
      <div className="project-information relative z-10 order-2 lg:order-1">
        {/* Metadata */}
        <p className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-accent-dark dark:text-accent-light sm:text-xs">
          <span className="mr-3 font-mono site-text-subtle">{number}</span>{project.category}
        </p>

        {/* Title */}
        <h3 className="mt-3 font-heading type-card-title text-gray-950 transition-colors dark:text-white ">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-4 type-body text-gray-600 dark:text-slate-300 ">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="grid grid-cols-1 gap-2 mt-5 min-[480px]:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <span
                aria-hidden="true"
                className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-accent dark:bg-accent-light"
              />

              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-6">
          {project.stack.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 font-sans text-xs font-medium text-gray-600 dark:border-white/20 dark:bg-white/[0.03] dark:text-slate-300 sm:text-xs"
            >
              {technology}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-7">
          <CtaButton href={project.link} external variant={index === 0 ? "primary" : "secondary"} className="inline-flex">
            View Live Project
          </CtaButton>
        </div>
      </div>
      </motion.article>
    </div>
  );
};

const Projects: React.FC = () => {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="site-divider border-b py-20 sm:py-24 lg:py-32"
    >
      <div className="section-shell">
        <div id="projects-heading">
          <SectionHeader
            subtitle="01 / Selected Work"
            title={
              <>
                Projects Built{" "}
                <span className="text-accent-dark dark:text-accent-light">
                  Around Real Problems
                </span>
                .
              </>
            }
            description="A selection of applications I've built across full-stack development, APIs, cloud integrations, AI, and responsive product experiences."
          />
        </div>

        <div className="project-list">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
