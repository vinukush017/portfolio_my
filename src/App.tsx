import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Helmet } from "react-helmet";

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

      <div className="bg-gradient-to-br from-white via-indigo-50 to-indigo-100 text-gray-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:text-white min-h-screen">
        <Navbar />
        <main className="scroll-smooth snap-y snap-mandatory">
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
        </main>
      </div>
    </>
  );
}

export default App;
