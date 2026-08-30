import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  ArrowUpRightIcon,
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  SECTION_LINKS,
  scrollToSection,
  type SectionId,
} from "../config/navigation";

const RESUME_PATH = "/Vinay_Kushwah_Resume_2025.pdf";

const Navbar = () => {
  const reduceMotion = useReducedMotion();

  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") return true;
    if (savedTheme === "light") return false;

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuWasOpen = useRef(false);

  const { scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.25,
  });

  /*
   * Navbar background
   */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /*
   * Active navigation section
   */
  useEffect(() => {
    const sectionIds: SectionId[] = [
      "home",
      ...SECTION_LINKS.map(({ id }) => id),
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id as SectionId);
        }
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: [0, 0.25, 0.5],
      },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /*
   * Theme
   */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);

    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  /*
   * Mobile navigation
   */
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (menuOpen) {
      document.body.style.overflow = "hidden";
      menuWasOpen.current = true;
    } else {
      document.body.style.overflow = previousOverflow;

      if (menuWasOpen.current) {
        menuButtonRef.current?.focus();
        menuWasOpen.current = false;
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  const navigateTo = (sectionId: SectionId) => {
    setMenuOpen(false);
    scrollToSection(sectionId);
  };

  return (
    <>
      {/* Skip navigation */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-gray-950 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <motion.header
        initial={
          reduceMotion
            ? false
            : {
                y: -16,
                opacity: 0,
              }
        }
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }
        }
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled || menuOpen
            ? "border-gray-200/80 bg-[#f8f8f4]/95 shadow-[0_8px_30px_rgba(15,23,42,0.04)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0b0d10]/95 dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
            : "border-transparent bg-[#f8f8f4]/80 backdrop-blur-md dark:bg-[#0b0d10]/80"
        }`}
      >
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          {/* Brand */}
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              navigateTo("home");
            }}
            aria-label="Vinay Kushwah — Home"
            className="inline-flex items-center rounded-md group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-gray-950"
          >
            <span className="font-heading text-xl font-bold tracking-[-0.04em] text-gray-950 dark:text-white">
              VK
              <span className="text-indigo-600 transition-colors group-hover:text-indigo-500 dark:text-cyan-400">
                .
              </span>
            </span>
          </a>

          {/* Desktop navigation */}
          <div className="items-center hidden gap-1 lg:flex">
            {SECTION_LINKS.map(({ id, label }) => {
              const active = activeSection === id;

              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    navigateTo(id);
                  }}
                  aria-current={active ? "location" : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    active
                      ? "text-gray-950 dark:text-white"
                      : "text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  {label}

                  {active && (
                    <motion.span
                      layoutId="active-navigation"
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-[18px] h-0.5 rounded-full bg-indigo-600 dark:bg-cyan-400"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : {
                              type: "spring",
                              stiffness: 420,
                              damping: 35,
                            }
                      }
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={() => setIsDark((current) => !current)}
              aria-label={
                isDark ? "Switch to light theme" : "Switch to dark theme"
              }
              title={isDark ? "Light theme" : "Dark theme"}
              className="inline-flex items-center justify-center w-10 h-10 text-gray-600 transition-colors rounded-full hover:bg-gray-200/70 hover:text-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? "sun" : "moon"}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          rotate: -20,
                          scale: 0.8,
                        }
                  }
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 0,
                          rotate: 20,
                          scale: 0.8,
                        }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.15,
                  }}
                  className="flex"
                >
                  {isDark ? (
                    <SunIcon className="w-5 h-5" />
                  ) : (
                    <MoonIcon className="w-5 h-5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Resume */}
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden h-10 items-center gap-1.5 rounded-full bg-gray-950 px-4 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-gray-950 sm:inline-flex"
            >
              Résumé
              <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            {/* Mobile menu */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="inline-flex items-center justify-center w-10 h-10 text-gray-700 transition-colors rounded-full hover:bg-gray-200/70 hover:text-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-gray-200 dark:hover:bg-white/10 dark:hover:text-white lg:hidden"
            >
              {menuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: -8,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: -8,
                    }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.2,
              }}
              className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-gray-200 bg-[#f8f8f4] px-4 pb-6 pt-3 dark:border-white/10 dark:bg-[#0b0d10] lg:hidden"
            >
              <div className="flex flex-col mx-auto max-w-7xl">
                {SECTION_LINKS.map(({ id, label }, index) => {
                  const active = activeSection === id;

                  return (
                    <motion.a
                      key={id}
                      href={`#${id}`}
                      onClick={(event) => {
                        event.preventDefault();
                        navigateTo(id);
                      }}
                      aria-current={active ? "location" : undefined}
                      initial={
                        reduceMotion
                          ? false
                          : {
                              opacity: 0,
                              x: -10,
                            }
                      }
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: reduceMotion ? 0 : index * 0.035,
                      }}
                      className={`group flex min-h-14 items-center justify-between border-b border-gray-200 text-lg font-semibold transition-colors dark:border-white/10 ${
                        active
                          ? "text-indigo-600 dark:text-cyan-400"
                          : "text-gray-950 hover:text-indigo-600 dark:text-white dark:hover:text-cyan-400"
                      }`}
                    >
                      {label}

                      <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </motion.a>
                  );
                })}

                {/* Mobile résumé */}
                <a
                  href={RESUME_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="group mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gray-950 px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-gray-950 sm:hidden"
                >
                  View résumé
                  <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page progress */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-indigo-600 dark:bg-cyan-400"
          style={{
            scaleX: progress,
          }}
        />
      </motion.header>
    </>
  );
};

export default Navbar;
