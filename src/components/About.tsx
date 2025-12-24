import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const About: React.FC = () => {
  const reduceMotion = useReducedMotion();

  // Auto-calc experience years (update startYear to your real start)
  const years = useMemo(() => {
    const startYear = 2021;
    const now = new Date();
    const raw = now.getFullYear() - startYear + (now.getMonth() >= 6 ? 0.5 : 0);
    return raw % 1 === 0 ? String(raw) : raw.toFixed(1);
  }, []);

  const tags = [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Tailwind",
    "Performance",
  ];

  return (
    <section
      aria-label="About Vinay Kushwah"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-900 dark:text-white flex items-center py-12 sm:py-16"
    >
      <motion.div
        className="w-full mx-auto"
        initial={reduceMotion ? false : { opacity: 0, y: 40 }}
        whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeader
          subtitle="Get to Know"
          title="About Me"
          description="Passionate full-stack developer crafting exceptional digital experiences with modern technologies and best practices."
        />

        {/* Content card */}
        <div className="bg-gradient-to-br from-gray-100/95 via-white/90 to-indigo-50/50 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-indigo-900/30 border border-indigo-200/30 dark:border-indigo-800/30 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-4 sm:p-6 md:p-8">
          {/* Two-column on md+ */}
          <div className="grid md:grid-cols-[1fr,1.4fr] gap-6 sm:gap-8 items-start">
            {/* Portrait / Illustration */}
            <div className="mx-auto max-w-sm w-full">
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Replace src with your real headshot if available */}
                <motion.img
                  src="/avatar.jpg"
                  alt="Portrait of Vinay Kushwah"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Quick facts */}
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="rounded-lg bg-gradient-to-br from-white/80 to-indigo-50/80 dark:from-white/10 dark:to-indigo-900/20 p-3 border border-indigo-200/50 dark:border-indigo-800/50 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <dt className="text-gray-600 dark:text-gray-400 text-xs">Location</dt>
                  <dd className="font-semibold text-gray-900 dark:text-white">Pune, India</dd>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="rounded-lg bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-white/10 dark:to-purple-900/20 p-3 border border-purple-200/50 dark:border-purple-800/50 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <dt className="text-gray-600 dark:text-gray-400 text-xs">
                    Experience
                  </dt>
                  <dd className="font-semibold text-gray-900 dark:text-white">{years}+ years</dd>
                </motion.div>
              </dl>
            </div>

            <div className="flex flex-col justify-center text-center md:text-left h-full">
              <div className="flex flex-col justify-center">
                <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-3 sm:mb-4">
                  I'm <span className="font-semibold text-indigo-600 dark:text-indigo-400">Vinay Kushwah</span>, a
                  passionate full-stack engineer with {years}+ years of experience crafting scalable, 
                  high-performance web applications. I specialize in building end-to-end solutions 
                  that combine elegant frontend experiences with robust backend architectures.
                </p>

                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  My journey in software development has been driven by a love for solving complex 
                  problems and creating products that make a real impact. I've worked with startups 
                  and established companies, shipping production-ready features that improve user 
                  experiences and drive business growth.
                </p>

                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  I'm passionate about <strong className="text-indigo-600 dark:text-indigo-400">performance optimization</strong>, 
                  writing <strong className="text-indigo-600 dark:text-indigo-400">clean, maintainable code</strong>, and 
                  staying current with the latest technologies. My expertise spans the entire development 
                  lifecycle—from initial concept and design to deployment and optimization.
                </p>

                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  When I'm not coding, I enjoy <strong className="text-indigo-600 dark:text-indigo-400">mentoring junior developers</strong>, 
                  contributing to <strong className="text-indigo-600 dark:text-indigo-400">open-source projects</strong>, and 
                  exploring new frameworks and tools. I believe in continuous learning and sharing knowledge 
                  with the developer community.
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  Currently open to exciting opportunities in product-focused roles, contract work, 
                  and collaborative projects. Let's build something amazing together!
                </p>

                {/* Tags */}
                <ul
                  className="flex flex-wrap justify-center md:justify-start gap-3 mt-6"
                  aria-hidden="true"
                >
                  {tags.map((tag, index) => (
                    <li key={tag}>
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileHover={reduceMotion ? undefined : { scale: 1.1, y: -2 }}
                        className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-700 dark:text-indigo-200 text-sm font-medium border border-indigo-300/50 dark:border-indigo-700/50 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        {tag}
                      </motion.span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
