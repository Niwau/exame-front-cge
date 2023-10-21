/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      'dark-100': '#1D1A23',
      'dark-200': '#24212C',
      'dark-300': '#302C3A',
      'dark-400': '#433E51',
      'dark-500': '#5B566F',
      primary: '#A961E2',
      'primary-100': '#B166EC',
      white: '#FAFAFA',
      danger: '#F22D2D'
    }
  },
  plugins: []
};
