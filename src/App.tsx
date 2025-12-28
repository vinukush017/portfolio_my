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

      <div className="relative min-h-screen min-h-[100dvh] w-full max-w-full overflow-x-hidden bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/20 text-gray-900 dark:from-gray-950 dark:via-indigo-950/30 dark:to-purple-950/30 dark:text-white">
        {/* Premium Mobile-Optimized Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Base Gradient Mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/40 dark:from-indigo-950/50 dark:via-gray-950 dark:to-purple-950/50" />
          
          {/* Responsive Gradient Orbs - Mobile Optimized */}
          <div className="absolute top-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-indigo-400/20 dark:bg-indigo-500/15 rounded-full blur-3xl animate-pulse-slow" 
               style={{ transform: 'translate(-30%, -30%)' }} />
          <div className="absolute top-1/3 right-0 w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-purple-400/20 dark:bg-purple-500/15 rounded-full blur-3xl animate-pulse-slow" 
               style={{ transform: 'translate(30%, -20%)', animationDelay: '1s' }} />
          <div className="absolute bottom-0 left-1/2 w-60 h-60 sm:w-76 sm:h-76 md:w-88 md:h-88 bg-pink-400/20 dark:bg-pink-500/15 rounded-full blur-3xl animate-pulse-slow" 
               style={{ transform: 'translate(-50%, 30%)', animationDelay: '2s' }} />
          
          {/* Additional Subtle Orbs for Richness */}
          <div className="absolute top-1/2 left-1/4 w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 bg-blue-400/15 dark:bg-blue-500/10 rounded-full blur-2xl animate-pulse-slow" 
               style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-1/4 right-1/3 w-44 h-44 sm:w-56 sm:h-56 md:w-68 md:h-68 bg-cyan-400/15 dark:bg-cyan-500/10 rounded-full blur-2xl animate-pulse-slow" 
               style={{ animationDelay: '1.5s' }} />
          
          {/* Premium Grid Pattern Overlay - Subtle (Hidden on mobile for performance) */}
          <div className="hidden md:block absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" 
               style={{
                 backgroundImage: 'radial-gradient(circle, rgb(99, 102, 241) 1px, transparent 1px)',
                 backgroundSize: '40px 40px',
               }} />
          
          {/* Premium Mesh Pattern - Desktop Only */}
          <div className="hidden lg:block absolute inset-0 premium-mesh opacity-30 dark:opacity-20" />
          
          {/* Shimmer Effect - Desktop Only */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" 
               style={{ backgroundSize: '200% 100%' }} />
        </div>
        
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
