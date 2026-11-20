import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0057B8',
          50: '#EEF5FF',
          100: '#D9E8FF',
          200: '#B3D1FF',
          300: '#7FB1F5',
          400: '#3D86E0',
          500: '#0A6AD1',
          600: '#0057B8',
          700: '#00468F',
          800: '#063870',
          900: '#0A2A52',
        },
        ink: '#0F1B2D',
        frost: '#E8F3FF',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,27,45,.06), 0 8px 24px -12px rgba(15,27,45,.18)',
      },
    },
  },
  plugins: [],
} satisfies Config;
