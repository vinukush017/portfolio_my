import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "./SectionHeader";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwpwglna";

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (res.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        // Try to read JSON error details from Formspree
        const data = await res.json().catch(() => null);
        const msg =
          (data && (data.error || (data.errors && data.errors[0]?.message))) ||
          "Failed to send message. Please try again later.";
        setError(msg);
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setError("Network error — please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        subtitle="Let's Connect"
        title="Get In Touch"
        description="Have a project in mind or want to collaborate? I'd love to hear from you. Whether it's a full-time opportunity, freelance project, or just a friendly chat about technology, feel free to reach out!"
      />

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto space-y-4 sm:space-y-6 bg-gradient-to-br from-white/80 to-indigo-50/50 dark:from-gray-900/80 dark:to-indigo-900/30 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-indigo-200/30 dark:border-indigo-800/30 shadow-xl"
      >
        <motion.input
          type="text"
          name="name"
          placeholder="Your Name"
          aria-label="Your Name"
          whileFocus={{ scale: 1.02 }}
          className="w-full p-3 sm:p-4 border-2 border-indigo-200 dark:border-indigo-800 rounded-lg sm:rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-sm sm:text-base"
          required
        />
        <motion.input
          type="email"
          name="email"
          placeholder="Your Email"
          aria-label="Your Email"
          whileFocus={{ scale: 1.02 }}
          className="w-full p-3 sm:p-4 border-2 border-indigo-200 dark:border-indigo-800 rounded-lg sm:rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 text-sm sm:text-base"
          required
        />
        <motion.textarea
          name="message"
          placeholder="Your Message"
          aria-label="Your Message"
          rows={6}
          whileFocus={{ scale: 1.02 }}
          className="w-full p-4 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 resize-none"
          required
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading || submitted}
          aria-disabled={loading || submitted}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-indigo-500/50 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          {loading ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block"
              >
                ⟳
              </motion.span>
              Sending…
            </>
          ) : submitted ? (
            <>
              ✓ Message Sent
            </>
          ) : (
            <>
              Send Message
              <span className="text-lg">→</span>
            </>
          )}
        </motion.button>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-600 dark:text-red-400 text-sm mt-2 text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800" role="alert"
            >
              {error}
            </motion.p>
          )}

          {submitted && !error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-green-600 dark:text-green-400 text-sm mt-2 text-center bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800 font-medium" role="status"
            >
              ✓ Thank you for reaching out! I&apos;ll get back to you soon.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>
    </section>
  );
};

export default Contact;
