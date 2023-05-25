import express from 'express'
import { list, upload } from './controller.js'

const router = express.Router()

router.get('/list', list)
router.post('/upload', upload)

export default router
