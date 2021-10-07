import mongoose from 'mongoose'

const { Schema } = mongoose
const ObjectId = Schema.Types.ObjectId

const LogSchema = new Schema({
  date: {
    type: Date,
  },
  batteryId: {
    type: ObjectId,
  },
  batteryName: {
    type: String,
  },
  action: {
    type: String,
  },
  message: {
    type: String,
  },
})

export default mongoose.model('Log', LogSchema, 'logs')
