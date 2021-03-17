import { extendType, objectType } from 'nexus'
import { Context } from '../context'

export const User = objectType({
	name: 'User',
	definition: (t) => {
		t.int('id')
		t.string('email')
		t.string('password')
		t.string('username')
		t.string('displayName')
		t.string('bio')
		t.boolean('isAdmin')
		t.dateTime('createdAt')
		t.dateTime('updatedAt')
	},
})

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
