import express from 'express'
import {
  getBatteriesController,
  getBatteryController,
  addBatteryController,
  updateBatteryController,
  deleteBatteryController,
} from '../controllers/battery-controllers.js'

const router = new express.Router()

router.get('/', getBatteriesController)
router.post('/', addBatteryController)
router.get('/:id', getBatteryController)
router.put('/:id', updateBatteryController)
router.delete('/:id', deleteBatteryController)

export default router
