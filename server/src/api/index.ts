import { Router } from 'express'
import fleetRoutes from './fleetRoutes'
import userRoutes from './userRoutes'

const router = Router()

router.use('/user', userRoutes)
router.use('/fleet', fleetRoutes)

export default router
