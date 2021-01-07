import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getManager } from 'typeorm'
import Follow from '../entity/Follow'
import User from '../entity/User'
import auth from '../middlewares/auth'

const router = Router()

// Follow a user
router.post('/:id', auth, async (req, res, next) => {
	try {
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

		await getManager()
			.getRepository(Follow)
			.createQueryBuilder('follow')
			.delete()
			.where('from = :from', { from: req.userId })
			.andWhere('to = :to', { to: req.params.id })
			.execute()

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

		const followers = user.followers
		const following = user.following

		res.status(StatusCodes.OK).json({ followers, following })
	} catch (error) {
		next(error)
	}
})

// Get follow users
router.get('/users/:id', auth, async (req, res, next) => {
	try {
		const user = await getManager()
			.getRepository(User)
			.createQueryBuilder('user')
			.where('user.id = :id', { id: req.params.id })
			.leftJoinAndSelect('user.followers', 'followers')
			.leftJoinAndSelect('followers.from', 'frfrom')
			.leftJoinAndSelect('followers.to', 'frto')
			.leftJoinAndSelect('user.following', 'following')
			.leftJoinAndSelect('following.from', 'fnfrom')
			.leftJoinAndSelect('following.to', 'fnto')
			.getOne()

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
