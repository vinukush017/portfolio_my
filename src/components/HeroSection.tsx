import { motion } from "framer-motion";
import TextScrambler from "./TextScrambler";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";

const HeroSection = () => {
  return (
    <>
      <Navbar />
      <section
        id="home"
        className="snap-start h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-transparent text-gray-900 dark:text-white px-6 sm:px-8 md:px-12 relative "
      >
        <motion.div
          className="max-w-4xl mx-auto text-center pt-10 sm:pt-10 pb-20 sm:pb-20 px-2 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-3xl sm:text-5xl font-semibold mb-4 leading-snug break-words pt-10 md:pt-14 sm:pt-0">
            Heya 👋, I'm
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight text-indigo-600 dark:text-indigo-400 pb-5">
            Vinay Kushwah
          </h1>

          <TextScrambler
            texts={[
              "Full Stack Developer",
              "Backend Developer",
              "Software Engineer",
            ]}
            speed={50}
            interval={3000}
            className="text-xl sm:text-3xl md:text-4xl font-bold inline-block font-mono break-words"
          />

          <h2 className="text-lg sm:text-2xl font-medium text-indigo-600 dark:text-indigo-400 my-2">
            Pune, India
          </h2>

          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8 pt-0 md:pt-4">
            Empowering businesses with scalable web applications and clean,
            modern code. I bring 4+ years of real-world MERN stack experience —
            from intuitive frontends to optimized backends. Let’s build
            something impactful together.
          </p>

          <div className="flex justify-center gap-4 flex-wrap pt-4 pb-4">
            <a
              href="/Vinay_Kushwah_Resume_2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition"
            >
              View Resume
            </a>
            <a
              href="#contact"
              className="border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 px-6 py-3 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900 transition"
            >
              Contact Me
            </a>
            <SocialIcons />
          </div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-indigo-600 dark:text-indigo-400"
        >
          <svg
            className="w-6 sm:w-7 h-[60px]" // reduced height for mobile fit
            viewBox="0 0 24 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1"
              y="1"
              width="22"
              height="38"
              rx="11"
              stroke="currentColor"
              strokeWidth="2.5"
            />
            <motion.rect
              x="10"
              y="20"
              width="4"
              height="6"
              rx="2"
              fill="currentColor"
              animate={{
                y: [0, 10],
                opacity: [1, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                repeatDelay: 0.3,
              }}
            />
          </svg>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
