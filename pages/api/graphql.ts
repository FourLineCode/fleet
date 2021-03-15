import { ApolloServer } from 'apollo-server-micro'
import { NextApiRequest, NextApiResponse } from 'next'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { connectDatabase } from '../../server/connectDatabase'
import { HelloResolver } from '../../server/resolvers/helloResolver'

let apolloServerHandler: (req: any, res: any) => Promise<void>

const getApolloServerHandler = async () => {
	if (!apolloServerHandler) {
		const schema = await buildSchema({
			resolvers: [HelloResolver],
		})
		apolloServerHandler = new ApolloServer({ schema }).createHandler({
			path: '/api/graphql',
		})
	}
	return apolloServerHandler
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	await connectDatabase()

	// await User.find()

	const apolloServerHandler = await getApolloServerHandler()

	return apolloServerHandler(req, res)
}

export const config = { api: { bodyParser: false } }
