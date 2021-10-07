import mongoose from 'mongoose'

const { Schema } = mongoose
const ObjectId = Schema.Types.ObjectId

const BatterySchema = new Schema({
  name: {
    type: String,
  },
  cells: {
    type: String,
    enum: [
      '6S',
      '4S',
    ],
  },
  technology: {
    type: String,
    enum: [
      'LiPo',
      'LiOn',
    ],
  },
  status: {
    type: String,
    enum: [
      'Storage',
      'Charged',
      'Used',
      'Out of service',
    ],
  },
  capacity: {
    type: Number,
  },
  efficiency: {
    type: Number,
  },
  brand: {
    type: String,
  },
  buyDate: {
    type: Date,
  },
  cycles: {
    type: Number,
  },
  bId: {
    type: ObjectId,
  },
  lastUsageDate: {
    type: Date,
  },
  resistance: {
    type: Number,
  },
})

export default mongoose.model('Battery', BatterySchema, 'batteries')
