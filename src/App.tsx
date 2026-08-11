import { lazy, Suspense, useEffect, useState } from "react";
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

const GalaxyBackground = lazy(() => import("./components/DotBackground"));

const DeferredBackground = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timeoutId = window.setTimeout(() => setShow(true), 500);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return show ? (
    <Suspense fallback={null}>
      <GalaxyBackground />
    </Suspense>
  ) : null;
};

function App() {
  return (
    <>
      <div className="relative min-h-screen min-h-[100dvh] w-full max-w-full overflow-x-hidden bg-white text-gray-900 dark:bg-black dark:text-white">
        <DeferredBackground />
        <Navbar />

        <main id="main" tabIndex={-1} className="relative z-10 scroll-smooth w-full max-w-full overflow-x-hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {/* Hero Section */}
          <div id="home" className="scroll-mt-28 sm:scroll-mt-32">
            <HeroSection />
          </div>

          {/* Static sections (no animation) */}
          <div id="projects" className="scroll-mt-28 sm:scroll-mt-32 py-6">
            <Projects />
          </div>

          <div id="about" className="scroll-mt-28 sm:scroll-mt-32 py-6">
            <AboutSection />
          </div>

          <div id="skills" className="scroll-mt-28 sm:scroll-mt-32 py-6">
            <Skills />
          </div>

          <div id="experience" className="scroll-mt-28 sm:scroll-mt-32 py-6">
            <Experience />
          </div>

          <div id="contact" className="scroll-mt-28 sm:scroll-mt-32 py-6">
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
