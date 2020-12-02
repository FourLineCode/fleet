import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import auth from '../middlewares/auth'
import Tweet from '../models/tweet'
import tweetSchema from '../validation/tweetSchema'

const router = Router()

// Get all tweets
router.get('/', auth, async (req, res, next) => {
	try {
		const tweets =
			(await Tweet.find().populate(
				'author',
				'_id username displayName isAdmin'
			)) || []

		res.status(StatusCodes.OK).json(tweets.reverse())
	} catch (error) {
		next(error)
	}
})

// Get one tweet
router.get('/post/:id', auth, async (req, res, next) => {
	try {
		const tweet = await Tweet.findOne({ _id: req.params.id }).populate(
			'author',
			'_id username displayName isAdmin'
		)

		if (!tweet) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Tweet not found')
		}

		res.status(StatusCodes.OK).json(tweet)
	} catch (error) {
		next(error)
	}
})

// Get tweets for one user by id
router.get('/timeline/:id', auth, async (req, res, next) => {
	try {
		const id = req.params.id

		if (!id || id === null) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Invalid user id')
		}

		const tweets =
			(await Tweet.find({ author: id }).populate(
				'author',
				'_id username displayName isAdmin'
			)) || []

		res.status(StatusCodes.OK).json(tweets.reverse())
	} catch (error) {
		next(error)
	}
})

// Post a tweet
router.post('/', auth, async (req, res, next) => {
	try {
		const tweet = req.body
		const { error } = tweetSchema.validate(tweet)
		if (error) {
			const [err] = error.details
			res.status(StatusCodes.BAD_REQUEST)
			throw err
		}

		const newTweet = await Tweet.create({
			body: tweet.body,
			author: req.userId,
		})

		const savedTweet = await newTweet.save()

		res.status(StatusCodes.OK).json({ success: true, id: savedTweet._id })
	} catch (error) {
		next(error)
	}
})

// Like a tweet
router.post('/like/:id', auth, async (req, res, next) => {
	try {
		const id = req.params.id
		const tweet = await Tweet.findOne({ _id: id })

		if (!tweet) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Tweet not found')
		}

		if (tweet.likes?.includes(req.userId)) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('User already liked this tweet')
		}

		await tweet.update({ likes: [...tweet.likes!, req.userId] })

		res.status(StatusCodes.OK).json({ success: true })
	} catch (error) {
		next(error)
	}
})

// Unlike a tweet
router.post('/unlike/:id', auth, async (req, res, next) => {
	try {
		const id = req.params.id
		const tweet = await Tweet.findOne({ _id: id })

		if (!tweet) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('Tweet not found')
		}

		if (!tweet.likes?.includes(req.userId)) {
			res.status(StatusCodes.BAD_REQUEST)
			throw new Error('User has not liked this tweet')
		}

		await tweet.update({
			likes: tweet.likes?.filter(
				(user) => JSON.stringify(user) !== JSON.stringify(req.userId)
			),
		})

		res.status(StatusCodes.OK).json({ success: true })
	} catch (error) {
		next(error)
	}
})

export default router
