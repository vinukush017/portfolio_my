import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = ["home", "projects", "about", "skills", "experience", "contact"];

// Theme colors (only primary and accent)
const theme = {
  primary: "#4F46E5", // Indigo-600 for active pill
  accent: "#A855F7", // Purple-500 for hover
};

const Navbar = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("home");

  // Dark/light mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Intersection Observer to update active link on scroll
  useEffect(() => {
    const sections = links.map((id) => document.getElementById(id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((sec) => sec && observer.observe(sec));

    return () => {
      sections.forEach((sec) => sec && observer.unobserve(sec));
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-30 bg-transparent text-gray-900 dark:text-white py-4 px-6 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 font-bold text-xl whitespace-nowrap">
          <a href="#home">
            <img src="/V.png" className="h-12 block dark:hidden" alt="Logo" />
            <img
              src="/V-2.png"
              className="h-12 hidden dark:block"
              alt="Logo (Dark)"
            />
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4 relative">
          {links.map((link) => {
            const isActive = activeLink === link;

            return (
              <motion.a
                key={link}
                href={`#${link}`}
                onClick={() => setActiveLink(link)}
                className={`relative px-4 py-2 font-medium rounded-full cursor-pointer transition ${
                  isDark
                    ? isActive
                      ? "text-white"
                      : "text-gray-300"
                    : isActive
                    ? "text-white"
                    : "text-gray-700"
                }`}
                whileHover={{ scale: 1.05, color: theme.accent }}
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}

                {/* Animated Pill */}
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="pill"
                      className="absolute inset-0 rounded-full z-[-1]"
                      style={{ backgroundColor: theme.primary }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.a>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2 text-sm relative z-50">
          {/* Theme Toggle */}
          <button
            aria-label="Toggle Dark Mode"
            onClick={() => setIsDark(!isDark)}
            className={`px-3 py-1 rounded-full hover:opacity-80 transition whitespace-nowrap ${
              isDark ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"
            }`}
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <X size={24} color={isDark ? "white" : "black"} />
            ) : (
              <Menu size={24} color={isDark ? "white" : "black"} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-6 md:hidden overflow-x-hidden"
          >
            {links.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                onClick={() => {
                  setActiveLink(link);
                  setMenuOpen(false);
                }}
                className="text-2xl font-semibold hover:text-indigo-500 transition"
              >
                {link.charAt(0).toUpperCase() + link.slice(1)}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
