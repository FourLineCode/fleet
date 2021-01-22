import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getManager } from 'typeorm'
import Fleet from '../entity/Fleet'
import Follow from '../entity/Follow'
import Like from '../entity/Like'
import Reply from '../entity/Reply'
import User from '../entity/User'
import auth from '../middlewares/auth'
import fleetSchema from '../validation/fleetSchema'
import replySchema from '../validation/replySchema'

const router = Router()

// Get all fleets
router.get('/', auth, async (req, res, next) => {
	try {
		const fleets =
			(await getManager()
				.getRepository(Fleet)
				.createQueryBuilder('fleet')
				.leftJoinAndSelect('fleet.author', 'author')
				.leftJoinAndSelect('fleet.likes', 'likes')
				.leftJoinAndSelect('fleet.replies', 'replies')
				.select([
					'fleet',
					'likes',
					'replies',
					'author.id',
					'author.username',
					'author.displayName',
					'author.isAdmin',
				])
				.orderBy('fleet.createdAt', 'ASC')
				.getMany()) || []

		res.status(StatusCodes.OK).json(fleets.reverse())
	} catch (error) {
		next(error)
	}
})

// Get home page fleets for user
router.get('/home', auth, async (req, res, next) => {
	try {
		const fleets =
			(await getManager()
				.getRepository(Fleet)
				.createQueryBuilder('fleet')
				.leftJoinAndSelect('fleet.author', 'author')
				.leftJoinAndSelect('fleet.likes', 'likes')
				.leftJoinAndSelect('fleet.replies', 'replies')
				.orderBy('fleet.createdAt', 'DESC')
				.select([
					'fleet',
					'likes',
					'replies',
					'author.id',
					'author.username',
					'author.displayName',
					'author.isAdmin',
				])
				.getMany()) || []

		const followedUsers = await getManager()
			.getRepository(Follow)
			.createQueryBuilder('follow')
			.leftJoinAndSelect('follow.from', 'from')
			.where('from.id = :id', { id: req.userId })
			.leftJoinAndSelect('follow.to', 'to')
			.getMany()

		const followedUserIds = followedUsers.map((follow) => String(follow.to.id))
		followedUserIds.push(String(req.userId))

		const filteredFleets = fleets.filter((fleet) => followedUserIds.includes(String(fleet.author.id)))

		for (const fleet of filteredFleets) {
			const like = await Like.findOne({ where: { user: req.user, fleet: fleet } })
			fleet.liked = !!like
		}

		res.status(StatusCodes.OK).json(filteredFleets)
	} catch (error) {
		next(error)
	}
})

// Get one fleet
router.get('/post/:id', auth, async (req, res, next) => {
	try {
		const fleet = await getManager()
			.getRepository(Fleet)
			.createQueryBuilder('fleet')
			.where('fleet.id = :id', { id: req.params.id })
			.leftJoinAndSelect('fleet.author', 'author')
			.leftJoinAndSelect('fleet.likes', 'likes')
			.leftJoinAndSelect('fleet.replies', 'replies')
			.leftJoinAndSelect('replies.user', 'user')
			.orderBy('replies.createdAt', 'ASC')
			.select([
				'fleet',
				'likes',
				'replies',
				'user.id',
				'user.username',
				'user.displayName',
				'user.isAdmin',
				'author.id',
				'author.username',
				'author.displayName',
				'author.isAdmin',
			])
			.getOne()

		if (!fleet) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Fleet not found')
		}

		const like = await Like.findOne({ where: { user: req.user, fleet: fleet } })
		fleet.liked = !!like

		res.status(StatusCodes.OK).json(fleet)
	} catch (error) {
		next(error)
	}
})

// Get fleets for one user by id
router.get('/timeline/:id', auth, async (req, res, next) => {
	try {
		const user = await getManager()
			.getRepository(User)
			.createQueryBuilder('user')
			.where('user.id = :id', { id: req.params.id })
			.leftJoinAndSelect('user.fleets', 'fleets')
			.leftJoinAndSelect('fleets.author', 'author')
			.leftJoinAndSelect('fleets.likes', 'likes')
			.leftJoinAndSelect('fleets.replies', 'replies')
			.orderBy('fleets.createdAt', 'DESC')
			.select([
				'user',
				'fleets',
				'likes',
				'replies',
				'author.id',
				'author.username',
				'author.displayName',
				'author.bio',
				'author.isAdmin',
			])
			.getOne()

		const fleets = user?.fleets || []

		for (const fleet of fleets) {
			const like = await Like.findOne({ where: { user: req.user, fleet: fleet } })
			fleet.liked = !!like
		}

		res.status(StatusCodes.OK).json(fleets)
	} catch (error) {
		next(error)
	}
})

