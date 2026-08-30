import HeroSection from "./components/HeroSection";
import AboutSection from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Blogs from "./components/Blogs";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <>
      <div className="relative min-h-[100dvh] w-full max-w-full overflow-x-hidden bg-[#ffffff] text-gray-950 dark:bg-[#0b0d10] dark:text-white">
        <Navbar />

        <main
          id="main"
          tabIndex={-1}
          className="relative z-10 w-full max-w-full overflow-x-hidden"
        >
          <HeroSection />

          <Projects />

          <AboutSection />

          <Skills />

          <Experience />

          <Blogs />

          <Contact />
        </main>

        <Footer />

        <ScrollToTop />
      </div>

      <SpeedInsights />
    </>
  );
}

export default App;
