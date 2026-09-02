import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import {
  SECTION_LINKS,
  scrollToSection,
  type SectionId,
} from "../config/navigation";
import CtaButton from "./CtaButton";

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
              onClick={() => setIsDark((current) => !current)}
              aria-label={
                isDark ? "Switch to light theme" : "Switch to dark theme"
              }
              title={isDark ? "Light theme" : "Dark theme"}
              className="inline-flex items-center justify-center w-10 h-10 text-gray-600 transition-colors rounded-full hover:bg-accent/10 hover:text-accent-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:text-gray-300 dark:hover:bg-accent/10 dark:hover:text-accent-light"
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
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200/90 bg-gray-100/80 text-gray-700 transition-colors hover:border-accent/30 hover:bg-accent/10 hover:text-accent-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:border-white/10 dark:bg-white/[0.06] dark:text-gray-200 dark:hover:border-accent-light/30 dark:hover:bg-accent/10 dark:hover:text-accent-light lg:hidden"
            >
              <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
              <span aria-hidden="true" className="relative block h-4 w-5">
                <motion.span
                  className="absolute left-0 top-1 block h-0.5 w-5 rounded-full bg-current"
                  animate={
                    menuOpen
                      ? { y: 3, rotate: 45 }
                      : { y: 0, rotate: 0 }
                  }
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                />
                <motion.span
                  className="absolute bottom-1 left-0 block h-0.5 w-5 rounded-full bg-current"
                  animate={
                    menuOpen
                      ? { y: -3, rotate: -45 }
                      : { y: 0, rotate: 0 }
                  }
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                />
              </span>
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
                        className={`group flex min-h-12 items-center justify-between rounded-xl px-3.5 text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                          active
                            ? "bg-accent/10 text-accent-dark dark:bg-accent/15 dark:text-accent-light"
                            : "text-gray-900 hover:bg-accent/10 hover:text-accent-dark dark:text-white dark:hover:bg-accent/10 dark:hover:text-accent-light"
                        }`}
                      >
                        <span>{label}</span>

                        <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </motion.a>
                    );
                  })}
                </nav>

                {/* Mobile bottom area */}
                <div className="mt-2 border-t border-gray-200 px-1 pt-3 dark:border-white/10">
                  <a
                    href="#contact"
                    onClick={(event) => {
                      event.preventDefault();
                      setMenuOpen(false);
                      navigateTo("contact");
                    }}
                    className="group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-dark px-5 text-sm font-semibold text-white shadow-sm shadow-accent/20 transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
                  >
                    Hire Me
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </a>

                  <div className="mt-3 flex items-center justify-center gap-5 pb-1 text-sm text-gray-500 dark:text-gray-400">
                    <a
                      href="https://github.com/vinukush017"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-accent-dark dark:hover:text-accent-light"
                    >
                      GitHub
                    </a>

                    <span aria-hidden="true">·</span>

                    <a
                      href="https://www.linkedin.com/in/vinaykushwah017"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-accent-dark dark:hover:text-accent-light"
                    >
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
