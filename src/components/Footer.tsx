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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative mt-20 border-t border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/30 to-pink-50/30 dark:from-indigo-900/10 dark:via-purple-900/10 dark:to-pink-900/10 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
              Vinay Kushwah
            </h3>
            <p className="text-gray-700 dark:text-gray-400 mb-6 leading-relaxed max-w-md">
              Full-stack developer passionate about building exceptional digital experiences. 
              Always open to new opportunities and exciting projects.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {[
                { icon: FaGithub, href: "https://github.com/vinukush017", label: "GitHub", color: "hover:text-gray-900 dark:hover:text-white" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/in/vinaykushwah017", label: "LinkedIn", color: "hover:text-blue-600 dark:hover:text-blue-400" },
                { icon: FaInstagram, href: "https://www.instagram.com/azad__parinda__17", label: "Instagram", color: "hover:text-pink-600 dark:hover:text-pink-400" },
                { href: "https://x.com/Vinay__17", label: "X (Twitter)", isX: true, color: "hover:text-gray-900 dark:hover:text-white" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 transition-all duration-300 ${social.color || ""}`}
                >
                  {social.isX ? <XIcon size={20} /> : social.icon && <social.icon size={20} />}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {["home", "projects", "about", "skills", "experience", "contact"].map(
                (section, index) => (
                  <li key={section}>
                    <motion.a
                      href={`#${section}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(section);
                      }}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      whileHover={{ x: 4 }}
                      className="text-gray-700 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition-colors" />
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </motion.a>
                  </li>
                )
              )}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Get In Touch</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:vinay.kushwah89@gmail.com"
                  className="text-gray-700 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Email Me</span>
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                  className="text-gray-700 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 flex items-center gap-2 group"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span className="text-sm">Contact Form</span>
                </a>
              </li>
              <li>
                <div className="text-gray-700 dark:text-gray-400 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">Pune, India</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200/50 dark:border-gray-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-sm text-gray-700 dark:text-gray-400"
            >
              &copy; {year} <span className="font-semibold text-gray-900 dark:text-white">Vinay Kushwah</span>. All rights reserved.
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500"
            >
              <span>Built with</span>
              <span className="px-2 py-1 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold">
                React
              </span>
              <span className="px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold">
                TypeScript
              </span>
              <span className="px-2 py-1 rounded-md bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 font-semibold">
                Tailwind CSS
              </span>
            </motion.div>

            {/* CTA */}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Let's Work Together →
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
