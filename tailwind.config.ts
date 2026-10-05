import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#002F34",
        inkLight: "#0E4B51",
        sun: "#FFCE32",
        sunDark: "#E6B800",
        tealx: "#23E5DB",
        paper: "#FAF6EF",
        cream: "#FFF8E7",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "Fraunces", "serif"],
        body: ["var(--font-plus-jakarta)", "Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        card: "0 8px 30px -8px rgba(0,47,52,0.18)",
        pop: "4px 4px 0px #002F34",
        popSm: "3px 3px 0px #002F34",
        popLg: "6px 6px 0px #002F34",
      },
    },
  },
  plugins: [],
};

export default config;
