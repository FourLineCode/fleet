import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { prisma } from '../../prisma'
import { User } from '../generated/models'
import { SignInResult } from '../types/SignInResult'
import registerShema from '../validation/registerSchema'

@Resolver()
export class UserResolver {
	@Query(() => [User])
	async allUsers() {
		// TODO: Authorization
		// if (!req.admin) {
		//     res.status(StatusCodes.FORBIDDEN)
		//     throw new Error('Access denied')
		// }

		return await prisma.user.findMany()
	}

	@Query(() => User)
	async getUser(@Arg('id') id: number) {
		return await prisma.user.findFirst({
			where: {
				id,
			},
		})
	}

	@Mutation(() => User)
	async signup(
		@Arg('email') email: string,
		@Arg('password') password: string,
		@Arg('username') username: string,
		@Arg('displayName') displayName: string,
		@Arg('bio', { nullable: true }) bio: string
	) {
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

		return await prisma.user.create({
			data: {
				email: email.toLowerCase(),
				password: await bcrypt.hash(password, 10),
				username: username.toLowerCase(),
				displayName,
				bio,
			},
		})
	}

	@Mutation(() => SignInResult)
	async signin(@Arg('email') email: string, @Arg('password') password: string) {
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

		// TODO: implement cookies
		// res.cookie('auth-token', token, {
		// 	httpOnly: true,
		// 	sameSite: true,
		// 	maxAge: 60 * 60 * 24 * 1000,
		// })

		// res.cookie('refresh-token', refreshToken, {
		// 	httpOnly: true,
		// 	sameSite: true,
		// 	maxAge: 60 * 60 * 24 * 365 * 1000,
		// })

		return new SignInResult(true, user.id, token, refreshToken)
	}
}
