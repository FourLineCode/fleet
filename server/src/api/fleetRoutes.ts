import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import Fleet from '../entity/Fleet'
import Like from '../entity/Like'
import Reply from '../entity/Reply'
import auth from '../middlewares/auth'
import fleetSchema from '../validation/fleetSchema'
import replySchema from '../validation/replySchema'

const router = Router()

// Get all fleets
router.get('/', auth, async (req, res, next) => {
	try {
		const fleets = await Fleet.getAllFleets()

		res.status(StatusCodes.OK).json(fleets)
	} catch (error) {
		next(error)
	}
})

// Get home page fleets for user
router.get('/home', auth, async (req, res, next) => {
	try {
		const fleets = await Fleet.getHomepageForUser(req.userId)

		res.status(StatusCodes.OK).json(fleets)
	} catch (error) {
		next(error)
	}
})

// Get one fleet
router.get('/post/:id', auth, async (req, res, next) => {
	try {
		const fleet = await Fleet.getOneFleetById(req.params.id)

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
		const fleets = await Fleet.getFleetsByUserId(req.params.id)

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
		const fleet = await Fleet.getOneFleetById(req.params.id)

		if (!fleet) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Fleet not found')
		}

		if (fleet.author.id !== req.userId && !req.admin) {
			res.status(StatusCodes.FORBIDDEN)
			throw new Error('You are not authorized to delete this fleet')
		}

		await Fleet.delete({ id: req.params.id })

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
		const reply = await Reply.getOneReplyById(req.params.id)

		if (!reply) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Reply not found')
		}

		if (reply.user.id !== req.userId && !req.admin) {
			res.status(StatusCodes.FORBIDDEN)
			throw new Error('You are not authorized to delete this reply')
		}

		await Reply.delete({ id: req.params.id })

		res.status(StatusCodes.OK).json({ success: true })
	} catch (error) {
		next(error)
	}
})

export default router
