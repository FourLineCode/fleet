const prod = process.env.NODE_ENV === 'production'

module.exports = {
	type: 'postgres',
	url: process.env.DATABASE_URL + '?sslmode=require',
	logging: false,
	synchronize: true,
	entities: [prod ? './dist/entity/**/*.js' : './server/entity/**/*.ts'],
}
