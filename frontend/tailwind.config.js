/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#dc2626',
        brand2: '#ea580c',
        brand3: '#f97316',
        accent: '#f59e0b',
        accent2: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg,#dc2626 0%,#ea580c 50%,#f97316 100%)',
        'accent-gradient': 'linear-gradient(135deg,#f59e0b 0%,#ef4444 100%)',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(220,38,38,0.10)',
        glow: '0 6px 24px rgba(220,38,38,0.25)',
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
