import { motion, useReducedMotion } from "framer-motion";
import {
  BriefcaseIcon,
  Square3Stack3DIcon,
  PuzzlePieceIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import SectionHeader from "./SectionHeader";

const focusAreas = [
  "Backend systems & APIs",
  "Application structure & reusable components",
  "Cloud & third-party integrations",
  "Performance & maintainability",
];

const About = () => {
  const reduceMotion = useReducedMotion();

  const startYear = 2021;
  const years = new Date().getFullYear() - startYear;

  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: {
      once: true,
      amount: 0.2,
    },
    transition: reduceMotion
      ? { duration: 0 }
      : {
          duration: 0.5,
          delay,
          ease: [0.22, 1, 0.36, 1] as const,
        },
  });

  const stats = [
    {
      value: `${years}+`,
      label: "Years of experience",
      meta: `Since ${startYear}`,
      Icon: BriefcaseIcon,
    },
    {
      value: "Full-stack",
      label: "Product engineering",
      meta: "React · Node.js",
      Icon: Square3Stack3DIcon,
    },
    {
      value: "APIs",
      label: "Systems & integrations",
      meta: "REST · AWS",
      Icon: PuzzlePieceIcon,
    },
    {
      value: "Pune",
      label: "Based in India",
      meta: "UTC +5:30",
      Icon: MapPinIcon,
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="site-divider border-b py-20 sm:py-24 lg:py-32"
    >
      <div className="section-shell">
        <div id="about-heading">
          <SectionHeader
            subtitle="02 / About"
            title={
              <>
                <span>
                  Engineering
                </span>{" "}
                <span className="heading-accent">With Purpose.</span>
              </>
            }
            description="From database queries to user interfaces, I focus on how the pieces work together to solve a product problem."
          />
        </div>

        <div className="grid gap-10 md:grid-cols-12 md:gap-8 lg:gap-14">
          {/* Main content */}
          <motion.div {...reveal()} className="md:col-span-7">
            <p className="max-w-3xl font-heading text-2xl font-medium leading-[1.25] tracking-[-0.03em] text-theme-heading sm:text-3xl lg:text-[2rem]">
              I work across the stack, with backend engineering at the center
              of my practice.
            </p>

            <div className="mt-7 grid gap-5 type-body site-text-muted lg:mt-8 lg:grid-cols-2 lg:gap-8">
              <p>
                Since 2021, my work has included Node.js services, MongoDB and
                PostgreSQL data layers, React interfaces, and AWS S3 storage.
                Working across these layers helps me connect application
                behavior to the code and data behind it.
              </p>

              <p>
                My performance work has included MongoDB indexing, aggregation
                pipelines, and query optimization. I also value reusable
                components, code reviews, and tests that help a team keep
                changing a product with confidence.
              </p>
            </div>

            {/* Focus areas */}
            <div className="mt-10 lg:mt-12">
              <p className="font-sans text-xs font-medium uppercase tracking-[0.12em] site-text-subtle">
                What I focus on
              </p>

              <ul className="grid mt-4 gap-x-8 sm:grid-cols-2">
                {focusAreas.map((focus, index) => (
                  <li
                    key={focus}
                    className="group flex items-center gap-3 border-t site-divider py-4 text-sm font-medium site-text-primary transition-colors hover:text-accent-dark "
                  >
                    <span className="font-sans text-xs text-theme-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span>{focus}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.dl
            {...reveal(0.1)}
            className="grid grid-cols-2 gap-4 md:col-span-5 lg:gap-5"
          >
            {stats.map((stat, index) => {
              const isPrimary = index === 0;
              const Icon = stat.Icon;

              return (
                <div
                  key={stat.label}
                  className={`group flex min-h-36 flex-col justify-between rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 sm:min-h-40 lg:min-h-44 lg:p-5 ${
                    isPrimary
                      ? "site-divider bg-surface site-text-primary shadow-sm hover:border-accent/30"
                      : "site-divider bg-surface site-text-primary shadow-sm hover:border-accent/40 hover:shadow-md "
                  }`}
                >
                  <div>
                    <Icon
                      aria-hidden="true"
                      className="h-5 w-5 text-theme-accent transition-transform duration-300 group-hover:scale-105"
                    />

                    <dt
                      className={`mt-3 font-sans text-xs font-medium uppercase tracking-[0.14em] sm:text-xs ${
                        isPrimary ? "site-text-muted" : "site-text-subtle"
                      }`}
                    >
                      {stat.label}
                    </dt>
                  </div>

                  <div>
                    <dd
                      className={`font-heading font-semibold tracking-[-0.04em] text-theme-secondary ${
                        stat.value.length > 8
                          ? "text-xl sm:text-2xl"
                          : "text-3xl sm:text-4xl"
                      }`}
                    >
                      {stat.value}
                    </dd>

                    <div
                      className={`mt-3 flex items-center gap-2 border-t pt-3 text-xs font-medium ${
                        isPrimary
                          ? "site-divider site-text-muted"
                          : "site-divider site-text-subtle"
                      }`}
                    >
                      <span
                        className={`h-1 w-1 rounded-full ${
                          isPrimary ? "bg-[var(--site-text-subtle)]" : "bg-[var(--site-text-subtle)]"
                        }`}
                      />

                      {stat.meta}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.dl>
        </div>
      </div>
    </section>
  );
};

export default About;
