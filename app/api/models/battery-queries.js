import Batterie from './battery-model.js'

export const getBatteries = async () => {
  const batteries = await Batterie.find({})
  return batteries.map(battery => battery.toObject({ versionKey: false }))
}

export const getBattery = async (batteryId) => {
  const battery = await Batterie.findOne({ _id: batteryId })
  return battery
}

export const getBatteryByName = async (batteryName) => {
  const battery = await Batterie.findOne({ name: batteryName })
  return battery
}

export const createBattery = async (batteryData) => {
  const battery = new Batterie(batteryData)
  await battery.save()
  return battery.toObject({ versionKey: false })
}

export const updateBattery = async (batteryData) => {
  const batteryId = batteryData._id
  const battery = await Batterie.findOneAndUpdate({ _id: batteryId }, batteryData, { new: true })
  return battery
}

export const deleteBattery = async (batteryId) => {
  const battery = await Batterie.deleteOne({ _id: batteryId })
  return battery
}
