import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import {
  SECTION_LINKS,
  scrollToSection,
} from "../config/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="text-white bg-gray-950"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {/* Main CTA */}
        <div className="grid gap-8 pb-12 border-b border-white/15 md:grid-cols-12 md:items-end lg:pb-16">
          <div className="md:col-span-8">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-gray-500 sm:text-xs">
              Have something interesting in mind?
            </p>

            <h2 className="mt-4 max-w-3xl font-heading text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Let&apos;s build something
              <span className="text-indigo-400">
                {" "}
                worth using.
              </span>
            </h2>

            <p className="max-w-xl mt-5 text-sm leading-7 text-gray-400 sm:text-base">
              I&apos;m interested in meaningful engineering challenges,
              product ideas, and opportunities to build reliable software.
            </p>
          </div>

          <div className="md:col-span-4 md:flex md:justify-end">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-gray-950 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-400 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-4 focus-visible:ring-offset-gray-950 sm:w-auto"
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
              className="group inline-flex items-center gap-1 rounded-md font-heading text-xl font-bold tracking-[-0.04em] text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              VK

              <span className="text-indigo-400 transition-colors group-hover:text-cyan-400">
                .
              </span>
            </button>

            <p className="max-w-sm mt-4 text-sm leading-7 text-gray-400">
              Software engineer building reliable backend systems, APIs,
              integrations, and modern web applications from Pune, India.
            </p>
          </div>

          {/* Navigation */}
          <nav
            aria-label="Footer navigation"
            className="md:col-span-4"
          >
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500 sm:text-xs">
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
                  className="text-sm text-gray-300 transition-colors rounded-sm hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>

          {/* External links */}
          <div className="md:col-span-3">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500 sm:text-xs">
              Elsewhere
            </p>

            <div className="flex flex-col items-start gap-3">
              <a
                href="https://github.com/vinukush017"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Vinay Kushwah on GitHub"
                className="group inline-flex items-center gap-1.5 rounded-sm text-sm text-gray-300 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
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
                className="group inline-flex items-center gap-1.5 rounded-sm text-sm text-gray-300 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
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
                className="group inline-flex items-center gap-1.5 rounded-sm text-sm text-gray-300 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
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
        <div className="flex flex-col gap-3 border-t border-white/15 pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:text-[11px]">
          <p>© {currentYear} Vinay Kushwah</p>

          <p>Designed &amp; built with React + TypeScript</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;