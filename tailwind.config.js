/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        lavender: '#F0E6FF',
        sky: '#E0F7FA',
        gold: '#FFE5B4',
      },
      fontFamily: {
        'playfair': ['PlayfairDisplay-Regular', 'serif'],
        'inter': ['Inter-Regular', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
