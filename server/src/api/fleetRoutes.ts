import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import auth from '../middlewares/auth'
import Fleet from '../models/fleet'
import fleetSchema from '../validation/fleetSchema'

const router = Router()

// Get all fleets
router.get('/', auth, async (req, res, next) => {
	try {
		const fleets = (await Fleet.find().populate('author', '_id username displayName isAdmin')) || []

		res.status(StatusCodes.OK).json(fleets.reverse())
	} catch (error) {
		next(error)
	}
})

// Get one fleet
router.get('/post/:id', auth, async (req, res, next) => {
	try {
		const fleet = await Fleet.findOne({ _id: req.params.id }).populate('author', '_id username displayName isAdmin')

		if (!fleet) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Fleet not found')
		}

		res.status(StatusCodes.OK).json(fleet)
	} catch (error) {
		next(error)
	}
})

// Get fleets for one user by id
router.get('/timeline/:id', auth, async (req, res, next) => {
	try {
		const id = req.params.id

		if (!id || id === null) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Invalid user id')
		}

		const fleets = (await Fleet.find({ author: id }).populate('author', '_id username displayName isAdmin')) || []

		res.status(StatusCodes.OK).json(fleets.reverse())
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
			author: req.userId,
		})

		const savedFleet = await newFleet.save()

		res.status(StatusCodes.OK).json({ success: true, id: savedFleet._id })
	} catch (error) {
		next(error)
	}
})

// Like a fleet
router.post('/like/:id', auth, async (req, res, next) => {
	try {
		const id = req.params.id
		const fleet = await Fleet.findOne({ _id: id })

		if (!fleet) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Fleet not found')
		}

		if (fleet.likes?.includes(req.userId)) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('User already liked this fleet')
		}

		await fleet.update({ likes: [...fleet.likes!, req.userId] })

		res.status(StatusCodes.OK).json({ success: true })
	} catch (error) {
		next(error)
	}
})

// Unlike a fleet
router.post('/unlike/:id', auth, async (req, res, next) => {
	try {
		const id = req.params.id
		const fleet = await Fleet.findOne({ _id: id })

		if (!fleet) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Fleet not found')
		}

		if (!fleet.likes?.includes(req.userId)) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('User has not liked this fleet')
		}

		await fleet.update({
			likes: fleet.likes?.filter((user) => JSON.stringify(user) !== JSON.stringify(req.userId)),
		})

		res.status(StatusCodes.OK).json({ success: true })
	} catch (error) {
		next(error)
	}
})

export default router
