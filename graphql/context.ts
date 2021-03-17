import { PrismaClient, User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../prisma'

export interface Context {
	req: NextApiRequest
	res: NextApiResponse
	prisma: PrismaClient
	authorized: boolean
	user: User | null
}

export const createContext = async (req: NextApiRequest, res: NextApiResponse): Promise<Context> => {
	let authorized: boolean = false
	let user: User | null = null
	const token = req.cookies['auth-token']
	if (!token) {
		authorized = false
	} else {
		const validated = jwt.verify(token, process.env.JWT_SECRET || 'secret') as User

		authorized = !!validated

		if (validated) {
			user = await prisma.user.findFirst({
				where: { id: validated.id },
			})
		}
	}

	return { req, res, prisma, authorized, user }
}
