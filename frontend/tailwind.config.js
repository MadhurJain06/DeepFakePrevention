/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: {
          50:  '#1E1E18',
          100: '#13130F',
          200: '#222218',
          300: '#2A2A20',
        },
        ink: {
          900: '#F4F0E8',
          700: '#D8D2C4',
          500: '#C0B8A8',
          300: '#908880',
        },
        sage:    { DEFAULT: '#7FAF78', dark: '#5E8E57' },
        gold:    { DEFAULT: '#C9A96E', dark: '#A88848' },
        wine:    { DEFAULT: '#8C2F3F' },
        emerald: { DEFAULT: '#2E6B4B' },
        beige:   { DEFAULT: '#D8C3A5' },
        clay:    { DEFAULT: '#8A7A68' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['"Jost"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        soft:       '0 2px 20px rgba(0,0,0,0.45)',
        card:       '0 4px 32px rgba(0,0,0,0.55)',
        hover:      '0 12px 56px rgba(0,0,0,0.65)',
        'gold-glow':'0 0 48px rgba(201,169,110,0.14)',
        'sage-glow':'0 0 40px rgba(127,175,120,0.12)',
      },
    },
  },
  plugins: [],
}
