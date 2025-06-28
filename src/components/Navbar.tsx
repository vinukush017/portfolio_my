import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
      className="z-20 bg-transparent text-gray-900 dark:text-white py-4 px-6 shadow-md"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 font-bold text-xl">
          <span className="text-2xl">⇨</span>
          <span className="w-3 h-3 rounded-full bg-black dark:bg-white"></span>
          <a href="#home">Vinay</a>
        </div>

        <nav className="hidden md:flex items-center bg-white dark:bg-gray-800 px-6 py-2 rounded-full shadow ring-1 ring-gray-200 dark:ring-gray-700 transition-colors duration-300 space-x-6">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={`#${link.toLowerCase()}`}
              className="text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 font-semibold px-3 py-1 rounded-full"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-2 text-sm">
          <button
            aria-label="Toggle Dark Mode"
            onClick={() => setIsDark(!isDark)}
            className="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>

          <button
            className="md:hidden text-gray-900 dark:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 px-6 pb-4 space-y-2 bg-white dark:bg-black shadow rounded-lg">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-semibold"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
