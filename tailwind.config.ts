import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fifa: {
          primary: "var(--fifa-primary)",
          secondary: "var(--fifa-secondary)",
          accent: "var(--fifa-accent)",
          dark: "var(--fifa-dark)",
          light: "var(--fifa-light)",
          card: "var(--fifa-card)",
          border: "var(--fifa-border)",
          muted: "var(--fifa-muted)",
          input: "var(--fifa-input)",
        },
      },
      backgroundImage: {
        "fifa-gradient":
          "linear-gradient(135deg, var(--fifa-primary) 0%, var(--fifa-accent) 100%)",
      },
    },
  },
  plugins: [],
};

module.exports = config;
