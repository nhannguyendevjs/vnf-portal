const defaultTheme = require('tailwindcss/defaultTheme');
const tailwindMerge = require('tailwind-merge');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      height: {
        screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
      },
    },
  },
  plugins: [tailwindMerge],
  darkMode: 'class',
};
