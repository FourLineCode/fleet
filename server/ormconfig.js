const prod = process.env.NODE_ENV === 'production'

module.exports = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	logging: false,
	synchronize: true,
	entities: [prod ? './build/src/entity/**/*.js' : './src/entity/**/*.ts'],
}
