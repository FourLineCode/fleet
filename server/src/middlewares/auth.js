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

		req.authorized = true
		next()
	} catch (error) {
		next(error)
	}
}

const authAdmin = (req, res, next) => {
	try {
		const token = req.cookies.auth_token
		if (!token) {
			throw new Error('Authorization failed')
		}

		const validated = jwt.verify(token, process.env.JWT_SECRET)
		if (!validated) {
			throw new Error('Authorization failed')
		}

		const isAdmin = req.cookies.is_admin
		if (!isAdmin) {
			throw new Error('Admin authorization failed')
		}

		req.authorized = true
		next()
	} catch (error) {
		next(error)
	}
}

export { auth, authAdmin }
