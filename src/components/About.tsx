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

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Profile Image & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Image Card */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -30 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 p-1">
                <div className="relative h-full w-full rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
                  <motion.img
                    src="/avatar.jpg"
                    alt="Portrait of Vinay Kushwah"
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              
              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white dark:bg-gray-900 rounded-full shadow-lg border border-gray-200 dark:border-gray-800"
              >
                <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Full Stack Developer
                </span>
              </motion.div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-indigo-200/50 dark:border-indigo-800/50 rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-1">
                  {years}+
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Years Experience</div>
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-purple-200/50 dark:border-purple-800/50 rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-1">
                  15+
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Technologies</div>
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-pink-200/50 dark:border-pink-800/50 rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 dark:from-pink-400 dark:to-rose-400 bg-clip-text text-transparent mb-1">
                  6+
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Projects</div>
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-blue-200/50 dark:border-blue-800/50 rounded-xl p-4 text-center shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent mb-1">
                  Pune
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">Location</div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Content Card */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 30 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="space-y-5">
                <motion.p
                  initial={reduceMotion ? false : { opacity: 0 }}
                  whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  I'm <span className="font-bold text-indigo-600 dark:text-indigo-400">Vinay Kushwah</span>, a
                  passionate full-stack engineer with <span className="font-semibold text-purple-600 dark:text-purple-400">{years}+ years</span> of experience crafting scalable, 
                  high-performance web applications. I specialize in building end-to-end solutions 
                  that combine elegant frontend experiences with robust backend architectures.
                </motion.p>

                <motion.p
                  initial={reduceMotion ? false : { opacity: 0 }}
                  whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  My journey in software development has been driven by a love for solving complex 
                  problems and creating products that make a real impact. I've worked with startups 
                  and established companies, shipping production-ready features that improve user 
                  experiences and drive business growth.
                </motion.p>

                <motion.p
                  initial={reduceMotion ? false : { opacity: 0 }}
                  whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  I'm passionate about <span className="font-semibold text-indigo-600 dark:text-indigo-400">performance optimization</span>, 
                  writing <span className="font-semibold text-purple-600 dark:text-purple-400">clean, maintainable code</span>, and 
                  staying current with the latest technologies. My expertise spans the entire development 
                  lifecycle—from initial concept and design to deployment and optimization.
                </motion.p>

                <motion.p
                  initial={reduceMotion ? false : { opacity: 0 }}
                  whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  When I'm not coding, I enjoy <span className="font-semibold text-pink-600 dark:text-pink-400">mentoring junior developers</span>, 
                  contributing to <span className="font-semibold text-indigo-600 dark:text-indigo-400">open-source projects</span>, and 
                  exploring new frameworks and tools. I believe in continuous learning and sharing knowledge 
                  with the developer community.
                </motion.p>
              </div>
            </motion.div>

            {/* Key Focus Areas */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200/50 dark:border-indigo-800/50 rounded-2xl p-6 sm:p-8"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-indigo-600 to-purple-600 rounded-full" />
                Key Focus Areas
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {[
                  "Performance Optimization",
                  "Clean Code Architecture",
                  "Scalable Solutions",
                  "User Experience",
                  "Modern Frameworks",
                  "Best Practices"
                ].map((focus, idx) => (
                  <motion.li
                    key={focus}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.05 }}
                    className="flex items-center gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                    {focus}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Tech Stack Tags */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Technologies I Love</h3>
              <div className="flex flex-wrap gap-3">
                {tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
                    whileHover={reduceMotion ? undefined : { scale: 1.1, y: -2 }}
                    className="px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
