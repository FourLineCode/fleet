import { User } from '@prisma/client'
import { list, queryField } from 'nexus'
import { Context } from '../context'
import { checkAuth } from '../utils/checkAuth'

export const recommend = queryField('recommend', {
	type: list('User'),
	authorize: checkAuth(),
	resolve: async (_root, _args, { prisma, currentUser }: Context) => {
		const users = await prisma.user.findMany()

		const user = await prisma.user.findFirst({
			where: { id: currentUser.id },
			include: {
				following: true,
			},
			rejectOnNotFound: true,
		})

		const followedUsers = user.following
		const followedUserIds = followedUsers.map((follow) => follow.toId)
		followedUserIds.push(currentUser.id)

		const filteredUsers = users.filter((user) => !followedUserIds.includes(user.id))

		const response: User[] = []
		for (let i = 0; i < 5; i++) {
			if (!filteredUsers.length) break
			response.push(filteredUsers.splice(Math.floor(Math.random() * filteredUsers.length), 1)[0])
		}

		return response
	},
})
