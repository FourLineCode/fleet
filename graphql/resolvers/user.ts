import { extendType } from 'nexus'
import { Context } from '../context'

export const UserQuery = extendType({
	type: 'Query',
	definition: (t) => {
		t.list.field('allUsers', {
			type: 'User',
			resolve: async (_root, _args, { prisma }: Context) => {
				return (await prisma.user.findMany()) || []
			},
		})
	},
})
