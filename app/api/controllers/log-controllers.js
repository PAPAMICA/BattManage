import {
  getLogs,
  getLog,
  createLog,
  updateLog,
  deleteLog,
} from '../models/log-queries.js'

export const addLogController = async (req, res, next) => {
  try {
    const log = req.body
    const updatedLog = await createLog(log)

    if (req.originalUrl && req.originalUrl.includes('/api')) {
      res.status(200).json(updatedLog)
      return
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const updateLogController = async (req, res, next) => {
  try {
    const log = req.body
    const updatedLog = await updateLog(log)

    if (req.originalUrl && req.originalUrl.includes('/api')) {
      res.status(200).json(updatedLog)
      return
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const getLogsController = async (req, res, next) => {
  try {
    const logs = await getLogs()

    if (req.originalUrl && req.originalUrl.includes('/api')) {
      res.status(200).json(logs)
      return
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const getLogController = async (req, res, next) => {
  try {
    const logId = req.params.id
    const log = await getLog(logId)

    if (req.originalUrl && req.originalUrl.includes('/api')) {
      res.status(200).json(log)
      return
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const deleteLogController = async (req, res, next) => {
  try {
    const logId = req.params.id
    const log = await deleteLog(logId)

    if (req.originalUrl && req.originalUrl.includes('/api')) {
      res.status(200).json(log)
      return
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}
