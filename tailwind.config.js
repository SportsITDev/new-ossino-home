/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'game-detail': 'url("/backgrounds/gameDetailBackground.png")',
        'blue-gradient': 'var(--gradient-blue)',
        'dark-green': 'var(--gradient-dark-green)',
        'purple-gradient': 'var(--gradient-purple)',
        'green-gradient': 'var(--gradient-green)',
        'button-gradient': 'var(--gradient-button)',
        'gradient-pop-up-success': 'var(--gradient-popup-success)',
        'gradient-pop-up': 'var(--gradient-popup)',
        'gradient-pop-up-error': 'var(--gradient-popup-error)',
      },

      fontFamily: {
        'corsa-grotesk': ['corsa-grotesk', 'sans-serif'],
      },
      width: {
        close: 'calc(100% - 80px)',
        open: 'calc(100% - 250px)',
      },
      fontSize: {
        '2xl': ['1.5rem'],
        'xl': ['1.25rem'],
        'lg': ['1.125rem'],
        'base': ['1rem'],
        'sm': ['0.875rem'],
        'xs': ['0.75rem'],
        '10px': ['10px'],
        '2xs': ['0.5rem'],
      },
      screens: {
        'pre-sm': '430px',
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        bold: '700',
        black: '900',
      },
      boxShadow: {
        'custom-yellow': '0 0 50px 22px var(--shadow-yellow)',
        'custom-purple': '0 0 60px 40px var(--shadow-purple)',
        'custom-pink': '0 0 60px 40px var(--shadow-pink)',
        'custom-gold': '0 0 40px 30px var(--shadow-gold)',
        'inset-right': 'inset -4px 0 15px rgba(0, 0, 0, 0.9)',
      },
      blur: {
        1: '1px',
      },
      transitionProperty: {
        width: 'width',
        opacity: 'opacity',
        margin: 'margin',
        color: 'color',
        height: 'height',
      },
      colors: {
        'gray': {
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          725: 'var(--gray-725)',
          750: 'var(--gray-750)',
          800: 'var(--gray-800)',
          850: 'var(--gray-850)',
          900: 'var(--gray-900)',
        },
        'greyborder': 'var(--greyborder)',

        'lime-green': 'var(--lime-green)',
        'bright-green': 'var(--bright-green)',

        'success-green-bg': 'var(--success-green-bg)',
        'success-green': 'var(--success-green)',
        'pending-yellow-bg': 'var(--pending-yellow-bg)',
        'pending-yellow': 'var(--pending-yellow)',
        'failed-red-bg': 'var(--failed-red-bg)',
        'failed-red': 'var(--failed-red)',

        'dark-blue': 'var(--dark-blue)',
        'neon': 'var(--neon-base)',
        'neon-1': 'hsl(var(--neon-1))',
        'neon-2': 'hsl(var(--neon-2))',
        'neon-3': 'hsl(var(--neon-3))',

        'green-1': 'hsl(var(--green-1))',
        'green-2': 'hsl(var(--green-2))',
        'green-3': 'hsl(var(--green-3))',

        'status-info': 'hsl(var(--status-info))',
        'status-success': 'hsl(var(--status-success))',
        'status-warning': 'hsl(var(--status-warning))',
        'status-error-200': 'hsl(var(--status-error-200))',
        'status-error-100': 'hsl(var(--status-error-100))',

        'pink': 'hsl(var(--pink))',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
