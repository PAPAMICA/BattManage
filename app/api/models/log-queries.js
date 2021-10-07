import Log from './log-model.js'

export const getLogs = async () => {
  const logs = await Log.find({}).sort({ Date: -1 })
  return logs.map(log => log.toObject({ versionKey: false }))
}

export const getBatteryLogs = async (batteryId) => {
  const logs = await Log.find({ batteryId: batteryId }).sort({ Date: -1 })
  return logs.map(log => log.toObject({ versionKey: false }))
}

export const getLog = async (logId) => {
  const log = await Log.findOne({ _id: logId })
  return log
}

export const createLog = async (logData) => {
  const log = new Log(logData)
  await log.save()
  return log
}

export const updateLog = async (logData) => {
  const logId = logData._id
  // delete logData._id
  const log = await Log.findOneAndUpdate({ _id: logId }, logData)
  return log
}

export const deleteLog = async (logId) => {
  const log = await Log.deleteOne({ _id: logId })
  return log
}
