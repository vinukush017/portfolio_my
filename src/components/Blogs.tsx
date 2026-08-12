import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRightIcon, DocumentTextIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BLOG_POSTS, type BlogPost } from "../config/blogs";
import { BLOG_PREVIEWS } from "../content/blogPreviews";
import SectionHeader from "./SectionHeader";

const Blogs = () => {
  const reduceMotion = useReducedMotion();
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!activePost) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePost(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activePost]);

  return (
    <section className="border-b border-gray-200 py-16 dark:border-white/10 sm:py-20 lg:py-24" aria-label="Technical writing">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          subtitle="05 / Writing"
          title="Notes from building products."
          description="Practical lessons about JavaScript fundamentals, frontend architecture, and reliable product engineering."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post, index) => {
            const isPublished = Boolean(post.url);

            return (
              <motion.article
                key={post.title}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="flex min-h-[360px] flex-col rounded-2xl border border-gray-300 bg-white p-5 dark:border-white/10 dark:bg-[#111419] sm:p-6"
              >
                <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-gray-500">
                  <span>{post.publishedAt ?? "Draft ready"}</span>
                  <DocumentTextIcon className="h-5 w-5 text-indigo-600 dark:text-cyan-400" />
                </div>

                <h3 className="mt-8 font-heading text-2xl font-semibold leading-tight tracking-[-0.025em] text-gray-950 dark:text-white">{post.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{post.excerpt}</p>

                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Article topics">
                  {post.tags.map((tag) => (
                    <li key={tag} className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-400">{tag}</li>
                  ))}
                </ul>

                <div className="mt-auto border-t border-gray-200 pt-5 dark:border-white/10">
                  <p className="mb-4 text-xs text-gray-500">{post.readTime}</p>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    {isPublished && post.previewId ? (
                      <button
                        type="button"
                        onClick={() => setActivePost(post)}
                        className="rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-950 transition-colors hover:border-gray-950 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/15 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5"
                      >
                        Read preview
                      </button>
                    ) : <span />}

                    {isPublished ? (
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-gray-950 transition-colors hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-white dark:hover:text-cyan-400"
                        aria-label={`Read ${post.title} on Medium`}
                      >
                        Medium
                        <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ) : (
                      <span className="text-sm font-semibold text-gray-500">Publishing soon</span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {createPortal(<AnimatePresence>
        {activePost?.previewId && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-gray-950/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActivePost(null);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="blog-preview-title"
              initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-gray-200 bg-[#f8f8f4] text-gray-950 shadow-2xl dark:border-white/10 dark:bg-[#0b0d10] dark:text-white sm:max-h-[88dvh] sm:rounded-3xl"
            >
              <div className="flex items-start justify-between gap-5 border-b border-gray-200 px-5 py-5 dark:border-white/10 sm:px-8">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-indigo-600 dark:text-cyan-400">Article preview</p>
                  <h3 id="blog-preview-title" className="mt-2 max-w-2xl font-heading text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{activePost.title}</h3>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setActivePost(null)}
                  className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-full border border-gray-300 text-gray-700 transition hover:border-gray-950 hover:text-gray-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-white/15 dark:text-gray-300 dark:hover:border-white dark:hover:text-white"
                  aria-label="Close article preview"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="overscroll-contain overflow-y-auto px-5 py-7 sm:px-8 sm:py-9">
                <div className="mx-auto max-w-2xl">
                  {BLOG_PREVIEWS[activePost.previewId].map((block, index) => {
                    if (block.type === "heading") {
                      return <h4 key={index} className="mb-3 mt-8 font-heading text-xl font-semibold tracking-tight first:mt-0">{block.content}</h4>;
                    }

                    if (block.type === "code") {
                      return (
                        <pre
                          key={index}
                          className="my-6 overflow-x-auto whitespace-pre-wrap break-words rounded-xl border border-gray-700 bg-gray-950 p-4 font-mono text-sm leading-6"
                          style={{ color: "#f3f4f6", WebkitTextFillColor: "#f3f4f6" }}
                        >
                          <code className="block text-gray-100" style={{ color: "#f3f4f6", WebkitTextFillColor: "#f3f4f6" }}>
                            {block.content}
                          </code>
                        </pre>
                      );
                    }

                    return <p key={index} className="mb-5 text-base leading-8 text-gray-700 dark:text-gray-300">{block.content}</p>;
                  })}

                  <div className="mt-10 overflow-hidden rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-6 text-center dark:border-cyan-400/20 dark:from-cyan-400/10 dark:to-[#111419] sm:p-8">
                    <p className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">Continue the full article.</p>
                    <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-gray-600 dark:text-gray-400">Keep reading for the complete explanation, practical examples, and interview questions on Medium.</p>
                    <a
                      href={activePost.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gray-950 px-6 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-white dark:text-gray-950"
                    >
                      Continue reading on Medium
                      <ArrowUpRightIcon className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>, document.body)}
    </section>
  );
};

export default Blogs;
