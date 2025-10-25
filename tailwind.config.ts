import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F97316',
          hover: '#EA580C',
        },
        background: {
          light: '#FFFFFF',
          dark: '#0D0D0D',
        },
        surface: {
          light: '#F9FAFB',
          dark: '#404040',
        },
        text: {
          light: '#111827',
          dark: '#F3F4F6',
        },
        'text-secondary': {
          light: '#6B7280',
          dark: '#9CA3AF',
        },
        border: {
          light: '#E5E7EB',
          dark: '#737373',
        },
      },
    },
  },
  plugins: [],
};
export default config;
