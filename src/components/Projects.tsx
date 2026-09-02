import React, { useRef, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
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
  total,
  scrollYProgress,
}: {
  project: Project;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) => {
  const reduceMotion = useReducedMotion();
  const [imageIndex, setImageIndex] = useState(0);

  const hasImages = project.images.length > 0;
  const hasMultipleImages = project.images.length > 1;
  const number = String(index + 1).padStart(2, "0");
  const isLast = index === total - 1;

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

  // Scroll-driven "receding into the stack" effect: as scroll progress moves
  // through this card's slice of the stack (i.e. the next card scrolls up
  // and begins covering it), this card eases back very slightly. The last
  // card has nothing stacking on top of it, so it never recedes.
  const segment = 1 / total;
  const rangeStart = index * segment;
  const rangeEnd = Math.min(rangeStart + segment, 1);

  const stackScale = useTransform(
    scrollYProgress,
    [rangeStart, rangeEnd],
    [1, isLast ? 1 : 0.95],
  );
  const stackOpacity = useTransform(
    scrollYProgress,
    [rangeStart, rangeEnd],
    [1, isLast ? 1 : 0.88],
  );

  return (
    <div
      style={
        {
          "--i": index,
          zIndex: index + 1,
        } as React.CSSProperties
      }
      className="sticky top-[calc(4.5rem+var(--i)*0.85rem)] pb-5 lg:top-[calc(6rem+var(--i)*2rem)] lg:pb-8"
    >
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
        style={
          reduceMotion
            ? undefined
            : { scale: stackScale, opacity: stackOpacity }
        }
        className="group relative grid grid-cols-1 gap-6 overflow-hidden rounded-3xl border border-gray-200 bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] transition-colors duration-300 hover:border-accent/35 dark:border-white/10 dark:bg-[#111419] dark:hover:border-accent-light/30 sm:p-7 lg:grid-cols-2 lg:items-center lg:gap-10 lg:p-9"
      >
      {/* Decorative project number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-4 left-4 select-none font-heading text-[6rem] font-bold leading-none text-accent/[0.06] sm:text-[8rem] lg:-top-8 lg:left-6 lg:text-[9rem] dark:text-accent-light/[0.06]"
      >
        {number}
      </span>

      {/* Project media */}
      <div className="relative order-1 lg:order-2">
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-[#0b0d10]">
          <div className="aspect-[16/11] overflow-hidden">
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
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#f3f4f1] px-8 dark:bg-[#0d1014]">
                <div
                  aria-hidden="true"
                  className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-accent-light/15 blur-3xl pointer-events-none dark:bg-accent/10"
                />

                <div className="relative text-center">
                  <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-accent-dark dark:text-accent-light">
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
      </div>

      {/* Project information */}
      <div className="relative z-10 order-2 lg:order-1">
        {/* Metadata */}
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-accent-dark dark:text-accent-light sm:text-[11px]">
          {project.category} <span aria-hidden="true">&middot;</span>{" "}
          {project.stack[0]}
        </p>

        {/* Title */}
        <h3 className="mt-3 font-heading text-2xl font-semibold tracking-[-0.035em] text-gray-950 transition-colors dark:text-white sm:text-[1.75rem]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-400 sm:text-[15px]">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="grid grid-cols-1 gap-2 mt-5 sm:grid-cols-2">
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
              className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 font-mono text-[10px] font-medium text-gray-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400 sm:text-[11px]"
            >
              {technology}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-7">
          <CtaButton href={project.link} external variant="primary" className="inline-flex">
            View Live Project
          </CtaButton>
        </div>
      </div>
      </motion.article>
    </div>
  );
};

const Projects: React.FC = () => {
  const stackRef = useRef<HTMLDivElement>(null);

  // A single scroll progress (0 → 1) spanning the whole stack, used to drive
  // each card's subtle "receding into the stack" scale/opacity as the next
  // card scrolls up and covers it.
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="site-divider border-b py-16 sm:py-20 lg:py-28"
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

        <div ref={stackRef} className="relative">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              total={projects.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
