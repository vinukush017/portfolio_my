import { type ISourceOptions } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useMemo, useState } from "react";

const GalaxyBackground = () => {
  const [init, setInit] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });

    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // Initial check
    checkDarkMode();

    // Observer for class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const options: ISourceOptions = useMemo(() => {
    return {
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: { enable: false, mode: "push" },
          onHover: {
            enable: true,
            mode: "grab", // Creates a scanning scanner-network on hover
          },
        },
        modes: {
          grab: {
            distance: 250,
            links: {
              opacity: isDarkMode ? 0.8 : 0.6,
              color: isDarkMode ? "#06b6d4" : "#3b82f6", // Cyberpunk cyan or tech blue
            },
          },
          push: {
            quantity: 2,
          },
        },
      },
      particles: {
        color: {
          value: isDarkMode
            ? ["#06b6d4", "#8b5cf6", "#3b82f6"] // Neon cyan, purple, blue
            : ["#3b82f6", "#6366f1", "#94a3b8"], // Strong blue, indigo, slate gray
        },
        links: {
          enable: false, // No permanent lines, only appear during 'grab' hover
        },
        move: {
          direction: "top-right", // Methodical data flow diagonally
          enable: true,
          outModes: {
            default: "out",
          },
          random: false, // Ensures they move in perfectly parallel tracks
          speed: 1.5,
          straight: true,
        },
        number: {
          density: {
            enable: true,
            width: 800,
          },
          value: 60,
        },
        opacity: {
          value: { min: 0.1, max: 0.6 },
        },
        shape: {
          type: ["triangle", "circle", "square"], // Mixed geometric tech aesthetic
        },
        size: {
          value: { min: 1, max: 4 },
        },
        rotate: {
          animation: {
            enable: true,
            speed: 4,
            sync: false,
          },
          direction: "random",
          value: { min: 0, max: 360 }, // Shapes slowly spin as they flow
        },
      },
      detectRetina: true,
    };
  }, [isDarkMode]);

  return (
    <div className="fixed inset-0 w-full h-full z-0 pointer-events-none overflow-hidden">
      {/* Dynamic atmospheric lighting base - Tech aesthetic */}
      <div
        className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] opacity-20 dark:opacity-10 top-[-20%] left-[-10%]"
        style={{
          background: isDarkMode
            ? "radial-gradient(circle, rgba(6,182,212,0.8) 0%, rgba(0,0,0,0) 70%)" // Cyan for dark mode
            : "radial-gradient(circle, rgba(59,130,246,0.8) 0%, rgba(0,0,0,0) 70%)", // Blue for light mode
        }}
      ></div>
      <div
        className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full blur-[120px] opacity-20 dark:opacity-[0.08] bottom-[-20%] right-[-10%]"
        style={{
          background: isDarkMode
            ? "radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(0,0,0,0) 70%)" // Purple
            : "radial-gradient(circle, rgba(99,102,241,0.8) 0%, rgba(0,0,0,0) 70%)", // Indigo
        }}
      ></div>

      {init && (
        <Particles
          id="tsparticles"
          options={options}
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
};

export default GalaxyBackground;
