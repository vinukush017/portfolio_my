import React, { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";

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

const socialLinks = [
  {
    icon: <FaGithub />,
    link: "https://github.com/vinukush017",
    label: "GitHub",
    color: "hover:text-gray-900 dark:hover:text-white",
    bgColor: "hover:bg-gray-100 dark:hover:bg-gray-800",
  },
  {
    icon: <FaLinkedin />,
    link: "https://linkedin.com/in/vinaykushwah017",
    label: "LinkedIn",
    color: "hover:text-blue-600 dark:hover:text-blue-400",
    bgColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
  },
  {
    icon: <XIcon />,
    link: "https://x.com/Vinay__17",
    label: "X",
    color: "hover:text-gray-900 dark:hover:text-white",
    bgColor: "hover:bg-gray-100 dark:hover:bg-gray-800",
  },
  {
    icon: <FaInstagram />,
    link: "https://www.instagram.com/azad__parinda__17",
    label: "Instagram",
    color: "hover:text-pink-600 dark:hover:text-pink-400",
    bgColor: "hover:bg-pink-50 dark:hover:bg-pink-900/20",
  },
];

const contactLinks = [
  {
    icon: <MdPhone />,
    link: "tel:+918871797891",
    label: "Phone",
    color: "hover:text-green-600 dark:hover:text-green-400",
    bgColor: "hover:bg-green-50 dark:hover:bg-green-900/20",
  },
  {
    icon: <MdEmail />,
    link: "mailto:vinay.kushwah89@gmail.com",
    label: "Email",
    color: "hover:text-indigo-600 dark:hover:text-indigo-400",
    bgColor: "hover:bg-indigo-50 dark:hover:bg-indigo-900/20",
  },
];

// Social Icon Item Component with Tooltip
const SocialIconItem = ({
  item,
  index,
}: {
  item: (typeof contactLinks)[0] | (typeof socialLinks)[0];
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={item.link}
      title={item.label}
      aria-label={item.label}
      target={item.link.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.9 }}
      className="relative group block"
    >
      {/* Icon Container */}
      <div className={`
        relative w-10 h-10 rounded-lg
        bg-white/60 dark:bg-gray-900/60 backdrop-blur-md
        border border-gray-200/50 dark:border-gray-800/50
        flex items-center justify-center
        text-gray-700 dark:text-gray-300
        ${item.color || "hover:text-indigo-600 dark:hover:text-indigo-400"}
        shadow-sm hover:shadow-md
        transition-all duration-300
        group-hover:border-indigo-300 dark:group-hover:border-indigo-700
        overflow-hidden
      `}>
        {/* Gradient Background on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />

        {/* Icon */}
        <div className="relative z-10">
          {React.cloneElement(item.icon, { size: 18 })}
        </div>

        {/* Shine Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%" }}
          animate={isHovered ? { x: "200%" } : { x: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, x: -10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-2 rounded-lg bg-gray-900 dark:bg-gray-800 text-white text-xs font-semibold shadow-xl pointer-events-none z-[60] border border-gray-700/50 backdrop-blur-sm"
          >
            {item.label}
            <span className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[6px] border-r-gray-900 dark:border-r-gray-800 border-b-[6px] border-b-transparent" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.a>
  );
};

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
      {/* 🖥️ Desktop Bar - Enhanced vertical stack */}
      <motion.aside
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="fixed left-4 sm:left-6 lg:left-8 bottom-0 -translate-y-1/2 z-[60] hidden lg:flex flex-col items-center gap-2"
        aria-label="Social media and contact links"
        style={{ pointerEvents: "auto" }}
      >
        {/* Container with background */}
        <div className="relative">
          {/* Background Card */}
          <div className="absolute inset-0 -inset-x-1 -inset-y-1 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-xl border border-gray-200/30 dark:border-gray-800/30 shadow-md" />
          
          {/* Icons Container */}
          <div className="relative flex flex-col items-center gap-2 p-2">
            {/* Contact Links First - Phone and Email */}
            {contactLinks.map((item, index) => (
              <motion.div
                key={`contact-${item.label}-${index}`}
                initial={{ opacity: 0, y: -20, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.4 + index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="block"
              >
                <SocialIconItem item={item} index={index} />
              </motion.div>
            ))}

            {/* Divider */}
            <div className="w-6 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-0.5" />

            {/* Social Links - GitHub, LinkedIn, Twitter, Instagram */}
            {socialLinks.map((item, index) => (
              <motion.div
                key={`social-${item.label}-${index}`}
                initial={{ opacity: 0, y: -20, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: 0.6 + index * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="block"
              >
                <SocialIconItem item={item} index={index} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vertical line - Enhanced */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
          className="w-0.5 h-16 rounded-full mt-1 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 shadow-md shadow-indigo-500/20"
        />
      </motion.aside>

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
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.9 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="fixed bottom-20 left-6 z-50 flex flex-col items-center gap-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 p-3 rounded-xl shadow-xl"
              role="dialog"
            >
              {[...contactLinks, ...socialLinks].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  title={item.label}
                  aria-label={item.label}
                  target={item.link.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className={`
                    w-9 h-9 rounded-lg
                    bg-white/60 dark:bg-gray-900/60 backdrop-blur-md
                    border border-gray-200/50 dark:border-gray-800/50
                    flex items-center justify-center
                    text-gray-600 dark:text-gray-400
                    ${item.color || "hover:text-indigo-600 dark:hover:text-indigo-400"}
                    shadow-sm hover:shadow-md
                    transition-all duration-300
                    hover:border-indigo-300 dark:hover:border-indigo-700
                  `}
                >
                  {React.cloneElement(item.icon, { size: 18 })}
                </motion.a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SocialBar;
