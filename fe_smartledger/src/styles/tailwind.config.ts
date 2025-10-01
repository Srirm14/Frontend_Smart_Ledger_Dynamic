import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Purple theme colors based on screenshot
        primary: {
          50: '#f3f0ff',
          100: '#e9e5ff',
          200: '#d6ceff',
          300: '#b8a6ff',
          400: '#9575ff',
          500: '#7c3aed', // Main purple
          600: '#6d28d9',
          700: '#5b21b6',
          800: '#4c1d95',
          900: '#3c1a78',
          950: '#2e1065',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#fef7ff',
          100: '#fceeff',
          200: '#f8ddff',
          300: '#f2bbff',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'purple': '0 4px 14px 0 rgb(124 58 237 / 0.15)',
        'purple-lg': '0 10px 25px 0 rgb(124 58 237 / 0.2)',
      }
    },
  },
  plugins: [],
}

export default config

// Predefined Style Classes
export const styleClasses = {
  // Headings
  heading1: "text-4xl font-bold text-gray-900 tracking-tight",
  heading2: "text-3xl font-semibold text-gray-800 tracking-tight", 
  heading3: "text-2xl font-semibold text-gray-700 tracking-tight",
  heading4: "text-xl font-medium text-gray-700",
  heading5: "text-lg font-medium text-gray-600",
  heading6: "text-base font-medium text-gray-600",

  // Labels
  label1: "text-sm font-semibold text-primary-600 uppercase tracking-wide",
  label2: "text-xs font-medium text-gray-500 uppercase tracking-wider",
  label3: "text-sm font-medium text-gray-600",
  label4: "text-xs font-medium text-gray-500",
  label5: "text-xs text-gray-400",

  // Buttons
  button1: "bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-lg shadow-purple transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  button2: "bg-white hover:bg-gray-50 text-primary-600 font-medium px-6 py-3 rounded-lg border border-primary-200 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
  button3: "bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
  button4: "bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-md shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
  button5: "text-primary-600 hover:text-primary-700 font-medium px-2 py-1 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",

  // Cards
  card1: "bg-white rounded-xl shadow-lg border border-gray-100 p-6",
  card2: "bg-white rounded-lg shadow-md border border-gray-200 p-4",
  card3: "bg-gray-50 rounded-lg border border-gray-200 p-4",
  card4: "bg-primary-50 rounded-lg border border-primary-200 p-4",
  card5: "bg-white rounded-md shadow-sm border border-gray-200 p-3",

  // Inputs
  input1: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200",
  input2: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200",
  input3: "w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200",

  // Tables
  table1: "w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden",
  tableHeader1: "bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200",
  tableCell1: "px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-b border-gray-200",
  tableCell2: "px-6 py-4 whitespace-nowrap text-sm text-gray-600 border-b border-gray-200",

  // Navigation
  navItem1: "flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-all duration-200",
  navItem2: "flex items-center px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all duration-200",
  navActive: "flex items-center px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-md",

  // Status
  statusActive: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800",
  statusInactive: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800",
  statusPending: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800",
  statusError: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800",

  // Layout
  container1: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  container2: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",
  container3: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8",
  sidebar: "w-64 bg-white shadow-lg border-r border-gray-200 h-full",
  mainContent: "flex-1 bg-gray-50 min-h-screen",

  // Spacing
  section1: "py-8 px-4 sm:px-6 lg:px-8",
  section2: "py-6 px-4 sm:px-6 lg:px-8", 
  section3: "py-4 px-4 sm:px-6 lg:px-8",
  section4: "py-3 px-4 sm:px-6 lg:px-8",
  section5: "py-2 px-4 sm:px-6 lg:px-8"
}
