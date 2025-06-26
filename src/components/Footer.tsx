import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-indigo-600 text-white text-center py-6 px-4">
      <p className="text-sm mb-3">
        &copy; {year} <span className="font-medium">Vinay Kushwah</span>. All rights reserved.
      </p>

      <div className="flex justify-center gap-6 text-sm">
        <a
          href="https://github.com/vinaykushwah017"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Vinay Kushwah GitHub"
          className="hover:underline transition"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/vinaykushwah017"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Vinay Kushwah LinkedIn"
          className="hover:underline transition"
        >
          LinkedIn
        </a>
        <a
          href="#home"
          className="hover:underline transition"
          aria-label="Back to Top"
        >
          Back to Top ↑
        </a>
      </div>
    </footer>
  );
};

export default Footer;
