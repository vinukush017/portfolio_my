import { motion, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const focusAreas = [
  "Backend systems & APIs",
  "Scalable product architecture",
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
    },
    {
      value: "Full-stack",
      label: "Product engineering",
    },
    {
      value: "APIs",
      label: "Systems & integrations",
    },
    {
      value: "Pune",
      label: "Based in India",
    },
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="site-divider border-b py-16 sm:py-20 lg:py-28"
    >
      <div className="section-shell">
        <div id="about-heading">
          <SectionHeader
            subtitle="02 / About"
            title="Engineering with purpose."
            description="I combine product thinking with dependable engineering to build software that is useful, scalable, and maintainable."
          />
        </div>

        <div className="grid gap-10 md:grid-cols-12 md:gap-8 lg:gap-14">
          {/* Main content */}
          <motion.div {...reveal()} className="md:col-span-7">
            <p className="max-w-3xl font-heading text-2xl font-medium leading-[1.25] tracking-[-0.03em] text-gray-950 dark:text-white sm:text-3xl lg:text-[2rem]">
              I&apos;m Vinay, a software engineer focused on turning complex
              requirements into reliable systems and practical digital products.
            </p>

            <div className="mt-7 grid gap-5 text-base leading-7 text-gray-600 dark:text-gray-400 lg:mt-8 lg:grid-cols-2 lg:gap-8">
              <p>
                My work spans backend services, REST APIs, databases, React
                interfaces, cloud infrastructure, and third-party integrations.
                I enjoy working across the stack, with a strong focus on
                building dependable backend systems.
              </p>

              <p>
                I care about clear architecture, maintainable code, thoughtful
                collaboration, and solving the actual product problem rather
                than simply shipping features.
              </p>
            </div>

            {/* Focus areas */}
            <div className="mt-10 lg:mt-12">
              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-gray-400 dark:text-gray-500">
                What I focus on
              </p>

              <ul className="grid mt-4 gap-x-8 sm:grid-cols-2">
                {focusAreas.map((focus, index) => (
                  <li
                    key={focus}
                    className="group flex items-center gap-3 border-t border-gray-300 py-4 text-sm font-medium text-gray-800 transition-colors hover:text-accent-dark dark:border-white/10 dark:text-gray-300 dark:hover:text-accent-light"
                  >
                    <span className="font-mono text-[11px] text-accent-dark dark:text-accent-light">
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
            className="grid grid-cols-2 gap-3 md:col-span-5 lg:gap-4"
          >
            {stats.map((stat, index) => {
              const isPrimary = index === 0;

              return (
                <div
                  key={stat.label}
                  className={`flex min-h-32 flex-col justify-between rounded-2xl border p-4 transition-transform duration-300 hover:-translate-y-1 sm:min-h-36 lg:min-h-40 lg:p-5 ${
                    isPrimary
                      ? "border-accent bg-gradient-to-br from-accent to-accent-dark text-white shadow-lg shadow-accent/15"
                      : "border-gray-300 bg-white text-gray-950 dark:border-white/10 dark:bg-[#111419] dark:text-white"
                  }`}
                >
                  <dt
                    className={`text-[10px] font-medium uppercase tracking-[0.14em] sm:text-xs ${
                      isPrimary
                        ? "text-white/75"
                        : "text-gray-500"
                    }`}
                  >
                    {stat.label}
                  </dt>

                  <dd
                    className={`font-heading font-semibold tracking-[-0.04em] ${
                      stat.value.length > 8
                        ? "text-xl sm:text-2xl"
                        : "text-3xl sm:text-4xl"
                    }`}
                  >
                    {stat.value}
                  </dd>
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
