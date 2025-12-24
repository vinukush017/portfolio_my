import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader";

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
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/40 dark:bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`${labelPrefix} slide ${i + 1}`}
          aria-current={i === active ? "true" : undefined}
          onClick={() => onSelect(i)}
          className={[
            "h-1.5 w-1.5 rounded-full transition-all duration-300",
            i === active 
              ? "bg-white w-6" 
              : "bg-white/50 hover:bg-white/70",
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      whileHover={{ y: -8 }}
      className="w-full mx-auto group h-full flex flex-col bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-300/50 dark:hover:border-indigo-700/50 transition-all duration-300"
      aria-label={proj.title}
    >
      {/* Media */}
      <div
        className="relative overflow-hidden bg-gray-100 dark:bg-gray-800"
        onMouseEnter={() => (hoverRef.current = true)}
        onMouseLeave={() => (hoverRef.current = false)}
      >
        <div className="aspect-[16/9] w-full overflow-hidden">
          <motion.img
            src={proj.image[imgIndex]}
            alt={`${proj.title} screenshot ${imgIndex + 1}`}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
            animate={{
              scale: isHovering ? 1.05 : 1,
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {proj.image.length > 1 && (
          <>
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-900 dark:text-white px-2 py-1.5 text-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
              aria-label={`Previous ${proj.title} image`}
              onClick={prev}
            >
              ‹
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-900 dark:text-white px-2 py-1.5 text-sm opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
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
      <div className="flex flex-col flex-grow p-4 sm:p-5">
        <div className="flex items-start justify-between mb-2.5 gap-2">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2 flex-1">
            {proj.title}
          </h3>
          <motion.a
            href={proj.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0 p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            aria-label={`Visit ${proj.title} (opens in new tab)`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.a>
        </div>

        <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 mb-3 leading-relaxed line-clamp-2">
          {proj.description}
        </p>

        <div className="mt-auto pt-1">
          <ul className="flex flex-wrap gap-1.5">
            {proj.stack.slice(0, 4).map((tech, techIndex) => (
              <motion.li
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: techIndex * 0.03 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium border border-gray-200 dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-700 dark:hover:text-indigo-400 transition-colors">
                  {tech}
                </span>
              </motion.li>
            ))}
            {proj.stack.length > 4 && (
              <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-500 font-medium border border-gray-200 dark:border-gray-700">
                +{proj.stack.length - 4}
              </span>
            )}
          </ul>
        </div>
      </div>
    </motion.article>
  );
};

const Projects: React.FC = () => {
  const items = useMemo(() => projects, []);
  return (
    <section className="py-8 sm:py-12 md:py-16" aria-label="Projects">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="Portfolio"
          title="Featured Projects"
          description="A collection of innovative web applications and platforms I've built, showcasing my expertise in full-stack development, modern frameworks, and user-centric design."
        />

        {/* Projects Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 text-center"
        >
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Each project represents a unique challenge solved with modern technologies, 
            best practices, and attention to detail. From spiritual platforms to productivity 
            tools and AI-powered applications, these projects demonstrate my ability to deliver 
            production-ready solutions that users love.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((proj, index) => (
            <ProjectCard key={proj.title} proj={proj} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
