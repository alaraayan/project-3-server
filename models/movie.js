
import mongoose from 'mongoose'


// ? Embedded Schema
const movieMoodSchema = new mongoose.Schema({
  mood: { type: mongoose.Schema.ObjectId, ref: 'Mood', required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
})
const ratingsSchema = new mongoose.Schema({
  source: { type: String, required: true },
  value: { type: String, required: true },
})


// ? Movie Schema
const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  rated: { type: String, required: true },
  released: { type: String, required: true },
  runtime: { type: String, required: true },
  genres: {  type: [String], required: true },
  director: { type: [String], required: true },
  actors: { type: [String], required: true },
  plot: { type: String, required: true },
  language: { type: [String], required: true },
  poster: { type: String, required: true },
  ratings: [ratingsSchema],
  moods: { type: [String], required: true },
})
//console.log(movieMoodSchema)


export default mongoose.model('Movie', movieSchema)