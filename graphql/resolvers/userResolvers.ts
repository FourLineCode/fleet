import bcrypt from 'bcryptjs'
import { intArg, list, mutationField, nonNull, nullable, queryField, stringArg } from 'nexus'
import { Context } from '../context'
import { checkAuth } from '../utils/checkAuth'
import { createCookie } from '../utils/createCookie'
import { signToken, verifyToken } from '../utils/jwt'
import { registerShema } from '../validation/registerSchema'

export const allUsers = queryField('allUsers', {
	type: list('User'),
	authorize: checkAuth('ADMIN'),
	resolve: async (_root, _args, { prisma }: Context) => {
		return await prisma.user.findMany({
			include: {
				fleet: true,
				followers: true,
				following: true,
				like: true,
				reply: true,
			},
		})
	},
})

export const user = queryField('user', {
	type: 'User',
	authorize: checkAuth('ADMIN'),
	args: { id: nonNull(intArg()) },
	resolve: async (_root, { id }, { prisma }: Context) => {
		return await prisma.user.findFirst({
			where: {
				id,
			},
			include: {
				followers: true,
				following: true,
			},
		})
	},
})

export const signUp = mutationField('signUp', {
	type: 'User',
	args: {
		email: nonNull(stringArg()),
		password: nonNull(stringArg()),
		username: nonNull(stringArg()),
		displayName: nonNull(stringArg()),
		bio: nullable(stringArg()),
	},
	resolve: async (_root, { email, password, username, displayName, bio }, { prisma }: Context) => {
		const { error } = registerShema.validate({ email, password, username, displayName, bio })
		if (error) {
			throw error
		}

		const emailExists = await prisma.user.findFirst({
			where: {
				email: email.toLowerCase(),
			},
		})
		if (emailExists) {
			throw new Error('User already exists with given email')
		}

		const usernameExists = await prisma.user.findFirst({
			where: {
				username: username.toLowerCase(),
			},
		})
		if (usernameExists) {
			throw new Error('User already exists with given username')
		}

		const user = await prisma.user.create({
			data: {
				email: email.toLowerCase(),
				password: await bcrypt.hash(password, 10),
				username: username.toLowerCase(),
				displayName,
				bio: bio || '',
			},
		})

		return user
	},
})

export const signIn = mutationField('signIn', {
	type: 'TokenResponse',
	args: {
		email: nonNull(stringArg()),
		password: nonNull(stringArg()),
	},
	resolve: async (_root, { email, password }, { prisma, res }: Context) => {
		const user = await prisma.user.findFirst({
			where: {
				email: email.toLowerCase(),
			},
		})
		if (!user) {
			throw new Error('Invalid Credentials')
		}

		const validated = await bcrypt.compare(password, user.password)

		if (!validated) {
			throw new Error('Invalid Credentials')
		}

		const payload = {
			id: user.id,
			username: user.username,
			displayName: user.displayName,
		}

		const token = signToken(payload, '24h', 'AUTH')

		const refreshToken = signToken(payload, '1y', 'REFRESH')

		res.setHeader('Set-Cookie', [
			createCookie('auth-token', token, 1),
			createCookie('refresh-token', refreshToken, 365),
		])

		return {
			success: true,
			id: user.id,
			token,
			refreshToken,
		}
	},
})

export const signOut = mutationField('signOut', {
	type: 'SuccessResponse',
	authorize: checkAuth(),
	resolve: (_root, _args, { req, res }: Context) => {
		const token = req.cookies['auth-token']
		const refreshToken = req.cookies['refresh-token']

		if (!token && !refreshToken) {
			throw new Error('You are not signed in')
		}

		res.setHeader('Set-Cookie', [createCookie('auth-token', '', -1), createCookie('refresh-token', '', -1)])

		return { success: true }
	},
})

export const refreshToken = queryField('refreshToken', {
	type: 'TokenResponse',
	resolve: (_root, _args, { req, res }: Context) => {
		const refreshToken = req.cookies['refresh-token'] as string

		if (!refreshToken) {
			throw new Error('You do not have a refresh token')
		}

		const verifiedUser = verifyToken(refreshToken, 'REFRESH')
		if (!verifiedUser) {
			throw new Error('Access denied')
		}

		const payload = {
			id: verifiedUser.id,
			username: verifiedUser.username,
			displayName: verifiedUser.displayName,
		}

		const newToken = signToken(payload, '24h', 'AUTH')

		const newRefreshToken = signToken(payload, '1y', 'REFRESH')

		res.setHeader('Set-Cookie', [
			createCookie('auth-token', newToken, 1),
			createCookie('refresh-token', newRefreshToken, 365),
		])

		return {
			success: true,
			id: verifiedUser.id,
			token: newToken,
			refreshToken: newRefreshToken,
		}
	},
})

export const userInfo = queryField('userInfo', {
	type: 'User',
	authorize: checkAuth(),
	args: { id: nonNull(intArg()) },
	resolve: async (_root, { id }, { prisma }: Context) => {
		return await prisma.user.findFirst({ where: { id }, rejectOnNotFound: true })
	},
})

export const isAdmin = queryField('isAdmin', {
	type: 'Boolean',
	authorize: checkAuth(),
	args: { id: nonNull(intArg()) },
	resolve: async (_root, { id }, { prisma }: Context) => {
		const user = await prisma.user.findFirst({ where: { id }, rejectOnNotFound: true })

		return user.isAdmin
	},
})
