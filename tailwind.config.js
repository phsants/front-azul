/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  safelist: [
    'bg-[#4caf50]',
    'hover:bg-[#388e3c]',
    'bg-[#0077b6]',
    'hover:bg-[#005f8d]',
    'border-[#0077b6]',
    'bg-[#e53935]',
    'hover:bg-[#c62828]',
  ],
  plugins: [],
};
