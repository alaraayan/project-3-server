import Movie from '../models/movie.js'
import Mood from '../models/mood.js'


async function create(req, res, next) {
  
  req.body.user = req.currentUser

  try {
    const movie = await Movie.findById(req.params.id)
    // console.log(movie.moods)
    if (!movie) {
      console.log('404 Not Found')
    }
    const matchedMood = await Mood.findOne({ mood: req.body.mood })
    movie.moods.push({ 
      mood: matchedMood,
      user: req.currentUser,
    })
    const savedAndUpdatedMovie = await movie.save()

    res.send(savedAndUpdatedMovie)
  } catch (e) {
    next(e)
  }
}

async function remove(req,res, next) {
  
  try {
    const { movieId, moodId } = req.params
    const isAdmin = req.currentUser.isAdmin
    // console.log('grabbing params', movieId, moodId)
    const movie = await Movie.findById(movieId)
    // console.log(movie)
    if (!movie) {
      return res.status(404).json({ message: 'movie not found' })
    }

    const mood = movie.moods.id(moodId)
    if (!mood) {
      return res.status(404).json({ message: 'mood not found' })
    }
    
    if (req.currentUser._id.equals(mood.user) || isAdmin === 'true'){
      mood.remove()
      await movie.save()
      return res.sendStatus(204)
    }

    res.status(401).send({ message: 'Unauthorized' })
    
  } catch (e) {
    next(e)
  }
}

export default {
  create,
  remove,
}