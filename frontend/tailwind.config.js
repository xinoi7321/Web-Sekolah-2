/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#4f46e5',
        brand2: '#7c3aed',
        brand3: '#0ea5e9',
        accent: '#f59e0b',
        accent2: '#10b981',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#0ea5e9 100%)',
        'accent-gradient': 'linear-gradient(135deg,#f59e0b 0%,#ef4444 100%)',
      },
      boxShadow: {
        soft: '0 10px 30px rgba(79,70,229,0.10)',
        glow: '0 6px 24px rgba(79,70,229,0.25)',
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
