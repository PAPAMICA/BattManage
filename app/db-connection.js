import mongoose from 'mongoose'

const DB_HOST = process.env.DB_HOST
const DB_PORT = process.env.DB_PORT
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_NAME = process.env.DB_NAME

let closeConnection = false

const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export const connectToMongo = async (triesLeft = 5) => {
  if (closeConnection || triesLeft <= 0) {
    throw new Error('Impossible de se connecter au serveur MongoDB')
  }
  triesLeft--
  const mongoDbUri = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`

  try {
    console.log(`Trying to connect to MongoDB with: ${mongoDbUri}`)
    await mongoose.connect(mongoDbUri, { dbName: DB_NAME })
    console.log('Connected to MongoDB!')
  } catch (error) {
    if (triesLeft > 0) {
      console.log(`Could not connect to MongoDB: ${error.message}`)
      console.log(`Retrying (${triesLeft} tries left)`)
      await sleep(5000)
      return connectToMongo(triesLeft)
    }

    console.log(`Could not connect to MongoDB: ${error.message}`)
    console.log('Out of retries')
    error.message = `Out of retries, last error: ${error.message}`
    throw error
  }
}

export const closeConnections = () => {
  closeConnection = true
  try {
    mongoose.disconnect()
  } catch (error) {
    console.log(error)
  }
}
