/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#080b14',
          card: 'rgba(16, 22, 38, 0.75)',
        }
      }
    },
  },
  plugins: [],
}
