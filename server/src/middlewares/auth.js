import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'
import User from '../models/user'

const auth = async (req, res, next) => {
	try {
		const header = req.headers['authorization']
		if (!header) {
			res.status(StatusCodes.FORBIDDEN)
			throw new Error('Authorization failed')
		}

		const [_, token] = header.split(' ')

		if (!token) {
			res.status(StatusCodes.FORBIDDEN)
			throw new Error('Authorization failed')
		}

		const validated = jwt.verify(token, process.env.JWT_SECRET)
		if (!validated) {
			res.status(StatusCodes.FORBIDDEN)
			throw new Error('Authorization failed')
		}

		const user = await User.findById(validated.id)
		if (user.isAdmin) {
			req.admin = true
		}

		req.userId = user._id
		req.authorized = true
		next()
	} catch (error) {
		next(error)
	}
}

export default auth
