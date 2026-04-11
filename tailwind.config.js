// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:        '#080808',
          surface:   '#101010',
          surface2:  '#161616',
          border:    '#1F1F1F',
          gold:      '#C9A96E',
          goldHov:   '#DEC08A',
          goldDark:  '#A8885A',
          silver:    '#D0D0D0',
          silverDim: '#9A9A9A',
          white:     '#FFFFFF',
          light:     '#F0EDE8',
          muted:     '#707070',
        },
      },
      fontFamily: {
        en: ['Poppins', 'sans-serif'],
        ar: ['Cairo', 'sans-serif'],
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