// Post a fleet
router.post('/', auth, async (req, res, next) => {
	try {
		const fleet = req.body
		const { error } = fleetSchema.validate(fleet)
		if (error) {
			const [err] = error.details
			res.status(StatusCodes.BAD_REQUEST)
			throw err
		}

		const newFleet = await Fleet.create({
			body: fleet.body,
			author: req.user,
		})

		const savedFleet = await newFleet.save()

		res.status(StatusCodes.OK).json({ success: true, id: savedFleet.id })
	} catch (error) {
		next(error)
	}
})

// Delete a fleet
router.delete('/:id', auth, async (req, res, next) => {
	try {
		const fleet = await getManager()
			.getRepository(Fleet)
			.createQueryBuilder('fleet')
			.where('fleet.id = :id', { id: req.params.id })
			.leftJoinAndSelect('fleet.author', 'author')
			.select(['fleet', 'author.id', 'author.username', 'author.displayName', 'author.isAdmin'])
			.getOne()

		if (!fleet) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Fleet not found')
		}

		if (fleet.author.id !== req.userId && !req.admin) {
			res.status(StatusCodes.FORBIDDEN)
			throw new Error('You are not authorized to delete this fleet')
		}

		await getManager()
			.getRepository(Fleet)
			.createQueryBuilder('fleet')
			.delete()
			.where('fleet.id = :id', { id: fleet.id })
			.execute()

		res.status(StatusCodes.OK).json({ success: true })
	} catch (error) {
		next(error)
	}
})

// Like a fleet
router.post('/like/:id', auth, async (req, res, next) => {
	try {
		const fleet = await Fleet.findOne({ id: req.params.id })

		if (!fleet) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Fleet not found')
		}

		const like = await Like.findOne({ where: { user: req.user, fleet: fleet } })

		if (like) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('User already liked this fleet')
		}

		await Like.create({
			user: req.user,
			fleet: fleet,
		}).save()

		res.status(StatusCodes.OK).json({ success: true })
	} catch (error) {
		next(error)
	}
})

// Unlike a fleet
router.post('/unlike/:id', auth, async (req, res, next) => {
	try {
		const fleet = await Fleet.findOne({ id: req.params.id })

		if (!fleet) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Fleet not found')
		}

		const like = await Like.findOne({ where: { user: req.user, fleet: fleet } })

		if (!like) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('User has not liked this fleet')
		}

		await Like.delete({ user: req.user, fleet: fleet })

		res.status(StatusCodes.OK).json({ success: true })
	} catch (error) {
		next(error)
	}
})

// Check if user likes a fleet
router.get('/checklike/:id', auth, async (req, res, next) => {
	try {
		const fleet = await Fleet.findOne({ id: req.params.id })

		if (!fleet) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Fleet not found')
		}

		const like = await Like.findOne({ where: { user: req.user, fleet: fleet } })

		if (!like) {
			return res.status(StatusCodes.OK).json({ liked: false })
		}

		res.status(StatusCodes.OK).json({ liked: true })
	} catch (error) {
		next(error)
	}
})

// Reply to a fleet
router.post('/reply/:id', auth, async (req, res, next) => {
	try {
		const fleet = await Fleet.findOne({ id: req.params.id })

		if (!fleet) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Fleet not found')
		}

		const { error } = replySchema.validate(req.body)
		if (error) {
			const [err] = error.details
			res.status(StatusCodes.BAD_REQUEST)
			throw err
		}

		const reply = Reply.create({ fleet: fleet, user: req.user, body: req.body.body })
		await reply.save()

		res.status(StatusCodes.OK).json({ success: true, reply: reply })
	} catch (error) {
		next(error)
	}
})

// Delete a reply
router.delete('/reply/:id', auth, async (req, res, next) => {
	try {
		const reply = await getManager()
			.getRepository(Reply)
			.createQueryBuilder('reply')
			.where('reply.id = :id', { id: req.params.id })
			.leftJoinAndSelect('reply.user', 'user')
			.select(['reply', 'user.id', 'user.username', 'user.displayName', 'user.isAdmin'])
			.getOne()

		if (!reply) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Reply not found')
		}

		if (reply.user.id !== req.userId && !req.admin) {
			res.status(StatusCodes.FORBIDDEN)
			throw new Error('You are not authorized to delete this reply')
		}

		await getManager()
			.getRepository(Reply)
			.createQueryBuilder('reply')
			.delete()
			.where('reply.id = :id', { id: reply.id })
			.execute()

		res.status(StatusCodes.OK).json({ success: true })
	} catch (error) {
		next(error)
	}
})

export default router
