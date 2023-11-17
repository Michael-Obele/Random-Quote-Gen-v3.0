/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
      },
      animation: {
        'spin-once': 'spin 2s linear',
        wiggle: 'wiggle 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
