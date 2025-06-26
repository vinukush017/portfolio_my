import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section className="py-20 px-6 bg-white dark:bg-slate-800" id="contact">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-10 text-gray-900 dark:text-white"
      >
        Contact
      </motion.h2>

      <motion.form
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto space-y-4"
      >
        <input
          type="text"
          name="name"
          aria-label="Your Name"
          placeholder="Name"
          className="w-full p-3 border rounded bg-gray-100 dark:bg-slate-900 dark:text-white dark:border-slate-700"
          required
        />
        <input
          type="email"
          name="email"
          aria-label="Your Email"
          placeholder="Email"
          className="w-full p-3 border rounded bg-gray-100 dark:bg-slate-900 dark:text-white dark:border-slate-700"
          required
        />
        <textarea
          name="message"
          aria-label="Your Message"
          placeholder="Message"
          rows={5}
          className="w-full p-3 border rounded bg-gray-100 dark:bg-slate-900 dark:text-white dark:border-slate-700"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
        >
          Send Message
        </button>
      </motion.form>
    </section>
  );
};

export default Contact;
