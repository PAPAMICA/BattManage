import {
  getBatteries,
  getBattery,
  createBattery,
  updateBattery,
  deleteBattery,
} from '../models/battery-queries.js'
import {
  createLog,
} from '../models/log-queries.js'

export const addBatteryController = async (req, res, next) => {
  try {
    const battery = req.body
    const updatedBattery = await createBattery(battery)

    const log = {
      date: new Date().toISOString(),
      batteryId: updatedBattery._id,
      batteryName: updatedBattery.name,
      action: 'Battery added !',
      message: '',
    }
    await createLog(log)

    if (req.originalUrl && req.originalUrl.includes('/api')) {
      res.status(200).json(updatedBattery)
      return
    }
    req.body.battery = updatedBattery
    next()
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const updateBatteryController = async (req, res, next) => {
  try {
    const batteryId = req.params.id
    const batteryData = req.body
    let battery = {
      _id: batteryId,
      ...req.body,
    }

    let action = 'Battery edited manually !'
    if (batteryData.status) {
      action = `Status change to : ${batteryData.status}`

      if (batteryData.status === 'Charged') {
        battery = {
          ...battery,
          $inc: { cycles: 1 },
        }
      }
      if (batteryData.status === 'Used') {
        battery = {
          ...battery,
          lastUsageDate: new Date(),
        }
      }
    }
    const updatedBattery = await updateBattery(battery)

    const log = {
      date: new Date().toISOString(),
      batteryId: updatedBattery._id,
      batteryName: updatedBattery.name,
      action,
      message: '',
    }
    await createLog(log)

    if (req.originalUrl && req.originalUrl.includes('/api')) {
      res.status(200).json(updatedBattery)
      return
    }
    next()
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const getBatteriesController = async (req, res, next) => {
  try {
    const batteries = await getBatteries()

    if (req.originalUrl && req.originalUrl.includes('/api')) {
      res.status(200).json(batteries)
      return
    }
    req.body.batteries = batteries
    next()
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const getBatteryController = async (req, res, next) => {
  try {
    const batteryId = req.params.id
    const battery = await getBattery(batteryId)

    if (req.originalUrl && req.originalUrl.includes('/api')) {
      res.status(200).json(battery)
      return
    }
    req.body.battery = battery
    next()
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const deleteBatteryController = async (req, res, next) => {
  try {
    const batteryId = req.params.id
    const battery = await getBattery(batteryId)
    await deleteBattery(batteryId)

    const log = {
      date: new Date().toISOString(),
      batteryId: batteryId,
      batteryName: battery.name,
      action: 'Battery deleted !',
      message: '',
    }
    await createLog(log)

    if (req.originalUrl && req.originalUrl.includes('/api')) {
      res.status(200).json(battery)
      return
    }
    next()
  } catch (err) {
    console.log(err)
    throw err
  }
}
