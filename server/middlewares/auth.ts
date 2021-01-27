import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import User from '../entity/User'

const auth = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.cookies['auth-token']

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
