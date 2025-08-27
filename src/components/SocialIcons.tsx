import React, { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

const socialLinks = [
  {
    icon: <FaGithub />,
    link: "https://github.com/vinukush017",
    label: "GitHub",
    color: "text-gray-800 dark:text-white",
  },
  {
    icon: <FaLinkedin />,
    link: "https://linkedin.com/in/vinaykushwah017",
    label: "LinkedIn",
    color: "text-blue-600",

  },
  {
    icon: <FaInstagram />,
    link: "https://www.instagram.com/azad__parinda__17",
    label: "Instagram",
  },
];

const contactLinks = [
  {
    icon: <MdPhone />,
    link: "tel:+918871797891",
    label: "Phone",
  },
  {
    icon: <MdEmail />,
    link: "mailto:vinay.kushwah89@gmail.com",
    label: "Email",
  },
];



const SocialBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* 🖥️ Desktop Bar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed bottom-0 left-6 z-50 hidden md:flex flex-col items-center gap-4 text-gray-500 dark:text-gray-300"
      >
        {[...contactLinks, ...socialLinks].map((item, index) => (
          <a
            key={index}
            href={item.link}
            title={item.label}
            aria-label={item.label}
            target={item.link.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="transition hover:text-indigo-600 dark:hover:text-indigo-400 transform hover:-translate-y-1 hover:scale-110 hover:rotate-6"
          >
            {React.cloneElement(item.icon, { size: 24 })}
          </a>
        ))}
        <div className="w-px h-20 bg-gray-400 dark:bg-gray-500" />
      </motion.div>

      {/* 📱 Mobile Floating Button + Panel (Left) */}
      {/* Toggle Button */}
      {/* <div className="fixed bottom-6 left-6 z-50 md:hidden">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-indigo-700 transition"
          aria-label="Toggle Social Panel"
        >
          {isOpen ? "✕" : "+"}
        </button>
      </div> */}

      {/* Panel & Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Blurred Background (for outside click) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* Social Panel */}
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-20 left-6 z-50 flex flex-col items-start gap-3 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-xl"
              role="dialog"
            >
              {[...contactLinks, ...socialLinks].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  title={item.label}
                  aria-label={item.label}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition transform hover:scale-110 hover:rotate-6"
                >
                  {React.cloneElement(item.icon, { size: 24 })}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SocialBar;
