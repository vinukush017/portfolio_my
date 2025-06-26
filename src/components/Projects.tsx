import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Car Daddy CRM",
    description:
      "Built a scalable car registration and customer management system with secure JWT authentication, AWS S3 file storage, and real-time WhatsApp/email integrations. Frontend built in React.js with 99.9% uptime.",
    link: "https://www.cardaddys.co.uk/",
    image: "",
  },
  {
    title: "DropChat AI",
    description:
      "Developed an AI-powered chatbot builder with OpenAI APIs, document upload training, user plans, and embeddable bots. Boosted user engagement by 40% through a clean React.js interface and fast backend.",
    link: "https://app.dropchat.co/",
    image: "",
  },
  {
    title: "FactGully",
    description:
      "Launched FactGully, a modern fact-sharing platform featuring daily themes in science, history, tech, and myths. Built with React and Tailwind, deployed on Vercel with fast load performance and SEO/social sharing optimization.",
    link: "https://fact-gully.vercel.app",
    image: "/projects/fact-gully.png",
  },
];

const Projects = () => {
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPreviewImg(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);
  return (
    <>
      <section
        className="py-20 px-6 bg-gray-100 dark:bg-slate-900"
        id="projects"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white"
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow hover:shadow-lg hover:-translate-y-1 transition-transform"
            >
              {proj.image && (
                <img
                  src={proj.image}
                  alt={`${proj.title} screenshot`}
                  className="w-full h-48 object-cover rounded-md mb-4 border dark:border-slate-700"
                  onClick={() => setPreviewImg(proj.image)}
                />
              )}

              <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
                {proj.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {proj.description}
              </p>

              {/* Optional Tags (manually define or attach in project object) */}
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.title === "Car Daddy CRM" && (
                  <>
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 text-xs rounded-full">
                      React
                    </span>
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 text-xs rounded-full">
                      Node.js
                    </span>
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 text-xs rounded-full">
                      Express.js
                    </span>
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 text-xs rounded-full">
                      MongoDB
                    </span>
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 text-xs rounded-full">
                      AWS
                    </span>
                  </>
                )}
                {proj.title === "DropChat AI" && (
                  <>
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 text-xs rounded-full">
                      OpenAI
                    </span>
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 text-xs rounded-full">
                      React
                    </span>
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 text-xs rounded-full">
                      MongoDB
                    </span>
                  </>
                )}
                {proj.title === "FactGully" && (
                  <>
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 text-xs rounded-full">
                      React
                    </span>
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 text-xs rounded-full">
                      Tailwind CSS
                    </span>
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 text-xs rounded-full">
                      Vercel
                    </span>
                    <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 text-xs rounded-full">
                      SEO
                    </span>
                  </>
                )}
              </div>

              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium text-indigo-600 hover:text-indigo-800 transition"
              >
                View Project →
              </a>
            </motion.div>
          ))}
        </div>
      </section>
      {previewImg && (
        <motion.div
          key="preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setPreviewImg(null)}
        >
          <motion.img
            src={previewImg}
            alt="Preview"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg border-4 border-white dark:border-slate-800"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
          />
        </motion.div>
      )}
    </>
  );
};

export default Projects;
