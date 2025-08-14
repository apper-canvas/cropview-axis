/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest': '#2D5016',
        'fresh-green': '#7CB342',
        'harvest-orange': '#F57C00',
        'success-green': '#4CAF50',
        'warning-orange': '#FF9800',
        'error-red': '#D32F2F',
        'info-blue': '#1976D2'
      },
      fontFamily: {
        'display': ['DM Sans', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}