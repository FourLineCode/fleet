import { intArg, mutationField, nonNull, queryField } from 'nexus'
import { Context } from '../context'
import { checkAuth } from '../utils/checkAuth'

export const follow = mutationField('follow', {
	type: 'SuccessResponse',
	authorize: checkAuth(),
	args: { id: nonNull(intArg()) },
	resolve: async (_root, { id }, { prisma, currentUser }: Context) => {
		if (id === currentUser.id) {
			throw new Error('You cannot follow yourself')
		}

		const followedUser = await prisma.user.findFirst({ where: { id }, rejectOnNotFound: true })

		const alreadyFollows = await prisma.follow.findFirst({
			where: {
				fromId: currentUser.id,
				toId: id,
			},
		})
		if (alreadyFollows) {
			throw new Error('You already follow this user')
		}

		await prisma.follow.create({
			data: {
				fromId: currentUser.id!,
				toId: followedUser.id,
			},
		})

		return { success: true }
	},
})

export const unfollow = mutationField('unfollow', {
	type: 'SuccessResponse',
	authorize: checkAuth(),
	args: { id: nonNull(intArg()) },
	resolve: async (_root, { id }, { prisma, currentUser }: Context) => {
		if (id === currentUser.id) {
			throw new Error('You cannot unfollow yourself')
		}

		await prisma.user.findFirst({ where: { id }, rejectOnNotFound: true })

		const alreadyFollows = await prisma.follow.findFirst({
			where: {
				fromId: currentUser.id,
				toId: id,
			},
		})
		if (!alreadyFollows) {
			throw new Error('You do not follow this user')
		}

		await prisma.follow.delete({
			where: {
				id: alreadyFollows.id,
			},
		})

		return { success: true }
	},
})

export const checkFollow = queryField('checkFollow', {
	type: 'CheckFollowResponse',
	authorize: checkAuth(),
	args: { id: nonNull(intArg()) },
	resolve: async (_root, { id }, { prisma, currentUser }: Context) => {
		await prisma.user.findFirst({ where: { id }, rejectOnNotFound: true })

		const alreadyFollows = await prisma.follow.findFirst({
			where: {
				fromId: currentUser.id,
				toId: id,
			},
		})

		return { follows: !!alreadyFollows }
	},
})

export const followCount = queryField('followCount', {
	type: 'FollowCountResponse',
	authorize: checkAuth(),
	args: { id: nonNull(intArg()) },
	resolve: async (_root, { id }, { prisma }: Context) => {
		const user = await prisma.user.findFirst({
			where: {
				id,
			},
			include: {
				followers: true,
				following: true,
			},
			rejectOnNotFound: true,
		})

		const followerCount = user.followers.length
		const followingCount = user.following.length

		console.log(followerCount, followingCount)
		return { followerCount, followingCount }
	},
})

export const followUsers = queryField('followUsers', {
	type: 'FollowUsersResponse',
	authorize: checkAuth(),
	args: { id: nonNull(intArg()) },
	resolve: async (_root, { id }, { prisma }: Context) => {
		const user = await prisma.user.findFirst({
			where: {
				id,
			},
			include: {
				followers: {
					include: {
						from: true,
					},
				},
				following: {
					include: {
						to: true,
					},
				},
			},
			rejectOnNotFound: true,
		})

		const followers = user.followers.map((follow) => follow.from)

		const following = user.following.map((follow) => follow.to)

		return { followers, following }
	},
})
