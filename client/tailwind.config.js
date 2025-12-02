/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#662671',
        accent: '#F4E4AF',
        success: '#22C55E',
        error: '#EF4444',
        'neutral-black': '#000000',
        'neutral-darkest': '#333333',
        'neutral-dark': '#666666',
        'neutral-medium': '#999999',
        'neutral-light': '#E0E0E0',
        'neutral-lighter': '#F5F5F5',
        'neutral-white': '#FFFFFF',
        'app-background': '#F5F5F5',
        'overlay-bg': 'rgba(0,0,0,0.4)',
      },
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '40px',
        '2xl': '48px',
      },
      fontSize: {
        'caption': '12px',
        'body': '14px',
        'subtitle': '16px',
        'title': '20px',
        'heading': '24px',
      },
      borderRadius: {
        'standard': '6px',
        'pill': '20px',
      },
      height: {
        'input': '44px',
        'header': '60px',
        'table-row': '56px',
      },
      width: {
        'sidebar': '240px',
      },
      minHeight: {
        'content': 'calc(100vh - 60px)',
      },
      padding: {
        'modal': '32px',
      },
      transitionTimingFunction: {
        'instant': '100ms',
        'quick': '150ms',
        'base': '200ms',
        'slow': '300ms',
        'slower': '400ms',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      keyframes: {
        modalEnter: {
          'from': { opacity: 0, transform: 'scale(0.95) translateY(-10px)' },
          'to': { opacity: 1, transform: 'scale(1) translateY(0)' },
        },
        modalExit: {
          'from': { opacity: 1, transform: 'scale(1)' },
          'to': { opacity: 0, transform: 'scale(0.95)' },
        },
        dropdownSlide: {
          'from': { opacity: 0, transform: 'translateY(-8px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        spin: {
          'to': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'modal-enter': 'modalEnter 200ms ease-out',
        'modal-exit': 'modalExit 150ms ease-in',
        'dropdown-slide': 'dropdownSlide 200ms ease-out',
        'spin': 'spin 800ms linear infinite',
      },
    },
  },
  plugins: [],
}