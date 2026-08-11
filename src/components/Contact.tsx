import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import SectionHeader from "./SectionHeader";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwpwglna";

const contactLinks = [
  {
    label: "Email",
    value: "vinay.kushwah89@gmail.com",
    href: "mailto:vinay.kushwah89@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "Connect professionally",
    href: "https://linkedin.com/in/vinaykushwah017",
  },
  {
    label: "GitHub",
    value: "Explore my code",
    href: "https://github.com/vinukush017",
  },
];

const fieldClass =
  "w-full rounded-xl border border-gray-300 bg-[#f8f8f4] px-4 py-3.5 text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 dark:border-white/15 dark:bg-[#0b0d10] dark:text-white dark:placeholder:text-gray-600";

const Contact: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        const data = await response.json().catch(() => null);
        const message =
          (data && (data.error || data.errors?.[0]?.message)) ||
          "Failed to send your message. Please try again.";
        setError(message);
      }
    } catch {
      setError("Network error — please try again or email me directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <SectionHeader
        subtitle="05 / Contact"
        title="Let’s build something useful."
        description="Have a product idea, an engineering challenge, or a role that could be a fit? Tell me what you are working on."
      />

      <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="order-2 lg:order-1 lg:col-span-5"
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
            Direct contact
          </p>
          <a
            href="mailto:vinay.kushwah89@gmail.com"
            className="mt-4 block max-w-md break-all text-xl font-semibold tracking-tight text-gray-950 transition hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400 min-[400px]:text-2xl sm:break-words sm:text-3xl"
          >
            vinay.kushwah89<br className="hidden sm:block" />@gmail.com
          </a>

          <div className="mt-10 border-t border-gray-300 dark:border-white/15">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="group grid grid-cols-[1fr_auto] items-center gap-3 border-b border-gray-300 py-4 text-sm dark:border-white/15"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-wider text-gray-500">{link.label}</span>
                  <span className="mt-1 block break-words font-medium text-gray-800 transition group-hover:text-indigo-600 dark:text-gray-200 dark:group-hover:text-indigo-400">{link.value}</span>
                </span>
                <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            Available for selected projects · Usually replies within 24 hours
          </div>
        </motion.div>

        <motion.form
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ delay: 0.08 }}
          onSubmit={handleSubmit}
          aria-label="Contact Vinay Kushwah"
          className="order-1 rounded-2xl border border-gray-300 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)] dark:border-white/15 dark:bg-[#111419] sm:p-8 lg:order-2 lg:col-span-7"
        >
          <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-5 dark:border-white/10">
            <h3 className="text-xl font-semibold tracking-tight text-gray-950 dark:text-white">
              Start a conversation
            </h3>
            <span className="hidden font-mono text-xs text-gray-400 sm:block">MESSAGE / 01</span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">
              Name
              <input className={`${fieldClass} mt-2`} id="name" name="name" autoComplete="name" placeholder="Your name" required />
            </label>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
              Email
              <input className={`${fieldClass} mt-2`} type="email" id="email" name="email" autoComplete="email" inputMode="email" placeholder="you@company.com" required />
            </label>
          </div>

          <label className="mt-5 block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="message">
            What can I help with?
            <textarea className={`${fieldClass} mt-2 resize-y`} id="message" name="message" minLength={20} maxLength={2000} rows={6} placeholder="A short note about the project, timeline, and goals…" required />
          </label>

          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <button
            type="submit"
            disabled={loading || submitted}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gray-950 px-6 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-gray-950 dark:hover:bg-indigo-400 sm:w-auto"
          >
            {loading ? "Sending…" : submitted ? <><CheckIcon className="h-4 w-4" /> Message sent</> : <>Send message <ArrowUpRightIcon className="h-4 w-4" /></>}
          </button>

          <AnimatePresence mode="wait">
            {error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="alert" className="mt-4 text-sm text-red-600 dark:text-red-400">
                {error}
              </motion.p>
            )}
            {submitted && !error && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="status" className="mt-4 text-sm text-emerald-700 dark:text-emerald-400">
                Thanks for reaching out. I’ll get back to you soon.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
