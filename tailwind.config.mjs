/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Stripe.com inspired color palette
        primary: {
          purple: '#635BFF',
          dark: '#0A2540',
          light: '#F6F9FC',
        },
        accent: {
          green: '#00D924',
          orange: '#FF6B00',
          blue: '#0073E6',
        },
        gray: {
          50: '#F6F9FC',
          100: '#E3E8EF',
          200: '#CFD7DF',
          300: '#CFD7DF',
          400: '#A3ACB9',
          500: '#89939E',
          600: '#697386',
          700: '#425466',
          800: '#2C3E50',
          900: '#0A2540',
        },
        success: '#00D924',
        error: '#DF1B41',
        warning: '#FF6B00',
        info: '#0073E6',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['Fira Code', 'SF Mono', 'Consolas', 'monospace'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.5' }],
        lg: ['1.25rem', { lineHeight: '1.5' }],
        xl: ['1.5rem', { lineHeight: '1.2' }],
        '2xl': ['2rem', { lineHeight: '1.2' }],
        '3xl': ['2.5rem', { lineHeight: '1.2' }],
        '4xl': ['3rem', { lineHeight: '1.2' }],
        '5xl': ['4rem', { lineHeight: '1.1' }],
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(10, 37, 64, 0.08)',
        medium: '0 4px 16px rgba(10, 37, 64, 0.12)',
        strong: '0 8px 24px rgba(10, 37, 64, 0.15)',
        'glow-purple': '0 8px 20px rgba(99, 91, 255, 0.4)',
      },
    },
  },
  plugins: [],
};
