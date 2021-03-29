const colors = require('tailwindcss/colors');

module.exports = {
	experimental: 'all',
	darkMode: 'class',
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: {
		content: ['./**/*.ts', './**/*.tsx'],
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
};
