import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Bars3Icon,
  BriefcaseIcon,
  CodeBracketIcon,
  EnvelopeIcon,
  FolderIcon,
  MoonIcon,
  PencilSquareIcon,
  SunIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  SECTION_LINKS,
  scrollToSection,
  type NavigationSectionId,
  type SectionId,
} from "../config/navigation";
import CtaButton from "./CtaButton";

const NAV_ICONS: Record<NavigationSectionId, typeof FolderIcon> = {
  projects: FolderIcon,
  about: UserCircleIcon,
  expertise: CodeBracketIcon,
  experience: BriefcaseIcon,
  writing: PencilSquareIcon,
  contact: EnvelopeIcon,
};

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

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuWasOpen = useRef(false);

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
  useLayoutEffect(() => {
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

      if (event.key === "Tab" && menuOpen && headerRef.current) {
        const focusableElements = Array.from(
          headerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((element) => element.offsetParent !== null);

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    const closeMenuAtDesktop = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        closeMenu();
      }
    };

    window.addEventListener("hashchange", closeMenu);
    window.addEventListener("popstate", closeMenu);
    window.addEventListener("resize", closeMenuAtDesktop);

    return () => {
      window.removeEventListener("hashchange", closeMenu);
      window.removeEventListener("popstate", closeMenu);
      window.removeEventListener("resize", closeMenuAtDesktop);
    };
  }, []);

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

      <AnimatePresence>
        {menuOpen && (
          <motion.button
            type="button"
            aria-label="Close navigation menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={() => setMenuOpen(false)}
            tabIndex={-1}
            className="site-menu-backdrop fixed inset-0 z-40 backdrop-blur-[2px] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.header
        ref={headerRef}
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
        className="pointer-events-none fixed inset-x-3 top-3 z-50 transition-all duration-300 sm:inset-x-4 sm:top-4"
      >
        <nav
          aria-label="Primary navigation"
          data-raised={scrolled || menuOpen}
          className="section-shell floating-nav-surface pointer-events-auto relative flex h-14 items-center justify-between rounded-full border px-4 transition-[background-color,border-color,box-shadow] duration-300 lg:h-16 lg:px-5"
        >
          {/* Brand */}
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              navigateTo("home");
            }}
            aria-label="Vinay Kushwah — Home"
            className="inline-flex items-center rounded-md group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 dark:focus-visible:ring-offset-gray-950"
          >
            <span className="font-heading text-xl font-bold tracking-[-0.04em] text-gray-950 dark:text-white">
              VK
              <span className="text-accent transition-colors group-hover:text-accent-dark dark:text-accent-light">
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
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    active
                      ? "text-accent dark:text-accent-light"
                      : "text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  {label}

                  {active && (
                    <motion.span
                      layoutId="active-navigation"
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-[11px] h-0.5 rounded-full bg-accent dark:bg-accent-light"
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
              role="switch"
              aria-checked={isDark}
              aria-label="Toggle dark mode"
              onClick={() => setIsDark((current) => !current)}
              className={`relative inline-flex h-6 w-12 shrink-0 items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                isDark ? "bg-slate-600" : "bg-gray-300/80"
              }`}
            >
              <span
                aria-hidden="true"
                className={`absolute left-0.5 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ease-out ${
                  isDark ? "translate-x-6" : "translate-x-0"
                }`}
              >
                {isDark ? (
                  <MoonIcon className="h-3 w-3 text-slate-600" />
                ) : (
                  <SunIcon className="h-3 w-3 text-amber-500" />
                )}
              </span>
            </button>

            {/* Hire me */}
            <CtaButton
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                navigateTo("contact");
              }}
              className="hidden sm:inline-flex"
            >
              Hire Me
            </CtaButton>

            {/* Mobile menu */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="relative inline-flex items-center justify-center rounded-full p-2.5 text-slate-900 transition-all duration-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 lg:hidden"
            >
              {menuOpen ? (
                <XMarkIcon className="h-5 w-5" />
              ) : (
                <Bars3Icon className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: -8,
                      scale: 0.98,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: -8,
                      scale: 0.98,
                    }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.24,
                ease: [0.22, 1, 0.36, 1],
              }}
              data-raised="true"
              className="section-shell floating-nav-surface pointer-events-auto mt-2 max-h-[calc(100dvh-5.25rem)] origin-top overflow-y-auto rounded-2xl border p-2 transition-[background-color,border-color,box-shadow] duration-300 lg:hidden"
            >
              <div className="flex flex-col">
                {/* Navigation links */}
                <nav
                  id="mobile-navigation"
                  aria-label="Mobile navigation"
                  className="flex-1"
                >
                  {SECTION_LINKS.map(({ id, label }, index) => {
                    const active = activeSection === id;
                    const Icon = NAV_ICONS[id];

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
                                y: -5,
                              }
                        }
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: reduceMotion ? 0 : index * 0.035,
                        }}
                        className={`group flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                          active
                            ? "bg-accent/5 text-accent-dark dark:bg-accent/10 dark:text-accent-light"
                            : "text-gray-900 hover:bg-accent/5 hover:text-accent-dark dark:text-white dark:hover:bg-accent/10 dark:hover:text-accent-light"
                        }`}
                      >
                        <Icon
                          aria-hidden="true"
                          className={`h-5 w-5 flex-shrink-0 transition-colors duration-300 ${
                            active
                              ? "text-accent"
                              : "text-gray-400 group-hover:text-accent-dark dark:text-gray-500 dark:group-hover:text-accent-light"
                          }`}
                        />

                        <span>{label}</span>

                        {active && (
                          <span
                            aria-hidden="true"
                            className="ml-auto h-2 w-2 flex-shrink-0 animate-pulse rounded-full bg-accent"
                          />
                        )}
                      </motion.a>
                    );
                  })}
                </nav>

                {/* Mobile bottom area */}
                <div className="mt-2 border-t border-gray-200 px-1 pt-3 dark:border-white/10">
                  <CtaButton
                    href="#contact"
                    onClick={(event) => {
                      event.preventDefault();
                      setMenuOpen(false);
                      navigateTo("contact");
                    }}
                    className="flex w-full justify-center"
                  >
                    Hire Me
                  </CtaButton>

                  <div className="mt-3 flex items-center justify-center gap-5 pb-1 text-sm text-gray-500 dark:text-gray-400">
                    <a
                      href="https://github.com/vinukush017"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-accent-dark dark:hover:text-accent-light"
                    >
                      <FaGithub className="h-4 w-4" />
                      GitHub
                    </a>

                    <span aria-hidden="true">·</span>

                    <a
                      href="https://www.linkedin.com/in/vinaykushwah017"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-accent-dark dark:hover:text-accent-light"
                    >
                      <FaLinkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.header>
    </>
  );
};

export default Navbar;
