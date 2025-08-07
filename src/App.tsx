import HeroSection from "./components/HeroSection";
import AboutSection from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Helmet } from "react-helmet";
import GalaxyBackground from "./components/DotBackground";
import ScrollToTop from "./components/ScrollToTop";
import { motion } from "framer-motion";
import { fadeInUp } from "./components/motionVariants";
import { AnimatePresence } from "framer-motion";
import JsonLd from "./components/seo/JsonLd";

function App() {
  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>
          Vinay Kushwah - Full Stack Developer | Portfolio & Projects
        </title>
        <meta
          name="description"
          content="Official portfolio of Vinay Kushwah, Full Stack Developer specializing in React.js and Node.js. Explore projects, skills, experience, and contact info."
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Vinay Kushwah" />
        <link rel="icon" href="/favicon.ico" />
        <script
          defer
          src="https://speed-insights.vercel.app/script.js"
          data-sdkn="@vercel/speed-insights"
          data-auto
        ></script>
      </Helmet>
      <JsonLd />

      <div className="relative min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white">
        <GalaxyBackground />

        <main className="relative z-10 scroll-smooth snap-y snap-mandatory">
          {/* Hero Section (no scroll animation for initial load) */}
          <section id="home" className="snap-start">
            <HeroSection />
          </section>

          {/* Animate each section on scroll */}
          <AnimatePresence>
            <motion.section
              id="projects"
              className="snap-start "
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Projects />
            </motion.section>

            <motion.section
              id="about"
              className="snap-start "
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <AboutSection />
            </motion.section>

            <motion.section
              id="skills"
              className="snap-start "
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Skills />
            </motion.section>

            <motion.section
              id="experience"
              className="snap-start "
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Experience />
            </motion.section>

            <motion.section
              id="contact"
              className="snap-start "
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <Contact />
            </motion.section>

            <Footer />
            <ScrollToTop />
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}

export default App;
