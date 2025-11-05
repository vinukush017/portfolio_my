import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const About = () => {
  const reduceMotion = useReducedMotion();

  // Auto-calc experience years (update startYear to your real start)
  const years = useMemo(() => {
    const startYear = 2021;
    const now = new Date();
    const raw = now.getFullYear() - startYear + (now.getMonth() >= 6 ? 0.5 : 0);
    return raw % 1 === 0 ? String(raw) : raw.toFixed(1);
  }, []);

  const tags = [
    "MERN Stack",
    "Clean Code",
    "Performance Driven",
    "Reusable UI",
  ];

  return (
    <section
      id="about"
      aria-label="About Vinay Kushwah"
      className="min-h-[calc(100vh-64px)] w-[85%] mx-auto scroll-mt-24 text-gray-900 dark:text-white flex items-center"
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
        <div className="bg-gradient-to-b from-gray-100/90 to-white/80 dark:from-gray-900/80 dark:to-gray-900/40 border border-white/10 backdrop-blur rounded-2xl shadow-sm">
          {/* Two-column on md+ */}
          <div className="grid md:grid-cols-[1fr,1.2fr] gap-8 items-center">
            {/* Portrait / Illustration */}
            <div className="mx-auto max-w-sm w-full">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-indigo-100 dark:bg-indigo-900/40">
                {/* Replace src with your real headshot if available */}
                <img
                  src="/avatar.jpg"
                  alt="Portrait of Vinay Kushwah"
                  className="h-full w-full object-full"
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

            {/* Copy */}
            <div className="text-center md:text-left">
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                I’m <span className="font-semibold">Vinay Kushwah</span>, a
                full-stack developer based in Pune with{" "}
                <strong>{years}+ years of experience</strong> crafting scalable,
                high-performance web applications on the MERN stack.
              </p>

              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                I specialize in building fast, user-focused frontends with{" "}
                <strong>React.js</strong> and scalable backends with{" "}
                <strong>Node.js</strong> and <strong>Express</strong>. I’m
                experienced with <strong>MongoDB</strong>,{" "}
                <strong>PostgreSQL</strong>, and DevOps flows using{" "}
                <strong>AWS S3</strong> and <strong>GitHub Actions</strong>.
              </p>

              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                From architecting APIs that reduce load time to designing
                reusable UI with <strong>Tailwind CSS</strong>, I aim for clean,
                maintainable code that delivers real business value.
              </p>

              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                I believe in lifelong learning, collaboration, and building
                products users genuinely enjoy.
              </p>

              {/* Tags */}
              <ul className="flex flex-wrap justify-center md:justify-start gap-3 mt-8">
                {tags.map((tag) => (
                  <li key={tag}>
                    <motion.button
                      type="button"
                      whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                      className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
                    >
                      {tag}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
