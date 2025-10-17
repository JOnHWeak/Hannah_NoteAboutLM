export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'hannah': ['Hannah Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      colors: {
        'hannah-blue': '#2f343bff',
        'hannah-gray': '#5f6368',
        'hannah-dark': '#1F1F1F',
        'hannah-input-bg': '#3f424bff',
        'sidebar-bg': '#242832',
        'create-new-btn-bg': '#2C303D',
      }
    },
  },
  plugins: [],
}
