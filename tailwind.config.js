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
				light: '#FEFEFA',
				dark: colors.coolGray,
			},
		},
	},
	variants: {},
	plugins: [require('@tailwindcss/line-clamp')],
}
