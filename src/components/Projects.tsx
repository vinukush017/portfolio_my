import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const projects = [
  {
    title: "Car Daddy CRM",
    description:
      "Built a scalable car registration and customer management system with secure JWT authentication, AWS S3 file storage, and real-time WhatsApp/email integrations.",
    link: "https://www.cardaddys.co.uk/",
    image: "/projects/fact-gully.png", // Make sure this path is valid
    stack: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "DropChat AI",
    description:
      "Developed an AI chatbot builder with OpenAI APIs, document training, and embeddable bots. Boosted engagement by 40%.",
    link: "https://app.dropchat.co/",
    image: "/projects/fact-gully.png",
    stack: ["OpenAI", "React", "MongoDB"],
  },
  {
    title: "FactGully",
    description:
      "Launched a fact-sharing platform with daily themes in science, history, and myths. Built in React and Vercel.",
    link: "https://fact-gully.vercel.app",
    image: "/projects/fact-gully.png",
    stack: ["React", "Tailwind", "Vercel"],
  },
  {
    title: "Car Daddy CRM",
    description:
      "Built a scalable car registration and customer management system with secure JWT authentication, AWS S3 file storage, and real-time WhatsApp/email integrations.",
    link: "https://www.cardaddys.co.uk/",
    image: "/projects/fact-gully.png", // Make sure this path is valid
    stack: ["React", "Node.js", "MongoDB"],
  },
  {
    title: "DropChat AI",
    description:
      "Developed an AI chatbot builder with OpenAI APIs, document training, and embeddable bots. Boosted engagement by 40%.",
    link: "https://app.dropchat.co/",
    image: "/projects/fact-gully.png",
    stack: ["OpenAI", "React", "MongoDB"],
  },
  {
    title: "FactGully",
    description:
      "Launched a fact-sharing platform with daily themes in science, history, and myths. Built in React and Vercel.",
    link: "https://fact-gully.vercel.app",
    image: "/projects/fact-gully.png",
    stack: ["React", "Tailwind", "Vercel"],
  },
];

const Projects = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState(0);
  const rotationAmt = 360 / projects.length;
  const isMobile = window.innerWidth < 640;
  const radius = isMobile
    ? 250 / (2 * Math.sin(Math.PI / projects.length))
    : 400 / (2 * Math.sin(Math.PI / projects.length));
  const distToEdge = Math.round(Math.sqrt(radius ** 2 - 200 ** 2) + 30);

  const updateCarousel = (index: number) => {
    const wrapper = wrapperRef.current;
    const navDots = navRef.current?.children;

    if (wrapper) {
      gsap.to(wrapper, {
        rotationY: -index * rotationAmt,
        duration: 1,
        ease: "power2.inOut",
      });

      Array.from(wrapper.children).forEach((child, i) => {
        child.classList.toggle("focused", i === index);
        if (navDots && navDots[i]) {
          navDots[i].classList.toggle("focused", i === index);
        }
      });
    }
  };

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.style.setProperty("--distance", `${distToEdge}px`);
    }
    updateCarousel(focused);

    const interval = setInterval(() => {
      setFocused((prev) => {
        const next = (prev + 1) % projects.length;
        updateCarousel(next);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [focused]);

  return (
    <section
      id="projects"
      className="py-20 px-4 bg-white dark:bg-gray-950 text-center relative"
    >
      <h2 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">
        Projects
      </h2>

      <div className="project-data-wrapper relative flex justify-center items-center perspective-[100em] min-h-[450px] overflow-x-hidden px-2">
        <div
          className="project-data absolute left-1/2 h-full flex items-center"
          ref={wrapperRef}
          style={{
            transformStyle: "preserve-3d",
            transform: "translateZ(calc(var(--distance) * -1))",
          }}
        >
          {projects.map((proj, i) => (
            <div
              key={i}
              className="project-card bg-white dark:bg-gray-900 rounded-xl shadow-md p-3 sm:p-4 w-[250px] sm:w-[320px] h-[400px] sm:h-[460px] max-w-xs transition-all duration-300 ease-in-out"
              style={{
                transform: `translateX(-50%) rotateY(${
                  i * (360 / projects.length)
                }deg) translateZ(${distToEdge}px)`,
              }}
            >
              <img
                src={proj.image}
                alt={proj.title}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
                {proj.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 max-h-24 overflow-y-auto">
                {proj.description}
              </p>

              <div className="flex flex-wrap gap-2 justify-center mb-3">
                {proj.stack.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-white px-2 py-1 text-xs rounded stack-badge"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex justify-center gap-4">
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm font-medium flex items-center gap-1 hover:bg-green-600"
                >
                  <i className="fas fa-code"></i> View Demo
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <div
          className="arrow-left absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl text-green-500 cursor-pointer"
          onClick={() =>
            setFocused((prev) => (prev - 1 + projects.length) % projects.length)
          }
        >
          ❮
        </div>
        <div
          className="arrow-right absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 text-2xl sm:text-3xl text-green-500 cursor-pointer"
          onClick={() => setFocused((prev) => (prev + 1) % projects.length)}
        >
          ❯
        </div>
      </div>
      <div ref={navRef} className="navigation mt-6 sm:mt-10 flex justify-center gap-2 sm:gap-3">
        {projects.map((_, i) => (
          <div
            key={i}
            className="nav-dot w-3 h-3 bg-white border border-gray-400 rounded-full cursor-pointer transition-all duration-300"
            onClick={() => setFocused(i)}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
