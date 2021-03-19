import { PrismaClient, User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../prisma'

export interface Context {
	req: NextApiRequest
	res: NextApiResponse
	prisma: PrismaClient
	authorized: boolean
	currentUser: User
	isAdmin: boolean
}

export const createContext = async (req: NextApiRequest, res: NextApiResponse): Promise<Context> => {
	const context: Record<string, any> = {
		req,
		res,
		prisma,
	}

	const token = req.cookies['auth-token']

	if (!token) {
		context.authorized = false
	} else {
		const validated = jwt.verify(token, process.env.JWT_SECRET || 'secret') as User

		context.authorized = !!validated

		if (validated) {
			context.currentUser = (await prisma.user.findFirst({
				where: { id: validated.id },
			})) as User

			context.isAdmin = !!context.currentUser.isAdmin
		}
	}

	return context as Context
}
