import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import auth from '../middlewares/auth'
import Follow from '../models/follow'
import User, { UserType } from '../models/user'

const router = Router()

// Follow a user
router.post('/:id', auth, async (req, res, next) => {
	try {
		const { id } = req.params
		const followedUser = await User.findOne({ _id: id })
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
		const followedUser = await User.findOne({ _id: id })
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
router.get('/check/:id', auth, async (req, res, next) => {
	try {
		const { id } = req.params
		const followedUser = await User.findOne({ _id: id })
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

// Get follow counts
router.get('/count/:id', auth, async (req, res, next) => {
	try {
		const { id } = req.params
		const user = await User.findOne({ _id: id })
		if (!user) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Requested user doesnt exist')
		}

		const followers = await Follow.find({ to: id }).select('from to')
		const following = await Follow.find({ from: id }).select('from to')

		res.status(StatusCodes.OK).json({ followers, following })
	} catch (error) {
		next(error)
	}
})

// Get follow users
router.get('/users/:id', auth, async (req, res, next) => {
	try {
		const { id } = req.params
		const user = await User.findOne({ _id: id })
		if (!user) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Requested user doesnt exist')
		}

		const followers = await Follow.find({ to: id }).select('from')
		const followerUsers: (UserType | null)[] = []

		for (const follow of followers) {
			const follower = await User.findOne({ _id: follow.from })
			followerUsers.push(follower)
		}

		const following = await Follow.find({ from: id }).select('to')
		const followingUsers: (UserType | null)[] = []

		for (const follow of following) {
			const followed = await User.findOne({ _id: follow.to })
			followingUsers.push(followed)
		}

		res.status(StatusCodes.OK).json({ followers: followerUsers, following: followingUsers })
	} catch (error) {
		next(error)
	}
})

export default router
