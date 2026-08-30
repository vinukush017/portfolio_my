/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          hover: "rgb(var(--accent-hover) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
        },

        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          elevated: "rgb(var(--surface-elevated) / <alpha-value>)",
        },
      },

      backgroundImage: {
        "text-gradient":
          "linear-gradient(to right, rgb(var(--accent)), rgb(var(--accent-hover)))",
      },

      animation: {
        "spin-slow": "spin 8s linear infinite",
      },

      boxShadow: {
        glow: "0 0 10px rgb(var(--accent) / 0.35), 0 0 24px rgb(var(--accent) / 0.18)",
      },

      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },

  plugins: [],
};
