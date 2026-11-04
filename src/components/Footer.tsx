import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import {
  SECTION_LINKS,
  scrollToSection,
} from "../config/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="theme-footer site-divider border-t"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="section-shell py-12 sm:py-16 lg:py-20">
        {/* Main CTA */}
        <div className="grid gap-8 pb-12 border-b site-divider md:grid-cols-12 md:items-end lg:pb-16">
          <div className="md:col-span-8">
            <p className="font-sans text-xs font-medium uppercase tracking-[0.12em] site-text-subtle sm:text-xs">
              Have something interesting in mind?
            </p>

            <h2 className="mt-4 max-w-3xl font-heading type-section text-theme-heading">
              Let&apos;s build something
              <span className="footer-heading-accent">
                {" "}
                worth using.
              </span>
            </h2>

            <p className="max-w-xl mt-5 type-body site-text-muted sm:text-base">
              I&apos;m interested in meaningful engineering challenges,
              product ideas, and opportunities to build reliable software.
            </p>
          </div>

          <div className="md:col-span-4 md:flex md:justify-end">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="primary-action group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--theme-accent)] px-6 text-sm font-semibold text-[var(--theme-on-accent)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-accent/10 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--site-background)] sm:w-auto"
            >
              Start a conversation

              <ArrowUpRightIcon
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>

        {/* Footer content */}
        <div className="grid gap-10 py-10 md:grid-cols-12 lg:py-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              aria-label="Vinay Kushwah — Back to top"
              className="group inline-flex items-center gap-1 rounded-md font-heading text-xl font-semibold tracking-[-0.04em] site-text-primary transition-colors group-hover:text-theme-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
            >
              VK

              <span className="text-theme-accent transition-colors">
                .
              </span>
            </button>

            <p className="max-w-sm mt-4 type-body site-text-muted">
              Software engineer building reliable backend systems, APIs,
              integrations, and modern web applications from Pune, India.
            </p>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer navigation"
            className="md:col-span-4"
          >
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.1em] site-text-subtle sm:text-xs">
              Navigate
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {SECTION_LINKS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(id);
                  }}
                  className="text-sm site-text-primary transition-colors rounded-sm hover:text-theme-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>

          {/* External links */}
          <div className="md:col-span-3">
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.1em] site-text-subtle sm:text-xs">
              Elsewhere
            </p>

            <div className="flex flex-col items-start gap-3">
              <a
                href="https://github.com/vinukush017"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Vinay Kushwah on GitHub"
                className="group inline-flex items-center gap-1.5 rounded-sm text-sm site-text-primary transition-colors hover:text-theme-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
              >
                GitHub

                <ArrowUpRightIcon
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <a
                href="https://www.linkedin.com/in/vinaykushwah017"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Vinay Kushwah on LinkedIn"
                className="group inline-flex items-center gap-1.5 rounded-sm text-sm site-text-primary transition-colors hover:text-theme-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
              >
                LinkedIn

                <ArrowUpRightIcon
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>

              <a
                href="mailto:vinay.kushwah89@gmail.com"
                aria-label="Email Vinay Kushwah"
                className="group inline-flex items-center gap-1.5 rounded-sm text-sm site-text-primary transition-colors hover:text-theme-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light"
              >
                Email

                <ArrowUpRightIcon
                  aria-hidden="true"
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col gap-3 border-t site-divider pt-6 font-sans text-xs tracking-[0.02em] site-text-subtle sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>
            © {currentYear}{" "}
            <span className="site-text-primary">Vinay Kushwah</span>. All
            rights reserved.
          </p>

          <p>Designed &amp; built with React + TypeScript</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
