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
          Vinay Kushwah - Full Stack Developer | React & Node.js Expert | Portfolio
        </title>
        <meta
          name="description"
          content="Vinay Kushwah - Full Stack Developer specializing in React.js, Next.js, Node.js, and TypeScript. Explore my portfolio, projects, skills, and experience. Based in Pune, India. Available for opportunities."
        />
        <meta
          name="keywords"
          content="Vinay Kushwah, Full Stack Developer, React Developer, Next.js Developer, Node.js Developer, TypeScript Developer, Web Developer, Portfolio, Pune India, React.js, Next.js, Node.js, TypeScript, MongoDB, PostgreSQL, Tailwind CSS, Framer Motion"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="author" content="Vinay Kushwah" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://vinay-kushwah.vercel.app/" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Vinay Kushwah - Full Stack Developer | React & Node.js Expert" />
        <meta property="og:description" content="Full Stack Developer specializing in React.js, Next.js, Node.js, and TypeScript. Explore my portfolio, projects, and experience. Based in Pune, India." />
        <meta property="og:url" content="https://vinay-kushwah.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Vinay Kushwah Portfolio" />
        <meta property="og:image" content="https://vinay-kushwah.vercel.app/VINAY_LOGO.png" />
        <meta property="og:image:alt" content="Vinay Kushwah - Full Stack Developer Portfolio" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vinay Kushwah - Full Stack Developer | React & Node.js Expert" />
        <meta name="twitter:description" content="Full Stack Developer specializing in React.js, Next.js, Node.js, and TypeScript. Explore my portfolio, projects, and experience." />
        <meta name="twitter:image" content="https://vinay-kushwah.vercel.app/VINAY_LOGO.png" />
        <meta name="twitter:site" content="@Vinay__17" />
        <meta name="twitter:creator" content="@Vinay__17" />
        
        <script
          defer
          src="https://speed-insights.vercel.app/script.js"
          data-sdkn="@vercel/speed-insights"
          data-auto
        ></script>
      </Helmet>

      <JsonLd />

      <div className="relative min-h-screen min-h-[100dvh] w-full max-w-full overflow-x-hidden bg-white text-gray-900 dark:bg-black dark:text-white">
        {/* <SplashCursor /> */}
        <GalaxyBackground />
        <Navbar />

        <main className="relative z-10 scroll-smooth w-full max-w-full overflow-x-hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
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
