import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  Variants,
} from "framer-motion";
import {
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

// --- Framer variants for mobile menu ---
const dropdownVariants = (reduce: boolean): Variants => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 },
  visible: reduce
    ? { opacity: 1, transition: { duration: 0.15 } }
    : {
        opacity: 1,
        y: 6,
        scale: 1,
        transition: {
          duration: 0.22,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
  exit: reduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: -6,
        scale: 0.98,
        transition: {
          duration: 0.18,
          ease: [0.4, 0, 0.2, 1],
        },
      },
});

const listVariants = (reduce: boolean): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: reduce ? 0 : 0.06,
      delayChildren: reduce ? 0 : 0.05,
    },
  },
  exit: {
    transition: { staggerChildren: reduce ? 0 : 0.04, staggerDirection: -1 },
  },
});

const itemVariants = (reduce: boolean): Variants => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 8 },
  visible: reduce
    ? { opacity: 1, transition: { duration: 0.12 } }
    : {
        opacity: 1,
        y: 0,
        transition: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] },
      },
  exit: reduce
    ? { opacity: 0 }
    : { opacity: 0, y: -6, transition: { duration: 0.15 } },
});

const LINKS = [
  "home",
  "projects",
  "about",
  "skills",
  "experience",
  "contact",
] as const;
type LinkKey = (typeof LINKS)[number];

const themeColors = { primary: "#4F46E5", accent: "#A855F7" };

const setHtmlDarkClass = (dark: boolean) =>
  document.documentElement.classList.toggle("dark", dark);

// Helper function for smooth scrolling to section
const scrollToSection = (sectionId: string) => {
  requestAnimationFrame(() => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    // Get navbar height dynamically
    const navbar = document.querySelector('[role="navigation"]');
    const navbarHeight = navbar ? navbar.getBoundingClientRect().height + 24 : 120;
    
    // Calculate scroll position
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = Math.max(0, elementTop - navbarHeight);
    
    // Smooth scroll
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    
    // Update URL hash after scroll starts
    setTimeout(() => {
      window.history.replaceState(null, "", `#${sectionId}`);
    }, 100);
  });
};

const getSystemPrefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-color-scheme: dark)").matches;

