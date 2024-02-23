import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      black: '#000',
      white: '#fff',
      background: '#fff',
      'gray-1': '#4f4f4f',
      'gray-2': '#4f4f4f70',
      'gray-3': '#4f4f4f1f',
    },
    screens: {
      desktop: '991px',
    },
  },
  plugins: [],
};
export default config;
