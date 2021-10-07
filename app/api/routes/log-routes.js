import express from 'express'
import {
  getLogsController,
  getLogController,
  addLogController,
  updateLogController,
  deleteLogController,
} from '../controllers/log-controllers.js'

const router = new express.Router()

router.get('/', getLogsController)
router.post('/', addLogController)
router.get('/:id', getLogController)
router.put('/:id', updateLogController)
router.delete('/:id', deleteLogController)

export default router
