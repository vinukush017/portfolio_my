import React, { useState } from "react";
import {
  ArrowUpRightIcon,
  ChatBubbleLeftIcon,
  CheckIcon,
  EnvelopeIcon,
  PaperAirplaneIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
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
  "peer w-full rounded-xl border site-divider bg-surface-elevated py-3.5 pl-12 pr-4 text-base site-text-primary outline-none transition-all duration-300 placeholder:text-[var(--site-text-subtle)] focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10";

const fieldIconClass =
  "pointer-events-none absolute left-4 h-5 w-5 site-text-subtle transition-colors duration-300 peer-focus:text-theme-accent";

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
      className="py-20 sm:py-24 lg:py-32"
    >
      <div className="section-shell">
        <div id="contact-heading">
          <SectionHeader
            subtitle="06 / Contact"
            title={
              <>
                Let&rsquo;s Build Something{" "}
                <span className="heading-accent">
                  Useful
                </span>
                .
              </>
            }
            description="Have an engineering challenge, product idea, or opportunity that could be a good fit? I'd be happy to hear about it."
          />
        </div>

        <div className="grid gap-10 mt-10 lg:mt-14 lg:grid-cols-12 lg:gap-14">
          {/* Contact information */}
          <motion.div
            {...reveal()}
            className="contact-info order-2 lg:order-1 lg:col-span-5"
          >
            <p className="font-sans text-xs font-medium uppercase tracking-[0.12em] site-text-muted sm:text-xs">
              A good conversation starts here
            </p>

            <a
              href="mailto:vinay.kushwah89@gmail.com"
              className="contact-email mt-4 block max-w-md font-heading text-xl font-semibold tracking-[-0.025em] text-theme-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent  min-[400px]:text-2xl sm:break-words sm:text-3xl"
            >
              vinay.kushwah89
              <br className="hidden sm:block" />
              @gmail.com
            </a>

            <p className="mt-5 max-w-md type-body site-text-muted">
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
                    <span className="block font-sans text-xs uppercase tracking-[0.15em] site-text-subtle">
                      {link.label}
                    </span>

                    <span className="mt-1.5 block break-words font-medium site-text-primary transition-colors group-hover:text-theme-accent">
                      {link.value}
                    </span>
                  </span>

                  <ArrowUpRightIcon className="h-4 w-4 text-theme-accent transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-dark dark:group-hover:text-accent-light" />
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="mt-8 flex max-w-md items-start gap-3 type-body site-text-muted">
              <span
                aria-hidden="true"
                className="flex-none w-2 h-2 mt-2 rounded-full bg-accent"
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
            className="contact-panel order-1 rounded-3xl border site-divider bg-surface p-5  sm:p-8 lg:order-2 lg:col-span-7 lg:p-9"
          >
            {/* Form heading */}
            <div className="flex items-center justify-between pb-5 mb-8 border-b site-divider">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.1em] site-text-muted">
                  Send a message
                </p>

                <h3 className="mt-2 font-heading type-card-title text-theme-heading">
                  Start a conversation
                </h3>
              </div>

              <span className="hidden font-sans text-xs uppercase tracking-[0.14em] site-text-subtle sm:block">
                MESSAGE / 01
              </span>
            </div>

            {/* Name + Email */}
            <div className="grid gap-5 sm:grid-cols-2">
              <label
                className="block text-sm font-medium site-text-primary"
                htmlFor="name"
              >
                Name
                <div className="relative mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                    className={fieldClass}
                  />
                  <UserIcon
                    aria-hidden="true"
                    className={`${fieldIconClass} top-1/2 -translate-y-1/2`}
                  />
                </div>
              </label>

              <label
                className="block text-sm font-medium site-text-primary"
                htmlFor="email"
              >
                Email
                <div className="relative mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@company.com"
                    required
                    className={fieldClass}
                  />
                  <EnvelopeIcon
                    aria-hidden="true"
                    className={`${fieldIconClass} top-1/2 -translate-y-1/2`}
                  />
                </div>
              </label>
            </div>

            {/* Subject */}
            <label
              className="block mt-5 text-sm font-medium site-text-primary"
              htmlFor="subject"
            >
              Subject
              <div className="relative mt-2">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="What would you like to discuss?"
                  minLength={3}
                  maxLength={120}
                  required
                  className={fieldClass}
                />
                <TagIcon
                  aria-hidden="true"
                  className={`${fieldIconClass} top-1/2 -translate-y-1/2`}
                />
              </div>
            </label>

            {/* Message */}
            <label
              className="block mt-5 text-sm font-medium site-text-primary"
              htmlFor="message"
            >
              Message
              <div className="relative mt-2">
                <textarea
                  id="message"
                  name="message"
                  minLength={20}
                  maxLength={2000}
                  rows={6}
                  placeholder="Tell me a little about the opportunity, project, or problem you're working on…"
                  required
                  className={`${fieldClass} resize-y`}
                />
                <ChatBubbleLeftIcon aria-hidden="true" className={`${fieldIconClass} top-4`} />
              </div>
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
                className="primary-action group inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-accent pl-5 pr-1.5 text-sm font-semibold site-on-accent shadow-sm shadow-accent/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-md hover:shadow-accent/30 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60 disabled:hover:bg-accent sm:w-auto"
              >
                {loading ? (
                  "Sending…"
                ) : submitted ? (
                  <>
                    Message sent
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--site-background)] text-theme-accent">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                  </>
                ) : (
                  <>
                    Send message
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--site-background)] text-theme-accent">
                      <PaperAirplaneIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </>
                )}
              </button>

              {!submitted && (
                <p className="text-xs leading-5 site-text-subtle">
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
                    className="px-4 py-3 mt-5 text-sm border rounded-xl border-accent/25 bg-accent/5 text-theme-accent"
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
