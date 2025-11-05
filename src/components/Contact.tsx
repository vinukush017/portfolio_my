import React, { useState } from "react";
import { motion } from "framer-motion";

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
    <section className="py-4 w-[90%] mx-auto" id="contact">
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
        className="max-w-3xl mx-auto space-y-4"
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
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition disabled:opacity-60"
          disabled={loading || submitted}
          aria-disabled={loading || submitted}
        >
          {loading ? "Sending…" : submitted ? "Message Sent ✔" : "Send Message"}
        </button>

        {error && (
          <p className="text-red-600 text-sm mt-2 text-center" role="alert">
            {error}
          </p>
        )}

        {submitted && !error && (
          <p className="text-green-600 text-sm mt-2 text-center" role="status">
            Thank you for reaching out! I&apos;ll get back to you soon.
          </p>
        )}
      </motion.form>
    </section>
  );
};

export default Contact;
