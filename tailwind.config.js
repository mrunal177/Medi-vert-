/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 1s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "card-appear": "cardAppear 0.6s ease-out forwards",
        "bounce-slow": "bounceSlow 2s ease-in-out infinite",
        "float-subtle": "floatSubtle 20s ease-in-out infinite alternate",
        pulse: "pulse 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        cardAppear: {
          "0%": { opacity: 0, transform: "translateY(10px) scale(0.98)" },
          "100%": { opacity: 1, transform: "translateY(0) scale(1)" },
        },
        bounceSlow: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        floatSubtle: {
          "0%": { transform: "translate(0px, 0px)" },
          "100%": { transform: "translate(30px, 30px)" },
        },
      },
    },
  },
  plugins: [],
};
