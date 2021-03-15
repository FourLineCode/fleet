import { createConnection, getConnectionManager } from 'typeorm'

export const connectDatabase = async () => {
	const connectionManager = getConnectionManager()
	const isAvailable = connectionManager.has('default')

	if (!isAvailable) {
		return await createConnection()
	}

	return connectionManager.get('default')
}
