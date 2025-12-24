import HeroSection from "./components/HeroSection";
import AboutSection from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Helmet } from "react-helmet";
import GalaxyBackground from "./components/DotBackground";
import ScrollToTop from "./components/ScrollToTop";
import JsonLd from "./components/seo/JsonLd";
import SplashCursor from "./components/SplashCursor";

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
        {/* <SplashCursor /> */}
        <GalaxyBackground />
        <Navbar />

        <main className="relative z-10 scroll-smooth">
          {/* Hero Section */}
          <section id="home" className="scroll-mt-28 sm:scroll-mt-32">
            <HeroSection />
          </section>

          {/* Static sections (no animation) */}
          <section id="projects" className="scroll-mt-28 sm:scroll-mt-32 py-6">
            <Projects />
          </section>

          <section id="about" className="scroll-mt-28 sm:scroll-mt-32 py-6">
            <AboutSection />
          </section>

          <section id="skills" className="scroll-mt-28 sm:scroll-mt-32 py-6">
            <Skills />
          </section>

          <section id="experience" className="scroll-mt-28 sm:scroll-mt-32 py-6">
            <Experience />
          </section>

          <section id="contact" className="scroll-mt-28 sm:scroll-mt-32 py-6">
            <Contact />
          </section>

          <Footer />
          <ScrollToTop />
        </main>
      </div>
    </>
  );
}

export default App;
