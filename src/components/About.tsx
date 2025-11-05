import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

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
      id="about"
      aria-label="About Vinay Kushwah"
      className="w-[95%] md:w-[85%] mx-auto scroll-mt-24 text-gray-900 dark:text-white flex items-center py-12"
    >
      <motion.div
        className="w-full mx-auto"
        initial={reduceMotion ? false : { opacity: 0, y: 40 }}
        whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-indigo-600 dark:text-indigo-400">
          About Me
        </h2>

        {/* Content card */}
        <div className="bg-gradient-to-b from-gray-100/90 to-white/80 dark:from-gray-900/80 dark:to-gray-900/40 border border-white/10 backdrop-blur rounded-2xl shadow-sm p-6 md:p-8">
          {/* Two-column on md+ */}
          <div className="grid md:grid-cols-[1fr,1.4fr] gap-8 items-start">
            {/* Portrait / Illustration */}
            <div className="mx-auto max-w-sm w-full">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-indigo-100 dark:bg-indigo-900/40">
                {/* Replace src with your real headshot if available */}
                <img
                  src="/avatar.jpg"
                  alt="Portrait of Vinay Kushwah"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Quick facts */}
              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-white/70 dark:bg-white/5 p-3 border border-white/10">
                  <dt className="text-gray-600 dark:text-gray-400">Location</dt>
                  <dd className="font-medium">Pune, India</dd>
                </div>
                <div className="rounded-lg bg-white/70 dark:bg-white/5 p-3 border border-white/10">
                  <dt className="text-gray-600 dark:text-gray-400">
                    Experience
                  </dt>
                  <dd className="font-medium">{years}+ years</dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-col justify-center text-center md:text-left h-full">
              <div className="flex flex-col justify-center">
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  I’m <span className="font-semibold">Vinay Kushwah</span>, a
                  full-stack engineer focused on building maintainable and
                  high-performance web applications. I work across the stack —
                  from polished React frontends to resilient Node.js backends.
                </p>

                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Recent work includes shipping production features for startups
                  and building internal tools that reduce operational load. I
                  care about fast load times, clear developer ergonomics, and
                  code that’s easy to reason about.
                </p>

                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Tech highlights: <strong>React</strong>,{" "}
                  <strong>Next.js</strong>, <strong>Node.js</strong>,{" "}
                  <strong>TypeScript</strong>, <strong>Tailwind</strong>. I pair
                  pragmatic engineering with product-minded thinking to deliver
                  measurable impact.
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  Open to product-focused roles and contract work. I mentor
                  junior engineers and contribute to open-source when possible.
                </p>

                {/* Tags */}
                <ul
                  className="flex flex-wrap justify-center md:justify-start gap-3 mt-6"
                  aria-hidden="true"
                >
                  {tags.map((tag) => (
                    <li key={tag}>
                      <motion.span
                        whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                        className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 text-sm font-medium border border-transparent"
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
