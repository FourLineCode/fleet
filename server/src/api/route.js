import { Router } from 'express'

const router = Router()

router.get('/', (req, res, next) => {
	try {
		res.send({ message: 'Welcome to API' })
	} catch (error) {
		next(error)
	}
})

export default router
