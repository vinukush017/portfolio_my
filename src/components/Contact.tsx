import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    // Optionally integrate with Formspree, EmailJS, or backend here.
  };

  return (
    <section className="py-20 px-6 bg-white dark:bg-black" id="contact">
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
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          aria-label="Your Name"
          className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-700"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          aria-label="Your Email"
          className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-700"
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          aria-label="Your Message"
          rows={5}
          className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-700"
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
        >
          {submitted ? 'Message Sent ✔' : 'Send Message'}
        </button>
        {submitted && (
          <p className="text-green-600 text-sm mt-2 text-center">
            Thank you for reaching out! I'll get back to you soon.
          </p>
        )}
      </motion.form>
    </section>
  );
};

export default Contact;
