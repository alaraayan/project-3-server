// moods need to have an id so they need to be an object?
// we need a moods model so that they can have an endpoint so that they can be listed/displayed on the front end
import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'


const moodSchema = new mongoose.Schema({
  moods: { type: String, required: true, unique: true },
})

// function validator(array) {
//   return array.length > 1
// }

// const moodSchema = new mongoose.Schema({
//   mood: { type: String, required: true, unique: true, validate: [validator, 'Please add at least one mood'] },
// })


moodSchema.plugin(uniqueValidator)
export default mongoose.model('Mood', moodSchema)