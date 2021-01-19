import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getManager } from 'typeorm'
import User from '../entity/User'
import auth from '../middlewares/auth'

const router = Router()

// Recommend users to follow
router.get('/recommend', auth, async (req, res, next) => {
	try {
		const users = await User.find()

		const currentUser = await getManager()
			.getRepository(User)
			.createQueryBuilder('user')
			.where('user.id = :id', { id: req.userId })
			.leftJoinAndSelect('user.following', 'following')
			.leftJoinAndSelect('following.from', 'from')
			.leftJoinAndSelect('following.to', 'to')
			.getOne()

		const followedUsers = currentUser?.following
		const followedUserIds = followedUsers?.map((follow) => String(follow.to.id)) || []
		followedUserIds.push(String(req.userId))

		const filteredUsers = users.filter((user) => !followedUserIds.includes(String(user.id)))

		const response: User[] = []
		for (let i = 0; i < 5; i++) {
			if (!filteredUsers.length) break
			response.push(filteredUsers.splice(Math.floor(Math.random() * filteredUsers.length), 1)[0])
		}

		res.status(StatusCodes.OK).json(response)
	} catch (error) {
		next(error)
	}
})

export default router
