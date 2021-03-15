const path = require('path')

module.exports = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	logging: false,
	synchronize: true,
	entities: [path.resolve('./lib/entity') + '/**/*.ts'],
}
