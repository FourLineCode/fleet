import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

const auth = (req, res, next) => {
	try {
		const token = req.cookies.auth_token
		if (!token) {
			res.status(StatusCodes.FORBIDDEN)
			throw new Error('Authorization failed')
		}

		const validated = jwt.verify(token, process.env.JWT_SECRET)
		if (!validated) {
			res.status(StatusCodes.FORBIDDEN)
			throw new Error('Authorization failed')
		}

		const isAdmin = JSON.parse(req.cookies.is_admin)
		if (isAdmin === true) {
			req.admin = true
		}

		req.authorized = true
		next()
	} catch (error) {
		next(error)
	}
}

export default auth
