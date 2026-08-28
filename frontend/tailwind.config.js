/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#1a284d',
        brand2: '#005aab',
        brand3: '#0d6efd',
        accent: '#005aab',
        accent2: '#f97316',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg,#1a284d 0%,#005aab 100%)',
        'accent-gradient': 'linear-gradient(135deg,#005aab 0%,#0d6efd 100%)',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(26,40,77,0.10)',
        glow: '0 6px 24px rgba(26,40,77,0.25)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out',
      },
    },
  },
  plugins: [],
}
