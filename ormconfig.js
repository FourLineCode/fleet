const prod = process.env.NODE_ENV === 'production'

module.exports = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	logging: false,
	synchronize: true,
	entities: [prod ? './dist/entity/**/*.js' : './pages/api/entity/**/*.ts'],
}
