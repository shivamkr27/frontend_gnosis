/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gnosis-bg': '#0c1320', // New dark blue background (from images)
        'gnosis-card': '#19202d', // New lighter blue card
        'gnosis-border': '#2e3543', // New outline color
        'gnosis-primary': '#f4a261', // The orange/beige accent
        'gnosis-primary-light': '#ffc499',
        'gnosis-secondary': '#30a193', // The teal accent
        'gnosis-secondary-light': '#6fd8c8',
        'gnosis-text': '#dce2f5', // Main text
        'gnosis-muted': '#a08d80', // Muted text
        'gnosis-gold': '#d4b058',
        'gnosis-error': '#ffb4ab',
        'gnosis-error-container': '#93000a',
        'gnosis-green': '#30a193', // using secondary for success/green
        'gnosis-red': '#ffb4ab'
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'serif': ['Noto Serif', 'serif'],
      }
    },
  },
  plugins: [],
}