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
        premium: {
          indigo: "#6366f1",
          purple: "#9333ea",
          pink: "#ec4899",
        },
      },
      textColor: {
        gradient: "transparent",
      },
      backgroundImage: {
        "text-gradient": "linear-gradient(135deg, #6366f1 0%, #9333ea 50%, #ec4899 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "premium-gradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "premium-gradient-2": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "premium-gradient-3": "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "gradient-shift": "gradient-shift 5s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 3s infinite",
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      boxShadow: {
        glow: "0 0 10px rgba(99,102,241,0.8), 0 0 20px rgba(99,102,241,0.4)",
        "glow-lg": "0 0 20px rgba(99,102,241,0.4), 0 0 40px rgba(99,102,241,0.3), 0 0 60px rgba(99,102,241,0.2)",
        "premium": "0 20px 60px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(99, 102, 241, 0.1)",
        "premium-lg": "0 25px 80px rgba(99, 102, 241, 0.4), 0 0 0 1px rgba(99, 102, 241, 0.15)",
        "inner-glow": "inset 0 0 20px rgba(99, 102, 241, 0.2)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"], // body text
        heading: ["Space Grotesk", "ui-sans-serif"],   // headings
        mono: ["JetBrains Mono", "ui-monospace"],      // code
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
