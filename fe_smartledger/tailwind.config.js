/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			primary: {
  				'100': 'var(--primary-100)',
  				'200': 'var(--primary-200)',
  				'300': 'var(--primary-300)',
  				'400': 'var(--primary-400)',
  				'500': 'var(--primary-500)',
  				'600': 'var(--primary-600)',
  				'700': 'var(--primary-700)',
  				DEFAULT: 'var(--primary-500)',
  				foreground: '#ffffff'
  			},
  			secondary: {
  				'100': 'var(--secondary-100)',
  				'200': 'var(--secondary-200)',
  				'300': 'var(--secondary-300)',
  				'400': 'var(--secondary-400)',
  				'500': 'var(--secondary-500)',
  				'600': 'var(--secondary-600)',
  				'700': 'var(--secondary-700)',
  				DEFAULT: 'var(--secondary-500)',
  				foreground: '#ffffff'
  			},
  			success: {
  				'100': 'var(--success-100)',
  				'200': 'var(--success-200)',
  				'300': 'var(--success-300)',
  				'400': 'var(--success-400)',
  				'500': 'var(--success-500)',
  				'600': 'var(--success-600)',
  				'700': 'var(--success-700)',
  				DEFAULT: 'var(--success-500)',
  				foreground: '#ffffff'
  			},
  			danger: {
  				'100': 'var(--danger-100)',
  				'200': 'var(--danger-200)',
  				'300': 'var(--danger-300)',
  				'400': 'var(--danger-400)',
  				'500': 'var(--danger-500)',
  				'600': 'var(--danger-600)',
  				'700': 'var(--danger-700)',
  				DEFAULT: 'var(--danger-500)',
  				foreground: '#ffffff'
  			},
  			warning: {
  				'50': 'var(--warning-50)',
  				'100': 'var(--warning-100)',
  				'200': 'var(--warning-200)',
  				'300': 'var(--warning-300)',
  				'400': 'var(--warning-400)',
  				'500': 'var(--warning-500)',
  				'600': 'var(--warning-600)',
  				'700': 'var(--warning-700)',
  				'800': 'var(--warning-800)',
  				'900': 'var(--warning-900)',
  				DEFAULT: 'var(--warning-500)',
  				foreground: '#ffffff'
  			},
  			neutral: {
  				'50': 'var(--neutral-gray50)',
  				'100': 'var(--neutral-gray100)',
  				'200': 'var(--neutral-gray200)',
  				'300': 'var(--neutral-gray300)',
  				'400': 'var(--neutral-gray400)',
  				'500': 'var(--neutral-gray500)',
  				'600': 'var(--neutral-gray600)',
  				'700': 'var(--neutral-gray700)',
  				'800': 'var(--neutral-gray800)',
  				'900': 'var(--neutral-gray900)',
  				white: 'var(--neutral-white)',
  				black: 'var(--neutral-black)'
  			},
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			border: 'var(--neutral-gray200)',
  			input: 'var(--neutral-gray200)',
  			ring: 'var(--primary-500)',
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			purple: '0 4px 14px 0 rgb(124 58 237 / 0.15)',
  			'purple-lg': '0 10px 25px 0 rgb(124 58 237 / 0.2)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
