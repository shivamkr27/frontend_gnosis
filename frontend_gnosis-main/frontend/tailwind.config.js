/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'gnosis-bg': '#0F172A',
        'gnosis-card': '#1E293B',
        'gnosis-border': '#334155',
        'gnosis-purple': '#7C3AED',
        'gnosis-purple-light': '#A78BFA',
        'gnosis-gold': '#F59E0B',
        'gnosis-green': '#10B981',
        'gnosis-red': '#EF4444',
        'gnosis-text': '#F8FAFC',
        'gnosis-muted': '#94A3B8',
      }
    },
  },
  plugins: [],
}
