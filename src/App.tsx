import HeroSection from "./components/HeroSection";
import AboutSection from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <>
      <div className="relative min-h-screen min-h-[100dvh] w-full max-w-full overflow-x-hidden bg-[#f8f8f4] text-gray-950 dark:bg-[#0b0d10] dark:text-white">
        <Navbar />

        <main id="main" tabIndex={-1} className="relative z-10 scroll-smooth w-full max-w-full overflow-x-hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {/* Hero Section */}
          <div id="home" className="scroll-mt-24">
            <HeroSection />
          </div>

          {/* Static sections (no animation) */}
          <div id="projects" className="scroll-mt-24">
            <Projects />
          </div>

          <div id="about" className="scroll-mt-24">
            <AboutSection />
          </div>

          <div id="skills" className="scroll-mt-24">
            <Skills />
          </div>

          <div id="experience" className="scroll-mt-24">
            <Experience />
          </div>

          <div id="contact" className="scroll-mt-24">
            <Contact />
          </div>

          <Footer />
          <ScrollToTop />
        </main>
      </div>
      <SpeedInsights />
    </>
  );
}

export default App;
