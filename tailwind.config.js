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
        title: ['Rock Salt', 'cursive'],
        accent: ['Bangers', 'cursive'],
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
      backgroundImage: {
        'musical-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Cpath d='M20,80 Q40,70 50,80 T80,80' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='2'%3E%3Canimate attributeName='d' dur='5s' repeatCount='indefinite' values='M20,80 Q40,70 50,80 T80,80;M20,80 Q40,90 50,80 T80,80;M20,80 Q40,70 50,80 T80,80'/%3E%3C/animate%3E%3C/path%3E%3Cpath d='M30,20 L30,80' stroke='rgba(255,255,255,0.1)' stroke-width='2'%3E%3Canimate attributeName='d' dur='3s' repeatCount='indefinite' values='M30,20 L30,80;M30,20 L30,75;M30,20 L30,80'/%3E%3C/animate%3E%3C/path%3E%3Ccircle cx='70' cy='50' r='15' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='2'%3E%3Canimate attributeName='r' dur='4s' repeatCount='indefinite' values='15;20;15'/%3E%3C/circle%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}