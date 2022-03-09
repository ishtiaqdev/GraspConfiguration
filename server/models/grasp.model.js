import mongoose from 'mongoose'

const GraspSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  fingerWidth: {
    type: String,
    trim: true,
    required: 'Finger Width is required'
  },
  fingerHeight: {
    type: String,
    trim: true,
    required: "Finger Height is required"
  },
  fingerStroke: {
    type: String,
    trim: true,
    required: "Finger Stroke is required"
  },
  graspImage: {
    data: Buffer,
    contentType: String
  },
  created: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Grasp', GraspSchema)
