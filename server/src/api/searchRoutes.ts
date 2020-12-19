import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import auth from '../middlewares/auth'
import Follow from '../models/follow'
import User, { UserType } from '../models/user'

const router = Router()

// Recommend users to follow
router.get('/recommend', auth, async (req, res, next) => {
	try {
		const users = await User.find()

		const followedUsers = await Follow.find({ from: req.userId })
		const followedUserIds = followedUsers.map((follow) => String(follow.to))
		followedUserIds.push(String(req.userId))

		const filteredUsers = users.filter((user) => !followedUserIds.includes(String(user._id)))
		const response: UserType[] = []
		for (let i = 0; i < 5; i++) {
			response.push(filteredUsers.splice(Math.floor(Math.random() * filteredUsers.length), 1)[0])
			if (!filteredUsers.length) break
		}

		res.status(StatusCodes.OK).json(response)
	} catch (error) {
		next(error)
	}
})

export default router
