import express from 'express'
import storageRoutes from '../api/storage/routes.js'

const router = express.Router()

router.use('/storage', storageRoutes)

export default router
