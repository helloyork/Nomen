/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'main': '#14B8A6',
        'main-text': '#0F766E',
        'secondary': '#0D9488',
      },
    }
  },
  plugins: []
};