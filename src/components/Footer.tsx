import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-indigo-700 to-indigo-600 dark:from-indigo-800 dark:to-indigo-700 text-white text-center py-10 px-4 rounded-t-2xl shadow-inner">
      {/* Copyright */}
      <p className="text-sm mb-3 text-gray-100">
        &copy; {year} <span className="font-semibold text-white">Vinay Kushwah</span>. All rights reserved.
      </p>

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-6 text-sm mb-4">
        <a href="#home" className="hover:underline hover:text-indigo-200 transition">
          Home
        </a>
        <a href="#about" className="hover:underline hover:text-indigo-200 transition">
          About
        </a>
        <a href="#projects" className="hover:underline hover:text-indigo-200 transition">
          Projects
        </a>
        <a href="#skills" className="hover:underline hover:text-indigo-200 transition">
          Skills
        </a>
        <a href="#experience" className="hover:underline hover:text-indigo-200 transition">
          Experience
        </a>
        <a href="#contact" className="hover:underline hover:text-indigo-200 transition">
          Contact
        </a>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 text-xl mb-4">
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
      <p className="text-sm text-indigo-100">
        Open to freelance or full-time opportunities —{" "}
        <a href="#contact" className="underline hover:text-indigo-200">
          let’s connect
        </a>
        .
      </p>

      {/* Stack Message */}
      <p className="text-xs text-indigo-300 mt-4">
        Built with <span className="font-medium">React + TypeScript</span> and styled with{" "}
        <span className="font-medium">Tailwind CSS</span>.
      </p>
    </footer>
  );
};

export default Footer;
