/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#e8dcc4",
          soft: "#c9b896",
          dim: "#8d7e62",
        },
        midnight: {
          DEFAULT: "#0a1628",
          deep: "#050b14",
          mist: "#142640",
          fog: "#5a7593",
        },
        brass: {
          DEFAULT: "#c89b3c",
          bright: "#e3b863",
          deep: "#8b6a1f",
          dark: "#3d2f10",
        },
        oxblood: "#7a2e22",
      },
      fontFamily: {
        display: ['"Fraunces"', "serif"],
        editorial: ['"Instrument Serif"', "serif"],
        body: ['"Geist"', "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        widest2: "0.32em",
      },
      animation: {
        "compass-spin": "compass 12s linear infinite",
        "drift-slow": "drift 8s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 3s linear infinite",
      },
      keyframes: {
        compass: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
