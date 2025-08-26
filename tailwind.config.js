/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scrollBehavior: ["responsive"],
      colors: {
        primary: "#4F46E5", // Indigo-600
        accent: "#A855F7", // Purple-500
        bgLight: "#EEF2FF", // Indigo-50
        bgDark: "#1E293B", // Slate-800
      },
      textColor: {
        gradient: "transparent",
      },
      backgroundImage: {
        "text-gradient": "linear-gradient(to right, #6366f1, #9333ea, #ec4899)",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
      },
      boxShadow: {
        glow: "0 0 10px rgba(99,102,241,0.8), 0 0 20px rgba(99,102,241,0.4)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"], // body text
        heading: ["Space Grotesk", "ui-sans-serif"],   // headings
        mono: ["JetBrains Mono", "ui-monospace"],      // code
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
