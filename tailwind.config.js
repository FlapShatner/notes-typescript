/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#ffffff",
        primary: {
          100: "#c4dcf3",
          200: "#9cc5eb",
          300: "#71abe2",
          400: "#4490d9",
          500: "#20609d",
          600: "#1e5b95",
          700: "#194a79",
          800: "#0d2740",
          900: "#071523",
        },
      },
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["Lora", "serif"],
      mono: ["Incosolata", "monospace"],
      mont:[ "Montserrat", "sans-serif"]
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
