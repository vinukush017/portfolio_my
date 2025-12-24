import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

// Custom X (Twitter) Icon Component
const XIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800 text-white text-center py-8 px-3 rounded-t-3xl shadow-2xl text-xs relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      <div className="relative z-10">
      {/* Copyright */}
      <p className="mb-2 text-gray-100">
        &copy; {year}{" "}
        <span className="font-semibold text-white">Vinay Kushwah</span>. All
        rights reserved.
      </p>

      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {["home", "projects", "about", "skills", "experience", "contact"].map(
          (section, index) => (
            <motion.a
              key={section}
              href={`#${section}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="hover:underline hover:text-indigo-200 transition-all duration-300 font-medium"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.a>
          )
        )}
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 text-lg mb-4">
        {[
          { icon: FaGithub, href: "https://github.com/vinukush017", label: "Vinay Kushwah GitHub", isX: false },
          { icon: FaLinkedin, href: "https://www.linkedin.com/in/vinaykushwah017", label: "Vinay Kushwah LinkedIn", isX: false },
          { icon: FaInstagram, href: "https://www.instagram.com/azad__parinda__17", label: "Vinay Kushwah Instagram", isX: false },
          { href: "https://x.com/Vinay__17", label: "Vinay Kushwah X", isX: true },
        ].map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            whileHover={{ scale: 1.2, y: -3, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="hover:text-indigo-200 transition-colors duration-300"
          >
            {social.isX ? <XIcon size={26} /> : <social.icon size={26} />}
          </motion.a>
        ))}
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
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-[10px] text-indigo-200"
      >
        Built with <span className="font-semibold">React + TypeScript</span> and
        styled with <span className="font-semibold">Tailwind CSS</span>.
      </motion.p>
      </div>
    </footer>
  );
};

export default Footer;
