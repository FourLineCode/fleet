import bcrypt from 'bcryptjs'
import { intArg, list, mutationField, nonNull, nullable, queryField, stringArg } from 'nexus'
import { Context } from '../context'
import { createCookie } from '../utils/createCookie'
import { signToken, verifyToken } from '../utils/jwt'
import registerShema from '../validation/registerSchema'

export const allUsers = queryField('allUsers', {
	type: list('User'),
	authorize: (_root, _args, ctx: Context) => ctx.authorized && ctx.isAdmin,
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

export const getUser = queryField('getUser', {
	type: 'User',
	authorize: (_root, _args, ctx: Context) => ctx.authorized && ctx.isAdmin,
	args: {
		id: nonNull(intArg()),
	},
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
	type: 'SignUpResponse',
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

		return {
			success: true,
			user,
		}
	},
})

export const signIn = mutationField('signIn', {
	type: 'SignInResponse',
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

export const refreshToken = queryField('refreshToken', {
	type: 'RefreshTokenResponse',
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
	authorize: (_root, _args, ctx: Context) => ctx.authorized,
	args: {
		id: nonNull(intArg()),
	},
	resolve: async (_root, { id }, { prisma }: Context) => {
		const user = await prisma.user.findFirst({
			where: {
				id,
			},
		})

		if (!user) {
			throw new Error('User not found')
		}

		return user
	},
})

export const isAdmin = queryField('isAdmin', {
	type: 'Boolean',
	authorize: (_root, _args, ctx: Context) => ctx.authorized,
	args: {
		id: nonNull(intArg()),
	},
	resolve: async (_root, { id }, { prisma }: Context) => {
		const user = await prisma.user.findFirst({
			where: {
				id,
			},
		})

		if (!user) {
			throw new Error('User not found')
		}

		return user.isAdmin
	},
})