const Navbar: React.FC = () => {
  const reduceMotionRaw = useReducedMotion();
  const reduceMotion = !!reduceMotionRaw;

  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // track whether user manually set theme
  const userSetThemeRef = useRef<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    const initialDark = saved ? saved === "dark" : getSystemPrefersDark();
    setIsDark(initialDark);
    setHtmlDarkClass(initialDark);
    userSetThemeRef.current = !!saved;

    // listen to system changes only if user hasn't chosen
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent | MediaQueryList) => {
      // If the user did not manually choose, follow system
      if (!userSetThemeRef.current) {
        const matches =
          // MediaQueryListEvent has 'matches', MediaQueryList also has 'matches'
          (e as MediaQueryListEvent).matches ?? (e as MediaQueryList).matches;
        setIsDark(!!matches);
        setHtmlDarkClass(!!matches);
      }
    };

    // addEventListener with fallback
    if (mq.addEventListener) {
      mq.addEventListener("change", listener as EventListener);
    } else if ((mq as any).addListener) {
      (mq as any).addListener(listener);
    }

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", listener as EventListener);
      } else if ((mq as any).removeListener) {
        (mq as any).removeListener(listener);
      }
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setHtmlDarkClass(isDark);
    // mark that user explicitly set theme
    userSetThemeRef.current = true;
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark, mounted]);

  const [activeLink, setActiveLink] = useState<LinkKey>("home");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const rafRef = useRef<number | null>(null);

  // Helper: determine section visible at vertical center
  const updateActiveByCenter = useCallback(() => {
    // cancel any pending rAF
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    rafRef.current = requestAnimationFrame(() => {
      const midY = window.innerHeight / 2;
      let found: LinkKey | null = null;
      for (const id of LINKS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= midY && rect.bottom >= midY) {
          found = id as LinkKey;
          break;
        }
      }
      if (found && found !== activeLink) setActiveLink(found);
    });
  }, [activeLink]);

  useEffect(() => {
    // IntersectionObserver for smoother transitions and keyboard/hash navigation
    const sections = LINKS.map((id) => document.getElementById(id)).filter(
      Boolean
    ) as HTMLElement[];

    if (observerRef.current) observerRef.current.disconnect();

    // use a simple threshold and slightly narrower rootMargin
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // when a section crosses center-ish area, set active
          if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            setActiveLink(entry.target.id as LinkKey);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sections.forEach((el) => observerRef.current?.observe(el));

    // Ensure initial state is correct (on load)
    updateActiveByCenter();

    const onHashChange = () => {
      const id = window.location.hash.replace("#", "") as LinkKey;
      if ((LINKS as readonly string[]).includes(id))
        setActiveLink(id as LinkKey);
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("scroll", updateActiveByCenter, { passive: true });
    window.addEventListener("resize", updateActiveByCenter);

    return () => {
      observerRef.current?.disconnect();
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("scroll", updateActiveByCenter);
      window.removeEventListener("resize", updateActiveByCenter);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [updateActiveByCenter]);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  // Store previous body overflow in a ref to restore reliably
  const prevBodyOverflowRef = useRef<string>("");

  useEffect(() => {
    if (!mounted) return;
    if (menuOpen) {
      // store current overflow only when opening
      prevBodyOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else {
      // restore when closing
      document.body.style.overflow = prevBodyOverflowRef.current || "";
    }
    // cleanup on unmount
    return () => {
      document.body.style.overflow = prevBodyOverflowRef.current || "";
    };
  }, [menuOpen, mounted]);

  // Close on Esc
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Click outside to close (affects the dropdown)
  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen]);

  // Focus return to button when menu closed
  useEffect(() => {
    if (!menuOpen && menuButtonRef.current) menuButtonRef.current.focus();
  }, [menuOpen]);

  const linkLabel = useCallback(
    (link: LinkKey) => link.charAt(0).toUpperCase() + link.slice(1),
    []
  );

  const desktopLinks = useMemo(
    () =>
      LINKS.map((link) => {
        const isActive = activeLink === link;
        return (
          <li key={link} className="relative">
            <motion.a
              href={`#${link}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveLink(link);
                scrollToSection(link);
              }}
              className={[
                "relative px-4 py-2 font-heading font-normal rounded-full cursor-pointer transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500",
                isDark
                  ? isActive
                    ? "text-white"
                    : "text-gray-300"
                  : isActive
                  ? "text-white"
                  : "text-gray-700",
              ].join(" ")}
              whileHover={reduceMotion ? undefined : { scale: 1.05 }}
              aria-current={isActive ? "page" : undefined}
            >
              {linkLabel(link)}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    layoutId="pill"
                    className="absolute inset-0 rounded-full z-[-1]"
                    style={{ backgroundColor: themeColors.primary }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={
                      reduceMotion
                        ? { duration: 0.1 }
                        : { type: "spring", stiffness: 500, damping: 30 }
                    }
                  />
                )}
              </AnimatePresence>
            </motion.a>
          </li>
        );
      }),
    [activeLink, isDark, linkLabel, reduceMotion]
  );

  if (!mounted) return null;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 py-1 rounded"
      >
        Skip to content
      </a>

      {/* Floating cylinder with an absolutely-positioned dropdown */}
      <div className="fixed inset-x-0 top-[calc(env(safe-area-inset-top)+1rem)] z-50">
        <div ref={wrapperRef} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* CYLINDER (stays same height) */}
          <motion.div
            initial={reduceMotion ? false : { y: -12, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="
              px-3 py-2 sm:px-4 sm:py-2
              rounded-full border border-indigo-200/30 dark:border-indigo-800/30
              bg-white/80 dark:bg-gray-900/80
              backdrop-blur-xl shadow-lg hover:shadow-xl transition-shadow duration-300
            "
            role="navigation"
            aria-label="Primary"
          >
            <div className="flex items-center gap-2 md:gap-4">
              {/* Left: Logo */}
              <a
                href="#home"
                aria-label="Go to Home"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveLink("home");
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                  setTimeout(() => {
                    window.history.replaceState(null, "", "#home");
                  }, 100);
                }}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <img
                  src="/1.png"
                  className="h-8 w-8 rounded-full block dark:hidden"
                  alt="Logo"
                />
                <img
                  src="/2.png"
                  className="h-8 w-8 rounded-full hidden dark:block"
                  alt="Logo (Dark)"
                />
                <span className="sm:hidden text-sm font-semibold text-gray-900 dark:text-white">
                  Vinay
                </span>
              </a>

              {/* Center: Desktop links */}
              <nav
                className="hidden md:flex flex-1 justify-center"
                aria-label="Primary Navigation"
              >
                <ul className="flex items-center gap-1">{desktopLinks}</ul>
              </nav>

              {/* Right: controls */}
              <div className="ml-auto flex items-center gap-1">
                <button
                  aria-label="Toggle theme"
                  onClick={() => setIsDark((d) => !d)}
                  className="px-3 py-1"
                  type="button"
                >
                  {isDark ? (
                    <SunIcon className="w-6 h-6 text-yellow-300" />
                  ) : (
                    <MoonIcon className="w-6 h-6 text-gray-600" />
                  )}
                </button>

                {/* Menu button (mobile only) */}
                <motion.button
                  ref={menuButtonRef}
                  className="md:hidden p-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 hover:bg-black/5 dark:hover:bg-white/10"
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-label="Toggle menu"
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  animate={menuOpen ? { rotate: 90 } : { rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {menuOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* DROPDOWN (absolute under the pill so the pill doesn't grow) */}
          <AnimatePresence>
            {menuOpen && (
              <motion.nav
                id="mobile-menu"
                aria-label="Mobile menu"
                className="absolute left-0 right-0 top-full mt-2 rounded-2xl bg-white/85 dark:bg-gray-900/90 backdrop-blur-xl shadow-xl border border-white/15 p-2 md:hidden overflow-hidden"
                style={{ originY: 0 }}
                variants={dropdownVariants(reduceMotion)}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.ul
                  className="flex flex-col gap-1"
                  variants={listVariants(reduceMotion)}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {LINKS.map((link) => (
                    <motion.li key={link} variants={itemVariants(reduceMotion)}>
                      <a
                        href={`#${link}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setMenuOpen(false);
                          setActiveLink(link as LinkKey);
                          // Small delay to allow menu to close smoothly
                          setTimeout(() => {
                            scrollToSection(link);
                          }, 150);
                        }}
                        className="
                          group block w-full text-base font-medium px-4 py-3 rounded-xl
                          hover:bg-gray-100/80 dark:hover:bg-white/10
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500
                          text-gray-900 dark:text-white text-center transition-all duration-200
                        "
                        aria-current={activeLink === link ? "page" : undefined}
                      >
                        <span className="inline-block transition-transform duration-200 will-change-transform group-hover:translate-x-0.5">
                          {linkLabel(link as LinkKey)}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Navbar;
