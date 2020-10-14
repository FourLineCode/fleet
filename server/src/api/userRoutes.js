import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Joi from '@hapi/joi'
import User from '../models/user'
import auth from '../middlewares/auth'
import registerShema from '../middlewares/validation'

const router = Router()

// Get all users
router.get('/', auth, async (req, res, next) => {
	try {
		if (!req.admin) {
			throw new Error('Access denied')
		}

		const users = await User.find()
		if (!users) {
			throw new Error('No users found')
		}

		res.status(200).json(users)
	} catch (error) {
		next(error)
	}
})

// Signup new user
router.post('/signup', async (req, res, next) => {
	try {
		const { username, email, password, displayName } = req.body

		const { error } = await registerShema.validate(req.body)
		if (error) {
			const [err] = error.details
			throw err
		}

		const user1 = await User.findOne({ email: email })
		if (user1) {
			throw new Error('User already exists with given email')
		}

		const user2 = await User.findOne({ username })
		if (user2) {
			throw new Error('User already exists with given username')
		}

		const salt = await bcrypt.genSalt()
		const passwordHash = await bcrypt.hash(password, salt)

		const newUser = await User.create({
			username,
			displayName,
			email,
			password: passwordHash,
		})

		const savedUser = await newUser.save()

		res.status(200).json({ success: true, id: savedUser._id })
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
			throw new Error('User not found')
		}

		const validated = await bcrypt.compare(password, user.password)

		if (!validated) {
			throw new Error('Invalid Credentials')
		}

		const payload = {
			id: user._id,
			username: user.username,
			displayName: user.displayName,
		}

		const token = jwt.sign(payload, process.env.JWT_SECRET)

		res.cookie('auth_token', token)
		res.cookie('is_admin', user.isAdmin)
		res.status(200).json({ success: true, token: token })
	} catch (error) {
		next(error)
	}
})

// Check if a user is admin
router.get('/isadmin/:id', async (req, res, next) => {
	try {
		const { id } = req.params

		const user = await User.findById(id)
		if (!user) {
			throw new Error('User not found')
		}

		res
			.status(200)
			.json({ isAdmin: user.isAdmin, id: user._id, username: user.username })
	} catch (error) {
		next(error)
	}
})

export default router
