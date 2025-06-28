import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-20 px-6 sm:px-12 md:px-20 bg-white dark:bg-black text-gray-900 dark:text-white flex items-center"
    >
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
          About Me
        </h2>

        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          I’m <span className="font-semibold">Vinay Kushwah</span>, a full stack
          developer based in Pune with <strong>4+ years of experience</strong>{" "}
          crafting scalable, high-performance web applications using the MERN
          stack.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          I specialize in building fast, user-focused frontends with{" "}
          <strong>React.js</strong> and scalable backend systems using{" "}
          <strong>Node.js</strong> and <strong>Express</strong>. I'm also
          experienced with <strong>MongoDB</strong>, <strong>PostgreSQL</strong>
          , and DevOps tools like <strong>AWS S3</strong> and GitHub Actions.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          From architecting APIs that reduce load time to designing reusable UI
          components with <strong>Tailwind CSS</strong>, I aim to write clean,
          maintainable code that delivers real business value.
        </p>

        <p className="text-gray-600 dark:text-gray-400 mb-4">
          I’m a strong believer in lifelong learning, team collaboration, and
          building products that users genuinely enjoy using.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {[
            "MERN Stack",
            "Clean Code",
            "Performance Driven",
            "Reusable UI",
          ].map((tag, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-4 py-2 rounded-full text-sm font-medium"
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
