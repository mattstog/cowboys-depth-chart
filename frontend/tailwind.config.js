/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cowboys: {
          navy: '#041E42',
          silver: '#869397',
          blue: '#0D2648',
          white: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}
