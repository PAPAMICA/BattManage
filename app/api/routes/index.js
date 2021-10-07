import express from 'express'
import batteriesRouter from './battery-routes.js'
import pagesRouter from './page-routes.js'
import logsRouter from './log-routes.js'

const router = new express.Router()

router.use('/api/batteries', batteriesRouter)
router.use('/api/logs', logsRouter)
router.use('/', pagesRouter)

export default router
