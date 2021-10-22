import routes from './api/routes/index.js'
import express from 'express'
import { connectToMongo } from './db-connection.js'

const port = process.env.API_PORT
const app = express()

app.use(express.static('./client/public'))
app.use(express.urlencoded({ extended: false }))
app.use(routes)

app.set('view engine', 'ejs')
app.set('views', './client/website')

const startServer = () => {
  try {
    connectToMongo()
  } catch (err) {
    console.log(err)
    throw err
  }
  app.listen(port || 4000, function () {
    console.log('Server started !')
  })
}

startServer()
