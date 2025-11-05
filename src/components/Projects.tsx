import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

type Project = {
  title: string;
  description: string;
  link: string;
  image: string[];
  stack: string[];
};

const RAW_PROJECTS: Project[] = [
  {
    title: "DharmaPath",
    description:
      "A spiritual platform providing bhajans, shlokas, chalisas, and divine knowledge in Hindi. Built with React, Tailwind CSS, and a mobile-first responsive design.",
    link: "https://dharmapath.in",
    image: [
      "/projects/dharmapath-1.webp",
      "/projects/dharmapath-2.webp",
      "/projects/dharmapath-3.webp",
      "/projects/dharmapath-4.webp",
      "/projects/dharmapath-5.webp",
      "/projects/dharmapath-6.webp",
      "/projects/dharmapath-7.webp",
    ],
    stack: ["React", "Tailwind CSS"],
  },
  {
    title: "My Task Board",
    description:
      "A full-stack productivity app with auth, task creation, prioritization, status tracking, and board/list views. Category filters, due dates, and fully responsive UI. PostgreSQL + Prisma backend.",
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
      "A polished interactive developer portfolio. React, Tailwind, Framer Motion, and a custom canvas-based galaxy background.",
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
      "Scalable car registration and customer management with JWT auth, S3, and real-time WhatsApp/email integrations.",
    link: "https://www.cardaddys.co.uk/",
    image: ["/projects/fact-gully.webp"], // replace when you have real shots
    stack: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "DropChat AI",
    description:
      "AI chatbot builder with OpenAI APIs, document training, and embeddable bots.",
    link: "https://app.dropchat.co/",
    image: ["/projects/fact-gully.webp"], // replace when you have real shots
    stack: ["OpenAI", "React", "MongoDB"],
  },
];

// Stable memoized projects
const projects: Project[] = RAW_PROJECTS;

const SlideDots = ({
  count,
  active,
  onSelect,
  labelPrefix,
}: {
  count: number;
  active: number;
  onSelect: (i: number) => void;
  labelPrefix: string;
}) => {
  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`${labelPrefix} slide ${i + 1}`}
          aria-current={i === active ? "true" : undefined}
          onClick={() => onSelect(i)}
          className={[
            "h-2 w-2 rounded-full border border-white/60",
            i === active ? "bg-white" : "bg-white/20 hover:bg-white/40",
          ].join(" ")}
        />
      ))}
    </div>
  );
};

// Reusable Card with smarter autoplay
const ProjectCard = ({ proj, index }: { proj: Project; index: number }) => {
  const reduceMotion = useReducedMotion();
  const [imgIndex, setImgIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(cardRef, {
    margin: "-20% 0px -20% 0px",
    amount: 0.2,
  });
  const hoverRef = useRef(false);
  const intervalRef = useRef<number | null>(null);

  const next = useCallback(() => {
    setImgIndex((prev) => (prev + 1) % Math.max(proj.image.length, 1));
  }, [proj.image.length]);

  const prev = useCallback(() => {
    setImgIndex(
      (prev) =>
        (prev - 1 + Math.max(proj.image.length, 1)) %
        Math.max(proj.image.length, 1)
    );
  }, [proj.image.length]);

  // Autoplay: only when in view, not hovered, not reduced motion, page visible
  useEffect(() => {
    const canPlay =
      isInView &&
      !hoverRef.current &&
      !reduceMotion &&
      proj.image.length > 1 &&
      !document.hidden;

    if (canPlay && intervalRef.current == null) {
      intervalRef.current = window.setInterval(next, 6000);
    }
    if (!canPlay && intervalRef.current != null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current != null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isInView, reduceMotion, proj.image.length, next]);

  // Pause when tab hidden/visible
  useEffect(() => {
    const onVis = () => {
      // trigger effect above by changing dependency via state update pattern
      // no-op; visibility is read inside the effect
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="w-[85%] mx-auto group h-full flex flex-col backdrop-blur-md bg-white/20 dark:bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      aria-label={proj.title}
    >
      {/* Media */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
      >
        <div className="aspect-[16/9] w-full bg-black/5 dark:bg-white/5">
          <img
            src={proj.image[imgIndex]}
            alt={`${proj.title} screenshot ${imgIndex + 1}`}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-in-out"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
          />
        </div>

        {proj.image.length > 1 && (
          <>
            <button
              type="button"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-2 py-1 text-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition"
              aria-label={`Previous ${proj.title} image`}
              onClick={prev}
            >
              ‹
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white px-2 py-1 text-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition"
              aria-label={`Next ${proj.title} image`}
              onClick={next}
            >
              ›
            </button>
            <SlideDots
              count={proj.image.length}
              active={imgIndex}
              onSelect={setImgIndex}
              labelPrefix={proj.title}
            />
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4">
        <div className="flex items-center justify-between mb-2 gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">
            {proj.title}
          </h3>
          <a
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded"
            aria-label={`Visit ${proj.title} (opens in new tab)`}
          >
            Visit →
          </a>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {proj.description}
        </p>

        <ul className="mt-auto pt-2 flex flex-wrap gap-2">
          {proj.stack.map((tech) => (
            <li key={tech}>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-100 font-medium">
                {tech}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
};

const Projects: React.FC = () => {
  const items = useMemo(() => projects, []);
  return (
    <section id="projects" className="py-16" aria-label="Projects">
      <div className="w-[85%] mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Projects
        </h2>

        <div className="grid gap-8 sm:grid-cols-2">
          {items.map((proj, index) => (
            <ProjectCard key={proj.title} proj={proj} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
