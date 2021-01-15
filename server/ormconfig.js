const prod = process.env.NODE_ENV !== 'development'

module.exports = {
	type: 'sqlite',
	database: './db/database.sqlite',
	logging: false,
	synchronize: true,
	entities: [prod ? './build/src/entity/**/*.js' : './src/entity/**/*.ts'],
}
