/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        primary: '#E50914', // Netflix Red
        secondary: '#FFAB00', // Gold/Yellow
        surface: '#1c1c1c',
        text: '#ffffff',
        muted: '#a3a3a3'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
