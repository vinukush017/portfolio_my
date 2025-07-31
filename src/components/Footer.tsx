import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-indigo-700 to-indigo-600 dark:from-indigo-800 dark:to-indigo-700 text-white text-center py-6 px-3 rounded-t-xl shadow-inner text-xs">
      {/* Copyright */}
      <p className="mb-2 text-gray-100">
        &copy; {year} <span className="font-semibold text-white">Vinay Kushwah</span>. All rights reserved.
      </p>

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-4 mb-2">
        {["home", "about", "projects", "skills", "experience", "contact"].map((section) => (
          <a
            key={section}
            href={`#${section}`}
            className="hover:underline hover:text-indigo-200 transition"
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </a>
        ))}
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-4 text-lg mb-2">
        <a
          href="https://github.com/vinaykushwah017"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Vinay Kushwah GitHub"
          className="hover:text-indigo-200 transition"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/vinaykushwah017"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Vinay Kushwah LinkedIn"
          className="hover:text-indigo-200 transition"
        >
          <FaLinkedin />
        </a>
      </div>

      {/* Freelance CTA */}
      <p className="text-indigo-100 mb-1">
        Open to freelance or full-time roles —{" "}
        <a href="#contact" className="underline hover:text-indigo-200">
          let’s connect
        </a>
        .
      </p>

      {/* Stack Message */}
      <p className="text-[10px] text-indigo-300">
        Built with <span className="font-medium">React + TypeScript</span> and styled with{" "}
        <span className="font-medium">Tailwind CSS</span>.
      </p>
    </footer>
  );
};

export default Footer;
