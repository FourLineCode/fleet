module.exports = {
	experimental: 'all',
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: {
		// enabled: true,
		content: ['./src/**/*.js', './src/**/*.html'],
	},
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
}
