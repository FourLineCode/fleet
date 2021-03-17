import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient({
	log: ['query'],
})

export interface Context {
	req: NextApiRequest
	res: NextApiResponse
	prisma: PrismaClient
}

export const createContext = (req: NextApiRequest, res: NextApiResponse): Context => {
	return { req, res, prisma }
}
