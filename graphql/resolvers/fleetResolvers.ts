import { intArg, list, mutationField, nonNull, queryField, stringArg } from 'nexus'
import { Context } from '../context'
import { checkAuth } from '../utils/checkAuth'
import fleetSchema from '../validation/fleetSchema'
import replySchema from '../validation/replySchema'

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
	type: 'Fleet',
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

		return { fleet }
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

export const likeFleet = mutationField('likeFleet', {
	type: 'SuccessResponse',
	authorize: checkAuth(),
	args: { id: nonNull(intArg()) },
	resolve: async (_root, { id }, { prisma, currentUser }: Context) => {
		const fleet = await prisma.fleet.findFirst({ where: { id }, rejectOnNotFound: true })

		const like = await prisma.like.findFirst({ where: { userId: currentUser.id, fleetId: fleet.id } })

		if (like) {
			throw new Error('You have already liked this fleet')
		}

		await prisma.like.create({
			data: {
				userId: currentUser.id,
				fleetId: fleet.id,
			},
		})

		return { success: true }
	},
})

export const unlikeFleet = mutationField('unlikeFleet', {
	type: 'SuccessResponse',
	authorize: checkAuth(),
	args: { id: nonNull(intArg()) },
	resolve: async (_root, { id }, { prisma, currentUser }: Context) => {
		const fleet = await prisma.fleet.findFirst({ where: { id }, rejectOnNotFound: true })

		const like = await prisma.like.findFirst({ where: { userId: currentUser.id, fleetId: fleet.id } })

		if (!like) {
			throw new Error('You have not liked this fleet')
		}

		await prisma.like.delete({ where: { id: like.id } })

		return { success: true }
	},
})

export const checkLike = queryField('checkLike', {
	type: 'CheckLikeResponse',
	authorize: checkAuth(),
	args: { id: nonNull(intArg()) },
	resolve: async (_root, { id }, { prisma, currentUser }: Context) => {
		const fleet = await prisma.fleet.findFirst({ where: { id }, rejectOnNotFound: true })

		const like = await prisma.like.findFirst({ where: { userId: currentUser.id, fleetId: fleet.id } })

		if (!like) {
			return { liked: false }
		}

		return { liked: true }
	},
})

export const reply = mutationField('reply', {
	type: 'Reply',
	authorize: checkAuth(),
	args: { fleetId: nonNull(intArg()), body: nonNull(stringArg()) },
	resolve: async (_root, { fleetId, body }, { prisma, currentUser }: Context) => {
		await prisma.fleet.findFirst({ where: { id: fleetId }, rejectOnNotFound: true })

		const { error } = replySchema.validate({ body })
		if (error) {
			throw error
		}

		return await prisma.reply.create({
			data: {
				body,
				fleetId,
				userId: currentUser.id,
			},
		})
	},
})

export const deleteReply = mutationField('deleteReply', {
	type: 'SuccessResponse',
	authorize: checkAuth(),
	args: { id: nonNull(intArg()) },
	resolve: async (_root, { id }, { prisma, currentUser, isAdmin }: Context) => {
		const reply = await prisma.reply.findFirst({ where: { id }, rejectOnNotFound: true })

		if (reply.userId !== currentUser.id && !isAdmin) {
			throw new Error('You are not authorized to delete this reply')
		}

		await prisma.reply.delete({ where: { id } })

		return { success: true }
	},
})
