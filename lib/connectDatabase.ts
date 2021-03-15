import path from 'path'
import { createConnection, getConnectionManager } from 'typeorm'

export const connectDatabase = async () => {
	const connectionManager = getConnectionManager()
	const isAvailable = connectionManager.has('default')

	if (!isAvailable) {
		return await createConnection({
			type: 'postgres',
			url: process.env.DATABASE_URL,
			logging: false,
			synchronize: true,
			entities: [path.resolve('/entity/**/*.ts')],
		})
	}

	console.log(connectionManager.get('default').options)
	return connectionManager.get('default')
}
