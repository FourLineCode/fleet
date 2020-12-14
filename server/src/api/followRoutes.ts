import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import auth from '../middlewares/auth'
import Follow from '../models/follow'
import User from '../models/user'

const router = Router()

// Follow a user
router.post('/:id', auth, async (req, res, next) => {
	try {
		const { id } = req.params
		const followedUser = await User.findOne({ id })
		if (!followedUser) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Requested user doesnt exist')
		}

		const alreadyFollows = await Follow.findOne({ from: req.userId, to: id })
		if (alreadyFollows) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('You already follow this user')
		}

		const follow = await Follow.create({
			from: req.userId,
			to: id,
		})
		await follow.save()

		res.status(StatusCodes.OK).json({ success: true })
	} catch (error) {
		next(error)
	}
})

// Unfollow a user
router.post('/unfollow/:id', auth, async (req, res, next) => {
	try {
		const { id } = req.params
		const followedUser = await User.findOne({ id })
		if (!followedUser) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Requested user doesnt exist')
		}

		const alreadyFollows = await Follow.findOne({ from: req.userId, to: id })
		if (!alreadyFollows) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('You do not follow this user')
		}

		await Follow.findOneAndDelete({ from: req.userId, to: id })

		res.status(StatusCodes.OK).json({ success: true })
	} catch (error) {
		next(error)
	}
})

// Check if you follow a user
router.post('/check/:id', auth, async (req, res, next) => {
	try {
		const { id } = req.params
		const followedUser = await User.findOne({ id })
		if (!followedUser) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Requested user doesnt exist')
		}

		const alreadyFollows = await Follow.findOne({ from: req.userId, to: id })
		if (!alreadyFollows) {
			return res.status(StatusCodes.OK).json({ follows: false })
		}

		res.status(StatusCodes.OK).json({ follows: true })
	} catch (error) {
		next(error)
	}
})

export default router
