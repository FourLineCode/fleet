import { intArg, mutationField, nonNull } from 'nexus'
import { Context } from '../context'

export const follow = mutationField('follow', {
	type: 'SuccessResponse',
	authorize: (_root, _args, ctx: Context) => ctx.authorized,
	args: {
		id: nonNull(intArg()),
	},
	resolve: async (_root, { id }, { prisma, currentUser }: Context) => {
		if (id === currentUser?.id) {
			throw new Error('You cannot follow yourself')
		}

		const followedUser = await prisma.user.findFirst({ where: { id } })
		if (!followedUser) {
			throw new Error('Requested user doesnt exist')
		}

		const alreadyFollows = await prisma.follow.findFirst({
			where: {
				fromId: currentUser?.id,
				toId: id,
			},
		})
		if (alreadyFollows) {
			throw new Error('You already follow this user')
		}

		// await prisma.follow.create({
		// 	data: {
		// 		fromId: currentUser?.id,
		// 		toId: followedUser.id,
		// 	},
		// })

		return { success: true }
	},
})
