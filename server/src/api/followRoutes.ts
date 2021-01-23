import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import Follow from '../entity/Follow'
import User from '../entity/User'
import auth from '../middlewares/auth'

const router = Router()

// Follow a user
router.post('/:id', auth, async (req, res, next) => {
	try {
		if (req.params.id === req.userId) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('You cannot follow yourself')
		}

		const followedUser = await User.findOne({ id: req.params.id })
		if (!followedUser) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Requested user doesnt exist')
		}

		const alreadyFollows = await Follow.findOne({ where: { from: req.userId, to: req.params.id } })
		if (alreadyFollows) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('You already follow this user')
		}

		const follow = await Follow.create({
			from: req.user,
			to: followedUser,
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
		if (req.params.id === req.userId) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('You cannot unfollow yourself')
		}

		const followedUser = await User.findOne({ id: req.params.id })
		if (!followedUser) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Requested user doesnt exist')
		}

		const alreadyFollows = await Follow.findOne({ where: { from: req.userId, to: req.params.id } })
		if (!alreadyFollows) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('You do not follow this user')
		}

		Follow.unfollow({ from: req.userId, to: req.params.id })

		res.status(StatusCodes.OK).json({ success: true })
	} catch (error) {
		next(error)
	}
})

// Check if you follow a user
router.get('/check/:id', auth, async (req, res, next) => {
	try {
		const followedUser = await User.findOne({ id: req.params.id })
		if (!followedUser) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Requested user doesnt exist')
		}

		const alreadyFollows = await Follow.findOne({ where: { from: req.userId, to: req.params.id } })
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
		const user = await User.findOne({ where: { id: req.params.id }, relations: ['followers', 'following'] })
		if (!user) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Requested user doesnt exist')
		}

		const followerCount = user.followers.length
		const followingCount = user.following.length

		res.status(StatusCodes.OK).json({ followerCount, followingCount })
	} catch (error) {
		next(error)
	}
})

// Get follow users
router.get('/users/:id', auth, async (req, res, next) => {
	try {
		const user = await User.getFollowUsers(req.params.id)

		if (!user) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Requested user doesnt exist')
		}

		const followers = user.followers.map((follow) => follow.from)

		const following = user.following.map((follow) => follow.to)

		res.status(StatusCodes.OK).json({ followers, following })
	} catch (error) {
		next(error)
	}
})

export default router
