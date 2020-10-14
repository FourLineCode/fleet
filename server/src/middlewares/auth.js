import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
	try {
		const token = req.cookies.auth_token
		if (!token) {
			throw new Error('Authorization failed')
		}

		const validated = jwt.verify(token, process.env.JWT_SECRET)
		if (!validated) {
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
