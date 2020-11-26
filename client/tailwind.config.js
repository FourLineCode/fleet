module.exports = {
	experimental: 'all',
	darkMode: 'class',
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: {
		content: ['./src/**/*.ts', './src/**/*.tsx', './src/**/*.html'],
	},
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
}
