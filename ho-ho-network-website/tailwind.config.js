/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        HUD: {
          background: 'rgba( 0, 0, 0, <alpha-value> )'
        }
      }
    },
  },
  plugins: [],
}

