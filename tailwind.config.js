const colors = require('tailwindcss/colors')

module.exports = {
	experimental: 'all',
	darkMode: 'class',
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: {
		content: [
			'./pages/**/*.ts',
			'./pages/**/*.tsx',
			'./components/**/*.ts',
			'./components/**/*.tsx',
			'./ui/**/*.ts',
			'./ui/**/*.tsx',
		],
	},
	theme: {
		extend: {
			colors: {
				brand: colors.emerald,
				light: colors.coolGray[100],
				dark: colors.coolGray,
			},
		},
	},
	variants: {
		width: ['responsive', 'focus'],
	},
	plugins: [require('@tailwindcss/line-clamp')],
}
