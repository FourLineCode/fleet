import { ApolloServer } from 'apollo-server-micro'
import { NextApiRequest, NextApiResponse } from 'next'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { authChecker } from '../../server/middlewares/authChecker'
import { UserResolver } from '../../server/resolvers/userResolver'

let apolloServerHandler: (req: any, res: any) => Promise<void>

const getApolloServerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (!apolloServerHandler) {
		const schema = await buildSchema({
			resolvers: [UserResolver],
			authChecker,
		})
		apolloServerHandler = new ApolloServer({
			schema,
			context: {
				req,
				res,
			},
		}).createHandler({
			path: '/api/graphql',
		})
	}
	return apolloServerHandler
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const apolloServerHandler = await getApolloServerHandler(req, res)

	return apolloServerHandler(req, res)
}

export const config = { api: { bodyParser: false } }
