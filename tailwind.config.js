/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        blue: '#0EA5E9',
        blue80: '#E2E8F0',
        blue60: '#F1F5F9',
        primColor: '#0F172A',
        grey: '#475569',
        grey80: '#94A3B8',
        grey60: '#E2E8F0',
        danger: '#F87171',
      },
      padding: {
        primary: '40px',
      },
      boxShadow: {
        input: ' 0px 0px 0px 2px #BAE6FD',
        switcher: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1)',
      },
      screens: {
        sm: '480px',
        md: '768px',
        lg: '1028px',
        xl: '1440px',
      },
    },
  },
  plugins: [],
};
