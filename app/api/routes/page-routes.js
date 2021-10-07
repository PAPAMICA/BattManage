import express from 'express'
import {
  homePageController,
  inventoryPageController,
  etiquettesPageController,
  addBatteryPageController,
  updateBatteryPageController,
  batteriesPageController,
  batteryPageController,
  getBatteryMiddleware,
  addBatteryMiddleware,
  updateBatteryMiddleware,
  deleteBatteryMiddleware,
} from '../controllers/page-controllers.js'
import {
  getBatteriesController,
  getBatteryController,
  addBatteryController,
  updateBatteryController,
  deleteBatteryController,
} from '../controllers/battery-controllers.js'

const router = new express.Router()

router.get('/', getBatteriesController, homePageController)
router.get('/inventory', getBatteriesController, inventoryPageController)
router.get('/etiquettes', getBatteriesController, etiquettesPageController)

router.get('/batteries/:id', getBatteriesController, getBatteryController, batteryPageController)
router.get('/batteries', getBatteriesController, batteriesPageController)
router.get('/new', addBatteryPageController)
router.get('/edit/:id', getBatteryController, updateBatteryPageController)

router.post('/getBattery', getBatteryMiddleware)
router.post('/addBattery', addBatteryController, addBatteryMiddleware)
router.post('/updateBattery/:id', updateBatteryController, updateBatteryMiddleware)
router.post('/deleteBattery/:id', deleteBatteryController, deleteBatteryMiddleware)

export default router
