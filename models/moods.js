// moods need to have an id so they need to be an object?

const moodSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  mood: { type: String, required: true},
})