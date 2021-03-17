import { ApolloServer } from 'apollo-server-micro'
import { NextApiRequest, NextApiResponse } from 'next'
import { createContext } from '../../graphql/context'
import { schema } from '../../graphql/schema'

const production = process.env.NODE_ENV === 'production'

export const config = { api: { bodyParser: false } }

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const server = new ApolloServer({
		schema,
		context: () => createContext(req, res),
		tracing: !production,
	})

	const handler = server.createHandler({
		path: '/api/graphql',
	})

	return await handler(req, res)
}
