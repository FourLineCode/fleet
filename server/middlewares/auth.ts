import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import User from '../entity/User'

const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const header = req.headers['authorization']
		if (!header) {
			res.status(StatusCodes.FORBIDDEN)
			throw new Error('Authorization failed')
		}

		// TODO: Romove this in production
		const [type, token] = header.split(' ')
		if (type !== 'Bearer') {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Token must be prefixed with Bearer')
		}

		if (!token) {
			res.status(StatusCodes.FORBIDDEN)
			throw new Error('Authorization failed')
		}

		const validated = jwt.verify(token, process.env.JWT_SECRET || 'sercet') as User
		if (!validated) {
			res.status(StatusCodes.FORBIDDEN)
			throw new Error('Authorization failed')
		}

		const user = await User.findOne({ id: validated.id })
		if (user?.isAdmin) {
			req.admin = true
		}
		req.user = user
		req.userId = user?.id!
		req.authorized = true
		next()
	} catch (error) {
		next(error)
	}
}

export default auth
