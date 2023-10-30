/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        dark: "#0D1117",
        light: "#f8fafc",
        secondary_dark: "#374151",
        secondary_light: "#e5e7eb",
        bar_dark: "#111827",
        bar_light: "#F7F9FC",
        card_bg_dark: "#374151",
        card_bg_light: "#f8fafc",
      },
      textColor: {
        dark: "#f8fafc",
        light: "#111827",
      },
      fontSize: {
        "2xs": ".65rem",
        md: "1.3rem",
      },
      colors: {
        highlight: "#ffd800",
        light_dark: "#1118278f",
        light_light: "#f8fafc8f",
        brand: "#0085FF",
        brand_light: "#E6F2FF",
        brand_lighter: "#F0F7FF",
        brand_dark: "#0052CC",
        brand_darker: "#0747A6",
        brand_text: "#091E42",
        selected_frame: "#6bb7ffea",
        border_dark: "#30363d",
        border_light: "#d1d5db",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
