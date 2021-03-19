import { intArg, list, mutationField, nonNull, queryField, stringArg } from 'nexus'
import { Context } from '../context'
import { checkAuth } from '../utils/checkAuth'
import fleetSchema from '../validation/fleetSchema'

export const allFleets = queryField('allFleets', {
	type: list('Fleet'),
	authorize: checkAuth('ADMIN'),
	resolve: async (_root, _args, { prisma }: Context) => {
		return await prisma.fleet.findMany({
			include: {
				author: true,
				like: true,
				reply: true,
			},
		})
	},
})

export const homePageFleets = queryField('homePageFleets', {
	type: list('TimelineFleet'),
	authorize: checkAuth(),
	resolve: async (_root, _args, { prisma, currentUser }: Context) => {
		const followedUsers = await prisma.follow.findMany({
			where: {
				fromId: currentUser.id,
			},
			include: {
				from: true,
				to: true,
			},
		})

		const followedUserIds = followedUsers.map((follow) => follow.to.id)
		followedUserIds.push(currentUser.id)

		const fleets = await prisma.fleet.findMany({
			where: {
				authorId: {
					in: followedUserIds,
				},
			},
			include: {
				author: true,
				like: true,
				reply: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		})

		const responseFleets = fleets.map((fleet) => {
			for (const like of fleet.like) {
				if (like.userId === currentUser.id) {
					return { post: fleet, liked: true }
				}
			}
			return { post: fleet, liked: false }
		})

		return responseFleets
	},
})

export const fleet = queryField('fleet', {
	type: 'TimelineFleet',
	authorize: checkAuth(),
	args: { id: nonNull(intArg()) },
	resolve: async (_root, { id }, { prisma, currentUser }: Context) => {
		const fleet = await prisma.fleet.findFirst({
			where: { id },
			include: {
				like: true,
				author: true,
				reply: {
					include: {
						user: true,
					},
				},
			},
			rejectOnNotFound: true,
		})

		for (const like of fleet.like) {
			if (like.userId === currentUser.id) {
				return { post: fleet, liked: true }
			}
		}

		return { post: fleet, liked: false }
	},
})

export const userTimeline = queryField('userTimeline', {
	type: list('TimelineFleet'),
	authorize: checkAuth(),
	args: { id: nonNull(intArg()) },
	resolve: async (_root, { id }, { prisma, currentUser }: Context) => {
		const user = await prisma.user.findFirst({
			where: { id },
			include: {
				fleet: {
					include: {
						like: true,
						author: true,
						reply: true,
					},
					orderBy: {
						createdAt: 'desc',
					},
				},
			},
			rejectOnNotFound: true,
		})

		const responseFleets = user.fleet.map((fleet) => {
			for (const like of fleet.like) {
				if (like.userId === currentUser.id) {
					return { post: fleet, liked: true }
				}
			}
			return { post: fleet, liked: false }
		})

		return responseFleets
	},
})

export const postFleet = mutationField('postFleet', {
	type: 'PostFleetResponse',
	authorize: checkAuth(),
	args: { body: nonNull(stringArg()) },
	resolve: async (_root, { body }, { prisma, currentUser }: Context) => {
		const { error } = fleetSchema.validate({ body })
		if (error) {
			throw error
		}

		const fleet = await prisma.fleet.create({
			data: {
				body,
				authorId: currentUser.id,
			},
			include: {
				author: true,
			},
		})

		return { success: true, fleet }
	},
})

export const deleteFleet = mutationField('deleteFleet', {
	type: 'SuccessResponse',
	authorize: checkAuth(),
	args: { id: nonNull(intArg()) },
	resolve: async (_root, { id }, { prisma, currentUser, isAdmin }: Context) => {
		const fleet = await prisma.fleet.findFirst({ where: { id }, rejectOnNotFound: true })

		if (fleet.authorId !== currentUser.id && !isAdmin) {
			throw new Error('You are not authorized to delete this fleet')
		}

		await prisma.fleet.delete({ where: { id } })

		return { success: true }
	},
})
