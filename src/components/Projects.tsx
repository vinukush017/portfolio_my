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

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x: (x / rect.width - 0.5) * 20, y: (y / rect.height - 0.5) * 20 });
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      animate={{
        rotateX: isHovering ? mousePosition.y * 0.5 : 0,
        rotateY: isHovering ? mousePosition.x * 0.5 : 0,
        scale: isHovering ? 1.02 : 1,
      }}
      style={{ transformStyle: "preserve-3d" }}
      className="w-full mx-auto group h-full flex flex-col backdrop-blur-xl bg-gradient-to-br from-white/30 to-indigo-50/20 dark:from-white/10 dark:to-indigo-900/20 border border-indigo-200/30 dark:border-indigo-800/30 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500"
      aria-label={proj.title}
    >
      {/* Media */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
      >
        <div className="aspect-[16/9] w-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 overflow-hidden">
          <motion.img
            src={proj.image[imgIndex]}
            alt={`${proj.title} screenshot ${imgIndex + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
            animate={{
              scale: isHovering ? 1.1 : 1,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {proj.image.length > 1 && (
          <>
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 backdrop-blur-sm text-white px-3 py-2 text-lg opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300 hover:bg-black/80 shadow-lg"
              aria-label={`Previous ${proj.title} image`}
              onClick={prev}
            >
              ‹
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 backdrop-blur-sm text-white px-3 py-2 text-lg opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300 hover:bg-black/80 shadow-lg"
              aria-label={`Next ${proj.title} image`}
              onClick={next}
            >
              ›
            </motion.button>
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
      <div className="flex flex-col flex-grow p-4 sm:p-5 bg-gradient-to-b from-transparent to-white/10 dark:to-gray-900/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
            {proj.title}
          </h3>
          <motion.a
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, x: 2 }}
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 rounded flex items-center gap-1"
            aria-label={`Visit ${proj.title} (opens in new tab)`}
          >
            Visit
            <span className="text-lg">→</span>
          </motion.a>
        </div>

        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {proj.description}
        </p>

        <ul className="mt-auto pt-3 flex flex-wrap gap-2">
          {proj.stack.map((tech, techIndex) => (
            <motion.li
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: techIndex * 0.05 }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 text-indigo-700 dark:text-indigo-200 font-medium border border-indigo-300/50 dark:border-indigo-700/50 shadow-sm">
                {tech}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
};

const Projects: React.FC = () => {
  const items = useMemo(() => projects, []);
  return (
    <section className="py-8 sm:py-12 md:py-16" aria-label="Projects">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
        >
          Projects
        </motion.h2>

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2">
          {items.map((proj, index) => (
            <ProjectCard key={proj.title} proj={proj} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
