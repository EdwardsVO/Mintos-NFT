module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './context/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        primary: {
          50: '#4C5564',
          100: '#787878',
          200: '#5E5E5E',
          300: '#454545',
          400: '#2B2B2B',
          500: '#121212',
        },
        secondary: {
          100: '#DCFEEA',
          200: '#AAFDCD',
          300: '#79FCAF',
          400: '#47FA92',
          500: '#15F974',
        },
        test: {
          50: '#232f35',
        },
        figma: {
          100: '#473EA8',
          200: '#F9F9F9',
          300: '#F2F2F2',
          400: '#333333',
          500: '#EFEFEF',
          600: '#828282',
          700: '#FFFCFC',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
