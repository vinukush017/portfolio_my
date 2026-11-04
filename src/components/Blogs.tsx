import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  ArrowUpRightIcon,
  DocumentTextIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
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

    const timeout = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePost(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activePost]);

  const reveal = (index: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: {
      once: true,
      amount: 0.15,
    },
    transition: reduceMotion
      ? { duration: 0 }
      : {
          duration: 0.5,
          delay: Math.min(index * 0.06, 0.18),
          ease: [0.22, 1, 0.36, 1] as const,
        },
  });

  return (
    <section
      id="writing"
      aria-labelledby="writing-heading"
      className="site-divider border-b py-20 sm:py-24 lg:py-32"
    >
      <div className="section-shell">
        <div id="writing-heading">
          <SectionHeader
            subtitle="05 / Writing"
            title={
              <>
                <span className="heading-accent">
                  Writing
                </span>{" "}
                About The Things I've Worked On.
              </>
            }
            description="Practical notes on JavaScript, backend systems, frontend architecture, and lessons learned while building production software."
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {BLOG_POSTS.map((post, index) => {
            const isPublished = Boolean(post.url);
            const hasPreview = Boolean(post.previewId);

            return (
              <motion.article
                key={post.title}
                {...reveal(index)}
                className="group flex min-h-[370px] flex-col rounded-3xl border site-divider bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_20px_50px_rgba(15,23,42,0.07)]  dark:hover:border-accent-light/30 dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:p-6"
              >
                {/* Meta */}
                <div className="flex items-center justify-between gap-4">
                  <p className="font-sans text-xs uppercase tracking-[0.1em] site-text-subtle sm:text-xs">
                    {post.publishedAt ?? "Draft ready"}
                  </p>

                  <span className="inline-flex items-center justify-center w-10 h-10 text-theme-accent transition-colors border site-divider rounded-full group-hover:border-accent/25 group-hover:bg-accent/10  dark:group-hover:border-accent-light/25 dark:group-hover:bg-accent/10">
                    <DocumentTextIcon aria-hidden="true" className="w-5 h-5" />
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-8 font-heading type-card-title text-theme-heading transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-4 type-body site-text-muted">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <ul
                  className="flex flex-wrap gap-2 mt-6"
                  aria-label={`${post.title} topics`}
                >
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border site-divider bg-surface-elevated px-2.5 py-1 font-sans text-xs font-medium site-text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="mt-auto pt-7">
                  <div className="pt-5 border-t site-divider">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs site-text-subtle">{post.readTime}</p>

                      <div className="flex items-center gap-4">
                        {hasPreview && (
                          <button
                            type="button"
                            onClick={() => setActivePost(post)}
                            className="text-sm font-semibold text-theme-accent transition-colors hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent "
                          >
                            Preview
                          </button>
                        )}

                        {isPublished ? (
                          <a
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Read ${post.title} on Medium`}
                            className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-theme-accent transition-colors hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent "
                          >
                            Read article
                            <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                          </a>
                        ) : (
                          <span className="text-sm font-semibold site-text-subtle">
                            Coming soon
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {activePost?.previewId && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-end justify-center bg-[var(--site-backdrop)]  sm:items-center sm:p-6"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.2 }}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) {
                    setActivePost(null);
                  }
                }}
              >
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="blog-preview-title"
                  aria-describedby="blog-preview-description"
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 28,
                          scale: 0.98,
                        }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={
                    reduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          y: 20,
                          scale: 0.98,
                        }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.25,
                  }}
                  className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border site-divider bg-surface site-text-primary shadow-2xl sm:max-h-[88dvh] sm:rounded-3xl"
                >
                  {/* Modal header */}
                  <div className="flex items-start justify-between gap-5 px-5 py-5 border-b site-divider sm:px-8 sm:py-6">
                    <div>
                      <p className="font-sans text-xs uppercase tracking-[0.12em] site-text-muted">
                        Article preview
                      </p>

                      <h3
                        id="blog-preview-title"
                        className="text-theme-heading mt-2 max-w-2xl font-heading text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl"
                      >
                        {activePost.title}
                      </h3>

                      <p id="blog-preview-description" className="sr-only">
                        Preview of the article {activePost.title}
                      </p>
                    </div>

                    <button
                      ref={closeButtonRef}
                      type="button"
                      onClick={() => setActivePost(null)}
                      className="inline-flex items-center justify-center flex-none w-10 h-10 site-text-muted transition-all border site-divider rounded-full hover:border-accent hover:bg-accent/10 hover:text-accent-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-accent "
                      aria-label="Close article preview"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Modal content */}
                  <div className="px-5 overflow-y-auto overscroll-contain py-7 sm:px-8 sm:py-9">
                    <div className="max-w-2xl mx-auto">
                      {BLOG_PREVIEWS[activePost.previewId]?.map(
                        (block, index) => {
                          if (block.type === "heading") {
                            return (
                              <h4
                                key={index}
                                className="text-theme-heading mb-3 mt-8 font-heading text-xl font-semibold tracking-[-0.025em] first:mt-0"
                              >
                                {block.content}
                              </h4>
                            );
                          }

                          if (block.type === "code") {
                            return (
                              <pre
                                key={index}
                                className="p-4 my-6 overflow-x-auto font-mono text-sm leading-6 site-text-primary break-words whitespace-pre-wrap border rounded-2xl site-divider bg-surface-elevated sm:p-5"
                              >
                                <code>{block.content}</code>
                              </pre>
                            );
                          }

                          return (
                            <p
                              key={index}
                              className="mb-5 text-base leading-8 site-text-muted"
                            >
                              {block.content}
                            </p>
                          );
                        },
                      )}

                      {/* Medium CTA */}
                      <div className="mt-10 overflow-hidden rounded-2xl border site-divider bg-surface p-6 text-center sm:p-8">
                        <p className="font-heading text-xl font-semibold tracking-[-0.025em] sm:text-2xl">
                          Continue reading the full article.
                        </p>

                        <p className="max-w-lg mx-auto mt-3 type-body site-text-muted">
                          Read the complete explanation, practical examples, and
                          deeper technical notes on Medium.
                        </p>

                        {activePost.url && (
                          <a
                            href={activePost.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-dark px-6 text-sm font-semibold site-on-accent shadow-md shadow-accent/20 transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                          >
                            Continue on Medium
                            <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
};

export default Blogs;
