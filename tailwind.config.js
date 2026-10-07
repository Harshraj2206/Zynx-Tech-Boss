/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ios: {
          bg: 'var(--ios-bg)',
          'secondary-bg': 'var(--ios-secondary-bg)',
          'tertiary-bg': 'var(--ios-tertiary-bg)',
          separator: 'var(--ios-separator)',
          label: 'var(--ios-label)',
          'secondary-label': 'var(--ios-secondary-label)',
          'tertiary-label': 'var(--ios-tertiary-label)',
          fill: 'var(--ios-fill)',
          'secondary-fill': 'var(--ios-secondary-fill)',
          // System Accents
          blue: 'var(--ios-blue)',
          green: '#30D158',
          orange: '#FF9F0A',
          red: '#FF453A',
          yellow: '#FFD60A',
          purple: '#BF5AF2',
          teal: '#64D2FF',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro SC"',
          '"SF Pro Text"',
          '"SF Pro Display"',
          '"SF Pro Icons"',
          '"PingFang SC"',
          '"Helvetica Neue"',
          'Helvetica',
          'Inter',
          'Arial',
          'sans-serif'
        ],
        mono: [
          '"SF Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace'
        ],
      },
      borderRadius: {
        'ios-card': '20px',
        'ios-inner': '14px',
        'ios-modal': '28px',
        'ios-sheet': '32px',
      },
      transitionTimingFunction: {
        'apple-spring': 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      boxShadow: {
        'ios-card': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'ios-modal': '0 20px 60px -10px rgba(0, 0, 0, 0.35)',
        'ios-sheet': '0 -10px 40px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}
