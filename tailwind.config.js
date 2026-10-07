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
          'secondary-bg': 'var(--ios-grouped-bg)',
          'grouped-bg': 'var(--ios-grouped-bg)',
          'elevated-bg': 'var(--ios-elevated-bg)',
          separator: 'var(--ios-separator)',
          label: 'var(--ios-label)',
          'secondary-label': 'var(--ios-secondary-label)',
          'tertiary-label': 'var(--ios-tertiary-label)',
          fill: 'var(--ios-fill)',
          // System Accents
          blue: 'var(--ios-blue)',
          green: 'var(--ios-green)',
          orange: 'var(--ios-orange)',
          red: 'var(--ios-red)',
          yellow: 'var(--ios-yellow)',
          purple: 'var(--ios-purple)',
          teal: 'var(--ios-teal)',
          gray: 'var(--ios-gray)',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"SF Pro SC"',
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
          'Menlo',
          'monospace'
        ],
      },
      borderRadius: {
        'ios-card': '20px',
        'ios-inner': '14px',
        'ios-pill': '28px',
        'ios-modal': '28px',
        'ios-sheet': '32px',
      },
      transitionTimingFunction: {
        'apple-spring': 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      boxShadow: {
        'glass-dark': 'inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 8px 32px rgba(0, 0, 0, 0.25)',
        'glass-light': 'inset 0 1px 0 rgba(255, 255, 255, 0.60), 0 8px 32px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
