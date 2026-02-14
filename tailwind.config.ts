import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        guru: {
          50: '#f4f8ff',
          500: '#4f7bff',
          700: '#2f49de'
        }
      },
      boxShadow: {
        glow: '0 0 30px rgba(79, 123, 255, 0.45)'
      },
      keyframes: {
        pulseStar: {
          '0%,100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.25)', opacity: '1' }
        }
      },
      animation: {
        pulseStar: 'pulseStar 1.2s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;
