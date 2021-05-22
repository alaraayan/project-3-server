
import mongoose from 'mongoose'


// ? Embedded Schema
const movieMoodSchema = new mongoose.Schema({
  mood: { type: mongoose.Schema.ObjectId, ref: 'Mood', required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true,
})


// ? Movie Schema
const movieSchema = mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  rated: { type: String, required: true },
  released: { type: String, required: true },
  runtime: { type: String, required: true },
  genres: {  type: [String], required: true },
  director: { type: String, required: true },
  actors: { type: [String], required: true },
  plot: { type: String, required: true },
  poster: { type: String, required: true },
  ratings: [{
    source: { type: String, required: true },
    value: { type: String, required: true },
  }],
  source: { type: String, required: true },
  value: { type: String, required: true },
  // need to check the above is right for displaying the ratings, have a feeling it won't be!
  // ? I think this below is our embedded/referenced data for the movieMoodSchema
  moods: [movieMoodSchema],
})



export default mongoose.model('Movie', movieSchema)