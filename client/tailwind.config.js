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
        'neutral-900': '#000000',
        'neutral-700': '#333333',
        'neutral-500': '#666666',
        'neutral-300': '#999999',
        'neutral-100': '#E0E0E0',
        'neutral-50': '#F5F5F5',
        'neutral-0': '#FFFFFF',
        'overlay-bg': 'rgba(0,0,0,0.4)',
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '40px',
      },
      fontSize: {
        xs: '12px',
        sm: '13px',
        base: '14px',
        md: '16px',
        lg: '20px',
        xl: '24px',
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        pill: '20px',
      },
      height: {
        header: '60px',
        input: '44px',
        button: '44px',
        'table-row': '56px',
      },
      width: {
        sidebar: '240px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0,0,0,0.1)',
        md: '0 4px 12px rgba(0,0,0,0.15)',
        lg: '0 8px 24px rgba(0,0,0,0.2)',
        focus: '0 0 0 3px rgba(102,38,113,0.15)',
        'button-primary': '0 2px 4px rgba(102,38,113,0.2)',
        'error': '0 0 0 3px rgba(239,68,68,0.1)',
      },
      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
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
      },
      animation: {
        'modal-enter': 'modalEnter 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'modal-exit': 'modalExit 150ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
