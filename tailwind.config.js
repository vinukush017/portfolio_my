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
    },
  },
  plugins: [],
  darkMode: "class",
};
