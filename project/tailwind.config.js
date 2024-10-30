/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': '"Inter", sans-serif',
        'serif': '"Old Standard TT", serif',
        'mono': '"JetBrains Mono", monospace',
      }
    },
  },
  plugins: [],
}