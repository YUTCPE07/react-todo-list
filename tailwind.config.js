/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ct-pink': {
          light: '#FFCCE1',
          DEFAULT: '#E195AB',
          dark: '#E195AB',
        },
      }
    },
  },
  plugins: [],
}

