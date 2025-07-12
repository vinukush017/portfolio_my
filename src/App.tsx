import Navbar from "./components/Navbar";
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

function App() {
  return (
    <>
      <Helmet>
        <title>Vinay - Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Vinay Kushwah — Developer, Creator, and Problem Solver."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Vinay Kushwah" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <div className="relative min-h-screen bg-white text-gray-900 dark:bg-black dark:text-white">
        <GalaxyBackground />
        <main className="relative z-10 scroll-smooth snap-y snap-mandatory">
          <section id="home" className="snap-start">
            <HeroSection />
          </section>
          <section id="about" className="snap-start">
            <AboutSection />
          </section>
          <section id="projects" className="snap-start">
            <Projects />
          </section>
          <section id="skills" className="snap-start">
            <Skills />
          </section>
          <section id="experience" className="snap-start">
            <Experience />
          </section>
          <section id="contact" className="snap-start">
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
