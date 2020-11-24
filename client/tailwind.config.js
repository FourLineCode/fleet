module.exports = {
	experimental: 'all',
	darkMode: 'class',
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	purge: {
		enabled: process.env.NODE_ENV === 'production',
		content: ['./src/**/*.js', './src/**/*.html'],
	},
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [],
}
