const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['index.html', './src/**/*.{html,ts,tsx}'],
	theme: {
		fontFamily: {
			sans: ['Inter', ...defaultTheme.fontFamily.sans]
		}
	},
	plugins: []
}
