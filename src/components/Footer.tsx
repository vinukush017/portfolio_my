import React from 'react';

const Footer = () => (
  <footer className="bg-indigo-600 text-white text-center py-6 px-4">
    <p className="text-sm mb-2">
      &copy; {new Date().getFullYear()} Vinay Kushwah. All rights reserved.
    </p>

    {/* Optional Social Links */}
    <div className="flex justify-center gap-4 text-white text-sm">
      <a
        href="https://github.com/vinaykushwah017"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        GitHub
      </a>
      <a
        href="https://www.linkedin.com/in/vinaykushwah017"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        LinkedIn
      </a>
      <a href="#home" className="hover:underline">
        Back to Top ↑
      </a>
    </div>
  </footer>
);

export default Footer;
