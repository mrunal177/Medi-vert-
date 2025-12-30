/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 1.5s ease-out forwards",
        bounce: "bounce 1s infinite",
        "pulse-slow":
          "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate",
        "float-slow": "float 8s ease-in-out infinite alternate", // added
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        float: {
          // added
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
