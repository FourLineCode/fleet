import { Router } from 'express'
import fleetRoutes from './fleetRoutes'
import followRoutes from './followRoutes'
import userRoutes from './userRoutes'

const router = Router()

router.use('/user', userRoutes)
router.use('/fleet', fleetRoutes)
router.use('/follow', followRoutes)

export default router
