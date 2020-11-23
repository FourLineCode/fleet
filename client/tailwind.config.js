module.exports = {
	experimental: 'all',
	darkMode: 'class',
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: {
		content: ['./src/**/*.js', './src/**/*.html'],
	},
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
}
