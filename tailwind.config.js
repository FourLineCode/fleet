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
		extend: {},
	},
	variants: {},
	plugins: [],
}
