import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { SECTION_LINKS, scrollToSection } from "../config/navigation";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 border-b border-white/15 pb-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-gray-400">Have a project in mind?</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Let’s make something people enjoy using.
            </h2>
          </div>
          <div className="md:col-span-4 md:flex md:justify-end">
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-gray-950 transition hover:bg-indigo-400 sm:w-auto"
            >
              Start a conversation <ArrowUpRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid gap-8 py-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <button onClick={() => scrollToSection("home")} className="text-xl font-bold tracking-[-0.04em]" aria-label="Back to top">
              VK<span className="text-indigo-400">.</span>
            </button>
            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-400">
              Full-stack engineer building thoughtful, dependable digital products from Pune, India.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="md:col-span-4">
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-gray-500">Navigate</p>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {SECTION_LINKS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(id);
                  }}
                  className="text-sm capitalize text-gray-300 transition hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>

          <div className="md:col-span-3">
            <p className="mb-4 font-mono text-xs uppercase tracking-wider text-gray-500">Elsewhere</p>
            <div className="flex gap-5 text-sm text-gray-300">
              <a className="transition hover:text-white" href="https://github.com/vinukush017" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="transition hover:text-white" href="https://www.linkedin.com/in/vinaykushwah017" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/15 pt-6 font-mono text-[11px] uppercase tracking-wider text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vinay Kushwah</p>
          <p>Designed and built with care</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
