import { fieldAuthorizePlugin, makeSchema } from 'nexus'
import path from 'path'
import * as types from './resolvers'

export const schema = makeSchema({
	types,
	outputs: {
		typegen: path.join(process.cwd(), 'graphql', 'generated', 'nexus-typegen.ts'),
		schema: path.join(process.cwd(), 'graphql', 'generated', 'schema.graphql'),
	},
	plugins: [fieldAuthorizePlugin()],
})
