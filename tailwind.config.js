/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "rgb(var(--primary-rgb) / <alpha-value>)",
          light: "rgb(var(--primary-light-rgb) / <alpha-value>)",
          dark: "rgb(var(--primary-dark-rgb) / <alpha-value>)",
        },

        accent: {
          DEFAULT: "rgb(var(--accent-rgb) / <alpha-value>)",
          light: "rgb(var(--accent-light-rgb) / <alpha-value>)",
          dark: "rgb(var(--accent-dark-rgb) / <alpha-value>)",
        },

        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          elevated: "rgb(var(--surface-elevated) / <alpha-value>)",
        },
      },

      backgroundImage: {
        "text-gradient":
          "linear-gradient(to right, var(--accent), var(--accent-dark))",
      },

      animation: {
        "spin-slow": "spin 8s linear infinite",
      },

      boxShadow: {
        glow: "0 0 10px rgb(var(--accent-rgb) / 0.35), 0 0 24px rgb(var(--accent-rgb) / 0.18)",
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
