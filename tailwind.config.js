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
          dark: '#1A202C', // dark gray for main background
          card: '#2D3748', // slightly lighter gray for card backgrounds
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A0AEC0',
          accent: '#FEB2B2', // light red for accents
        },
      },
      gradientColorStops: {
        'red-800': '#9B2C2C',
        'red-600': '#E53E3E',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}