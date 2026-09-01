import React, { useState } from "react";
import { ArrowUpRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mwpwglna";

const contactLinks = [
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
  "w-full rounded-xl border border-gray-300 bg-[#f7f7f2] px-4 py-3.5 text-sm text-gray-950 outline-none transition-all placeholder:text-gray-400 focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/10 dark:border-white/15 dark:bg-[#0b0d10] dark:text-white dark:placeholder:text-gray-600 dark:focus:border-accent-light dark:focus:bg-[#0b0d10] dark:focus:ring-accent/15";

const Contact: React.FC = () => {
  const reduceMotion = useReducedMotion();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    whileInView: {
      opacity: 1,
      y: 0,
    },
    viewport: {
      once: true,
      amount: 0.15,
    },
    transition: reduceMotion
      ? { duration: 0 }
      : {
          duration: 0.5,
          delay,
          ease: [0.22, 1, 0.36, 1] as const,
        },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(null);
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        const message =
          data?.errors?.[0]?.message ||
          data?.error ||
          "I couldn't send your message. Please try again.";

        throw new Error(message);
      }

      form.reset();
      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email me directly.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-16 sm:py-20 lg:py-28"
    >
      <div className="section-shell">
        <div id="contact-heading">
          <SectionHeader
            subtitle="06 / Contact"
            title="Let’s build something useful."
            description="Have an engineering challenge, product idea, or opportunity that could be a good fit? I'd be happy to hear about it."
          />
        </div>

        <div className="grid gap-10 mt-10 lg:mt-14 lg:grid-cols-12 lg:gap-14">
          {/* Contact information */}
          <motion.div
            {...reveal()}
            className="order-2 lg:order-1 lg:col-span-5"
          >
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400 sm:text-xs">
              Get in touch
            </p>

            <a
              href="mailto:vinay.kushwah89@gmail.com"
              className="mt-4 block max-w-md break-all font-heading text-xl font-semibold tracking-[-0.025em] text-gray-950 transition-colors hover:text-accent-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent dark:text-white dark:hover:text-accent-light min-[400px]:text-2xl sm:break-words sm:text-3xl"
            >
              vinay.kushwah89
              <br className="hidden sm:block" />
              @gmail.com
            </a>

            <p className="mt-5 max-w-md text-sm leading-7 text-gray-600 dark:text-gray-400">
              The easiest way to reach me is by email. You can also find me on
              LinkedIn and GitHub.
            </p>

            {/* External links */}
            <div className="mt-10 border-t border-gray-300 dark:border-white/15">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[1fr_auto] items-center gap-3 border-b border-gray-300 py-5 text-sm transition-colors dark:border-white/15"
                >
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-gray-500">
                      {link.label}
                    </span>

                    <span className="mt-1.5 block break-words font-medium text-gray-800 transition-colors group-hover:text-accent-dark dark:text-gray-200 dark:group-hover:text-accent-light">
                      {link.value}
                    </span>
                  </span>

                  <ArrowUpRightIcon className="h-4 w-4 text-gray-500 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-dark dark:group-hover:text-accent-light" />
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="mt-8 flex max-w-md items-start gap-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
              <span
                aria-hidden="true"
                className="flex-none w-2 h-2 mt-2 rounded-full bg-emerald-500"
              />

              <span>
                Open to discussing interesting engineering opportunities and
                product challenges.
              </span>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form
            {...reveal(0.08)}
            onSubmit={handleSubmit}
            aria-label="Contact Vinay Kushwah"
            className="order-1 rounded-3xl border border-gray-300 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.06)] dark:border-white/15 dark:bg-[#111419] sm:p-8 lg:order-2 lg:col-span-7 lg:p-9"
          >
            {/* Form heading */}
            <div className="flex items-center justify-between pb-5 mb-8 border-b border-gray-200 dark:border-white/10">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-dark dark:text-accent-light">
                  Send a message
                </p>

                <h3 className="mt-2 font-heading text-xl font-semibold tracking-[-0.025em] text-gray-950 dark:text-white sm:text-2xl">
                  Start a conversation
                </h3>
              </div>

              <span className="hidden font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400 sm:block">
                MESSAGE / 01
              </span>
            </div>

            {/* Name + Email */}
            <div className="grid gap-5 sm:grid-cols-2">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="name"
              >
                Name
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  required
                  className={`${fieldClass} mt-2`}
                />
              </label>

              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="email"
              >
                Email
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="you@company.com"
                  required
                  className={`${fieldClass} mt-2`}
                />
              </label>
            </div>

            {/* Subject */}
            <label
              className="block mt-5 text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="subject"
            >
              Subject
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="What would you like to discuss?"
                minLength={3}
                maxLength={120}
                required
                className={`${fieldClass} mt-2`}
              />
            </label>

            {/* Message */}
            <label
              className="block mt-5 text-sm font-medium text-gray-700 dark:text-gray-300"
              htmlFor="message"
            >
              Message
              <textarea
                id="message"
                name="message"
                minLength={20}
                maxLength={2000}
                rows={6}
                placeholder="Tell me a little about the opportunity, project, or problem you're working on…"
                required
                className={`${fieldClass} mt-2 resize-y`}
              />
            </label>

            {/* Formspree honeypot */}
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            {/* Formspree subject */}
            <input
              type="hidden"
              name="_subject"
              value="New portfolio contact"
            />

            {/* Submit */}
            <div className="flex flex-col items-start gap-4 mt-7 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={loading || submitted}
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-dark px-6 text-sm font-semibold text-white shadow-md shadow-accent/20 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/25 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 sm:w-auto"
              >
                {loading ? (
                  "Sending…"
                ) : submitted ? (
                  <>
                    <CheckIcon className="w-4 h-4" />
                    Message sent
                  </>
                ) : (
                  <>
                    Send message
                    <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>

              {!submitted && (
                <p className="text-xs leading-5 text-gray-500">
                  Your information is only used to respond to your message.
                </p>
              )}
            </div>

            {/* Form status */}
            <div aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.p
                    key="error"
                    initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{ opacity: 0 }}
                    role="alert"
                    className="px-4 py-3 mt-5 text-sm text-red-700 border border-red-200 rounded-xl bg-red-50 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-400"
                  >
                    {error}
                  </motion.p>
                )}

                {submitted && !error && (
                  <motion.p
                    key="success"
                    initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    role="status"
                    className="px-4 py-3 mt-5 text-sm border rounded-xl border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400"
                  >
                    Thanks for reaching out. I&apos;ll get back to you as soon
                    as I can.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
