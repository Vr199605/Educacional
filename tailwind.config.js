/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#fafaf9',
        foreground: '#18181b',
        card: {
          DEFAULT: '#ffffff',
          foreground: '#18181b',
        },
        muted: {
          DEFAULT: '#f4f4f5',
          foreground: '#71717a',
        },
        border: '#e4e4e7',
        brand: {
          DEFAULT: '#059669',
          foreground: '#ffffff',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        accent: {
          DEFAULT: '#f0fdf4',
          foreground: '#166534',
          emerald: '#059669',
        },
        destructive: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Instrument Sans"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
