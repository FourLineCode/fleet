import bcrypt from 'bcryptjs'
import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import User from '../entity/User'
import auth from '../middlewares/auth'
import registerShema from '../validation/registerSchema'

const router = Router()

// Get all users
router.get('/', auth, async (req, res, next) => {
	try {
		if (!req.admin) {
			res.status(StatusCodes.FORBIDDEN)
			throw new Error('Access denied')
		}

		const users = (await User.find()) || []

		res.status(StatusCodes.OK).json(users)
	} catch (error) {
		next(error)
	}
})

// Get one user
router.get('/profile/:id', auth, async (req, res, next) => {
	try {
		const user = await User.find({ id: req.params.id })
		if (!user) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('User not found')
		}

		res.status(StatusCodes.OK).json(user)
	} catch (error) {
		next(error)
	}
})

// Signup new user
router.post('/signup', async (req, res, next) => {
	try {
		const { username, email, password, displayName, bio } = req.body

		const { error } = registerShema.validate(req.body)
		if (error) {
			const [err] = error.details
			res.status(StatusCodes.BAD_REQUEST)
			throw err
		}

		const emailExists = await User.findOne({ email: email })
		if (emailExists) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('User already exists with given email')
		}

		const usernameExists = await User.findOne({ username: username.toLowerCase() })
		if (usernameExists) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('User already exists with given username')
		}

		const salt = await bcrypt.genSalt()
		const passwordHash = await bcrypt.hash(password, salt)

		const newUser = await User.create({
			username: username.toLowerCase(),
			displayName,
			bio,
			email,
			password: passwordHash,
		})

		await newUser.save()

		res.status(StatusCodes.OK).json({ success: true })
	} catch (error) {
		next(error)
	}
})

// Signin as user
router.post('/signin', async (req, res, next) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email })
		if (!user) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Invalid Credentials')
		}

		const validated = await bcrypt.compare(password, user.password)

		if (!validated) {
			res.status(StatusCodes.BAD_REQUEST)
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

		res.cookie('auth-token', token, {
			httpOnly: true,
			sameSite: true,
			maxAge: 60 * 60 * 24 * 1000,
		})

		res.cookie('refresh-token', refreshToken, {
			httpOnly: true,
			sameSite: true,
			maxAge: 60 * 60 * 24 * 365 * 1000,
		})

		res.status(StatusCodes.OK).json({
			success: true,
			id: user.id,
			token: token,
			refreshToken: refreshToken,
		})
	} catch (error) {
		next(error)
	}
})

// Signs out user
router.post('/signout', (req, res, next) => {
	try {
		const token = req.cookies['auth-token']
		const refreshToken = req.cookies['refresh-token']

		if (!token && !refreshToken) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('You are not signed in')
		}

		res.clearCookie('auth-token')
		res.clearCookie('refresh-token')

		res.status(StatusCodes.OK).json({ success: true })
	} catch (error) {
		next(error)
	}
})

// Refreshes the authorization token
router.get('/refreshtoken', async (req, res, next) => {
	try {
		const refreshToken = req.cookies['refresh-token']
		if (!refreshToken) {
			res.status(StatusCodes.OK).json({ message: 'You do not have a refresh token' })
			return
		}

		const verifiedUser = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || 'sercet') as User
		if (!verifiedUser) {
			res.status(StatusCodes.FORBIDDEN)
			throw new Error('Access denied')
		}

		const payload = {
			id: verifiedUser.id,
		}

		const newToken = jwt.sign(payload, process.env.JWT_SECRET || 'sercet', {
			expiresIn: '24h',
		})

		const newRefreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'sercet', {
			expiresIn: '1y',
		})

		res.cookie('auth-token', newToken, {
			httpOnly: true,
			sameSite: true,
			maxAge: 60 * 60 * 24 * 1000,
		})

		res.cookie('refresh-token', newRefreshToken, {
			httpOnly: true,
			sameSite: true,
			maxAge: 60 * 60 * 24 * 365 * 1000,
		})

		res.status(StatusCodes.OK).json({
			success: true,
			id: verifiedUser.id,
			token: newToken,
			refreshToken: newRefreshToken,
		})
	} catch (error) {
		next(error)
	}
})

// Get authenticated users data
router.get('/info/:id', auth, async (req, res, next) => {
	try {
		const user = await User.findOne({ id: req.params.id })
		if (!user) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('User not found')
		}

		const data = {
			id: user.id,
			username: user.username,
			displayName: user.displayName,
			bio: user.bio,
			createdAt: user.createdAt,
			isAdmin: user.isAdmin,
		}

		res.status(StatusCodes.OK).json(data)
	} catch (error) {
		next(error)
	}
})

// Check if a user is admin
router.get('/isadmin/:id', async (req, res, next) => {
	try {
		const user = await User.findOne({ id: req.params.id })
		if (!user) {
			res.status(StatusCodes.NOT_FOUND)
			throw new Error('User not found')
		}

		res.status(StatusCodes.OK).json({ isAdmin: user.isAdmin, id: user.id })
	} catch (error) {
		next(error)
	}
})

export default router
