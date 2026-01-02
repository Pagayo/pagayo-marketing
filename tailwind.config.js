/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Stripe.com inspired colors
        'primary-purple': '#635BFF',
        'dark-blue': '#0A2540',
        'light-gray': '#F6F9FC',
        'medium-gray': '#8898AA',
        'success-green': '#00D924',
        'warning-orange': '#FF8A00',
        'error-red': '#DF1B41',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 8px rgba(0, 0, 0, 0.08)',
        medium: '0 4px 16px rgba(0, 0, 0, 0.12)',
        strong: '0 8px 24px rgba(0, 0, 0, 0.16)',
        'glow-purple': '0 0 24px rgba(99, 91, 255, 0.3)',
      },
    },
  },
  plugins: [],
};
