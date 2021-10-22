
import fs from 'fs'
import path from 'path'
import QRCode from 'qrcode'
import { template } from '../utils/template.js'
import {
  getLogs,
  getBatteryLogs,
} from '../models/log-queries.js'

const URL = process.env.URL
const __dirname = path.resolve()

export const homePageController = async (req, res) => {
  try {
    const batteries = req.body.batteries
    const logs = await getLogs()
    const b4S = batteries.filter(batterie => batterie.cells === '4S')
    const b6S = batteries.filter(batterie => batterie.cells === '6S')
    const storage = batteries.filter(batterie => batterie.status === 'Storage').length
    const charged = batteries.filter(batterie => batterie.status === 'Charged').length
    const hs = batteries.filter(batterie => batterie.status === 'Out of service').length
    const used = batteries.filter(batterie => batterie.status === 'Used').length

    res.render('index', { b4S, b6S, logs, storage, charged, hs, used })
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const inventoryPageController = async (req, res) => {
  try {
    const batteries = req.body.batteries
    res.render('inventory', { batteries, URL })
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const etiquettesPageController = async (req, res) => {
  try {
    const batteries = req.body.batteries
    res.render('etiquettes', { batteries, URL })
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const addBatteryPageController = async (req, res) => {
  try {
    res.render('add-battery')
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const updateBatteryPageController = async (req, res) => {
  try {
    const battery = req.body.battery
    res.render('update-battery', { battery })
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const batteriesPageController = async (req, res) => {
  try {
    const batteries = req.body.batteries
    res.render('batt-informations', { batteries })
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const batteryPageController = async (req, res) => {
  try {
    const batteries = req.body.batteries
    const battery = await req.body.battery

    const logs = await getBatteryLogs(battery._id)
    res.render(`./batteries/${battery._id}`, { logs, batteries, battery })
  } catch (err) {
    console.log(err)
    throw err
  }
}

export const getBatteryMiddleware = async (req, res) => {
  const batteryId = req.body._id
  res.redirect(`/batteries/${batteryId}`)
}

export const addBatteryMiddleware = async (req, res) => {
  const battery = req.body.battery

  const batteriesDir = './client/website/batteries/'
  const qrcodeDir = './client/public/assets/qrcode/'
  if (!fs.existsSync(batteriesDir)) {
    fs.mkdirSync(batteriesDir)
  }
  if (!fs.existsSync(qrcodeDir)) {
    fs.mkdirSync(qrcodeDir)
  }

  const qrCodeText = `${URL}/batteries/${battery._id}`
  const src = path.join(__dirname, `/client/public/assets/qrcode/${battery._id}.png`)
  const stream = fs.createWriteStream(src)
  await QRCode.toFileStream(stream, qrCodeText)
  const pagejs = template(battery)
  fs.writeFile(path.join(__dirname, `/client/website/batteries/${battery._id}.ejs`), pagejs, (err) => {
    console.log(err)
  })

  res.redirect('/inventory')
}

export const updateBatteryMiddleware = async (req, res) => {
  const batteryId = req.params.id

  if (req.headers.referer.includes('/inventory')) {
    res.redirect('/inventory')
    return
  }
  res.redirect(`/batteries/${batteryId}`)
}

export const deleteBatteryMiddleware = async (req, res) => {
  const batteryId = req.params.id

  fs.unlink(`website/batteries/${batteryId}.ejs`, (err) => {
    console.log(err)
  })
  fs.unlink(`public/assets/qrcode/${batteryId}.png`, (err) => {
    console.log(err)
  })

  res.redirect('/inventory')
}
