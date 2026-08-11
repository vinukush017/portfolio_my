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
import { SECTION_LINKS, scrollToSection, type SectionId } from "../config/navigation";

const Navbar = () => {
  const reduceMotion = useReducedMotion();
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );
  const [scrolled, setScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuWasOpen = useRef(false);
  const lastScrollY = useRef(0);
  const scrollEndTimer = useRef<number | null>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.25,
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY.current;

      setScrolled(currentScrollY > 24);

      if (currentScrollY < 120) setNavVisible(true);
      else if (difference > 6) setNavVisible(false);
      else if (difference < -6) setNavVisible(true);

      lastScrollY.current = currentScrollY;

      if (scrollEndTimer.current !== null) {
        window.clearTimeout(scrollEndTimer.current);
      }
      scrollEndTimer.current = window.setTimeout(() => setNavVisible(true), 450);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollEndTimer.current !== null) window.clearTimeout(scrollEndTimer.current);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id as SectionId);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );

    SECTION_LINKS.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) setNavVisible(true);

    if (menuOpen) menuWasOpen.current = true;
    if (!menuOpen && menuWasOpen.current) {
      menuButtonRef.current?.focus();
      menuWasOpen.current = false;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const navigateTo = (sectionId: SectionId) => {
    setMenuOpen(false);
    scrollToSection(sectionId);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-gray-950 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <motion.header
        initial={reduceMotion ? false : { y: -16, opacity: 0 }}
        animate={{ y: navVisible || menuOpen ? 0 : "-100%", opacity: 1 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled || menuOpen
            ? "border-gray-200/80 bg-[#f8f8f4]/95 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#0b0d10]/95"
            : "border-transparent bg-[#f8f8f4]/75 backdrop-blur-sm dark:bg-[#0b0d10]/75"
        }`}
      >
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              navigateTo("home");
            }}
            className="group inline-flex items-center gap-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-gray-950"
            aria-label="Vinay Kushwah, go to home"
          >
            <span className="font-heading text-xl font-bold tracking-[-0.04em] text-gray-950 dark:text-white">
              VK<span className="text-indigo-600 dark:text-cyan-400">.</span>
            </span>
            <span className="hidden items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-400 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]" />
              Available for work
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
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
                      : "text-gray-600 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  {label}
                  {active && (
                    <motion.span
                      layoutId="active-navigation"
                      className="absolute inset-x-3 -bottom-[18px] h-0.5 bg-indigo-600 dark:bg-cyan-400"
                      transition={{ type: "spring", stiffness: 420, damping: 35 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsDark((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-700 transition-colors hover:bg-gray-200/70 hover:text-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-gray-300 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label={isDark ? "Use light theme" : "Use dark theme"}
            >
              {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>

            <a
              href="/Vinay_Kushwah_Resume_2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-10 items-center gap-1.5 rounded-full bg-gray-950 px-4 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-gray-950 sm:inline-flex"
            >
              Résumé
              <ArrowUpRightIcon className="h-4 w-4" />
            </a>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-800 hover:bg-gray-200/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-gray-200 dark:hover:bg-white/10 lg:hidden"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-navigation"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-gray-200 bg-[#f8f8f4] px-4 pb-6 pt-4 dark:border-white/10 dark:bg-[#0b0d10] lg:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col">
                {SECTION_LINKS.map(({ id, label }, index) => (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateTo(id);
                    }}
                    initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="flex min-h-14 items-center justify-between border-b border-gray-200 text-xl font-semibold text-gray-950 dark:border-white/10 dark:text-white"
                  >
                    {label}
                    <span aria-hidden="true" className="text-indigo-600 dark:text-cyan-400">↘</span>
                  </motion.a>
                ))}

                <a
                  href="/Vinay_Kushwah_Resume_2025.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gray-950 px-5 font-semibold text-white dark:bg-white dark:text-gray-950 sm:hidden"
                >
                  View Résumé
                  <ArrowUpRightIcon className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-indigo-600 dark:bg-cyan-400"
          style={{ scaleX: progress }}
        />
      </motion.header>
    </>
  );
};

export default Navbar;
