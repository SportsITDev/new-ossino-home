/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'game-detail': 'url("/backgrounds/gameDetailBackground.png")',
        'blue-gradient': 'linear-gradient(90deg, #08227B 0%, #036AA3 100%)',
        'dark-green':
          'linear-gradient(160deg, #20331F 0%, #1C271B 25%, #171717 50%, #1C271B 75%, #20331F 100%)',
        'purple-gradient': 'linear-gradient(90deg, #34087B 0%, #5F0FE1 100%)',
        'green-gradient': 'linear-gradient(90deg, #037157 0%, #07905E 100%)',
        'button-gradient':
          'linear-gradient(107.42deg, hsl(var(--neon-1)) 0%, hsl(var(--green-1)) 105%)',
        'gradient-pop-up-success':
          'linear-gradient(137.53deg, #20331f -0.82%, #1c271b 24.41%,#171717 49.65%,#1c271b 74.88%,#20331f 100.11%)',
        'gradient-pop-up':
          'linear-gradient(137.53deg, #20331f -0.82%, #171717 46.9%, #20331f 100.11%)',
        'gradient-pop-up-error':
          'linear-gradient(137.53deg, #331F1F -0.82%, #130303 46.9%, #331F1F 100.11%);',
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
        'custom-yellow': '0 0 50px 22px rgba(255, 203, 73, 0.22)',
        'custom-purple': '0 0 60px 40px rgba(191, 85, 236, 0.32)',
        'custom-pink': '0 0 60px 40px rgba(255, 82, 92, 0.32)',
        'custom-gold': '0 0 40px 30px rgba(255, 217, 76, 0.22)',
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
          100: '#EEEEEE',
          200: '#E2E2E4',
          300: '#BFBFBF',
          400: '#999999',
          500: '#7F7F7F',
          600: '#454545',
          700: '#2C2C2C',
          725: '#1F1F1F',
          750: '#1A1A1A',
          800: '#141414',
          850: '#0F0F0F',
          900: '#000000',
        },
        'greyborder': '#383838',

        'lime-green': '#C1FF11',
        'bright-green': '#44E929',

        'success-green-bg': '#04CC6F1A',
        'success-green': '#04CC6F',
        'pending-yellow-bg': '#FFCB451A',
        'pending-yellow': '#FFCB45',
        'failed-red-bg': '#F158581A',
        'failed-red': '#F15858',

        'dark-blue': '#1A2144',
        'neon': '#D8FF68',
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
  plugins: [],
};