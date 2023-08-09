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
        dark: "#1f2937",
        light: "#f8fafc",
      },
      textColor: {
        dark: "#f8fafc",
        light: "#1f2937",
      },
      fontSize: {
        "2xs": ".65rem",
        "md" : "1.3rem"
      }
    },
  },
  plugins: [],
};
