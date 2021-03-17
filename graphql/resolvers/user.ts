import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { list, mutationField, nonNull, queryField, stringArg } from 'nexus'
import { Context } from '../context'
import { createCookie } from '../utils/createCookie'

export const allUsers = queryField('allUsers', {
	type: list('User'),
	authorize: (_root, _args, ctx: Context) => ctx.authorized,
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
		}

		const token = jwt.sign(payload, process.env.JWT_SECRET || 'sercet', {
			expiresIn: '24h',
		})

		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'sercet', {
			expiresIn: '1y',
		})

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
