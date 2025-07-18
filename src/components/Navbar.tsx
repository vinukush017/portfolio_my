import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const links = ["About", "Skills", "Projects", "Experience", "Contact"];
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="z-20 w-full bg-transparent text-gray-900 dark:text-white py-2 sm:py-4 px-4 sm:px-6 md:px-8 shadow-md overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2 font-bold text-xl whitespace-nowrap">
          <span className="text-2xl">⇨</span>
          <span className="w-3 h-3 rounded-full bg-black dark:bg-white"></span>
          <a href="#home">Vinay</a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow ring-1 ring-gray-200 dark:ring-gray-700 transition space-x-4 overflow-hidden max-w-full">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={`#${link.toLowerCase()}`}
              className="text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium px-2 py-1 rounded-full whitespace-nowrap"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-2 text-sm relative z-50">
          {/* Theme Toggle */}
          <button
            aria-label="Toggle Dark Mode"
            onClick={() => setIsDark(!isDark)}
            className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition whitespace-nowrap"
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
            className="fixed inset-0 z-40 bg-white dark:bg-black text-black dark:text-white flex flex-col items-center justify-center space-y-6 md:hidden overflow-x-hidden"
            onClick={() => setMenuOpen(false)}
          >
            {links.map((link, idx) => (
              <a
                key={idx}
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-semibold hover:text-indigo-500 transition"
              >
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
