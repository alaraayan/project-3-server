// moods need to have an id so they need to be an object?
// we need a moods model so that they can have an endpoint so that they can be listed/displayed on the front end
import mongoose from 'mongoose'

const moodSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  mood: { type: String, required: true },
})


export default mongoose.model('Mood', moodSchema)