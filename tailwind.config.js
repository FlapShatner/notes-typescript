/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      serif: ['Lora', 'serif'],
      mono: ['Incosolata', 'monospace'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
