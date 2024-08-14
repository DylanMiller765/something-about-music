const { color } = require('framer-motion');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        title: ['Bangers', 'cursive'],
      },
      colors: {
        primary: {
          DEFAULT: '#FF0000',
          dark: '#CC0000',
        },
        secondary: '#000000',
        background: {
          dark: '#161a1d', // black for main background
          card: '#161a1d', // very dark blue for card backgrounds
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A0AEC0',
          accent: '#FF0000', // red for accents
        },
        red: {
          500: '#FF0000', // Bright red for borders and accents
          700: '#b91c1c', // Darker red for hover states
        },
        yellow: {
          500: '#EAB308', // Yellow for ratings
        },
        gray: {
          300: '#D1D5DB', // Light gray for some text
          400: '#9CA3AF', // Medium gray for secondary text
          800: '#1F2937', // Dark gray for genre tags
          900: '#161a1d', // Very dark gray, almost black, for card backgrounds
        },
      },
      gradientColorStops: {
        'red-900': '#7f1d1d',
        'red-700': '#b91c1c',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}