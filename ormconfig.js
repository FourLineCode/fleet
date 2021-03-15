module.exports = {
	type: 'postgres',
	url: process.env.DATABASE_URL,
	logging: false,
	synchronize: true,
	entities: ['./server/entity/**/*.ts'],
}
