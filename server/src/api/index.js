import { Router } from 'express'
import userRoutes from './userRoutes'
import tweetRoutes from './tweetRoutes'

const router = Router()

router.use('/user', userRoutes)
router.use('/tweet', tweetRoutes)

export default router
