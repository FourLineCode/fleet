import { ApolloServer } from 'apollo-server-micro';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { NextApiRequest, NextApiResponse } from 'next';
import { createContext } from '../../graphql/context';
import { schema } from '../../graphql/schema';

const production = process.env.NODE_ENV === 'production';

export const config = { api: { bodyParser: false } };

const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Function) => {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: any) => {
			if (result instanceof Error) {
				return reject(result);
			}

			return resolve(result);
		});
	});
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const server = new ApolloServer({
		schema,
		context: async () => await createContext(req, res),
		tracing: !production,
		playground: !production && {
			settings: {
				'request.credentials': 'include',
			},
		},
	});

	const handler = server.createHandler({
		path: '/api/graphql',
	});

	await runMiddleware(req, res, morgan('dev', { skip: () => !!production }));
	await runMiddleware(req, res, helmet({ contentSecurityPolicy: production ? undefined : false }));
	await runMiddleware(req, res, cors({ credentials: true }));

	return await handler(req, res);
};
