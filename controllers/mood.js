import Movie from '../models/movie.js'
import Mood from '../models/mood.js'
import { NotFound } from '../lib/errors.js'

async function index(req, res, next) {
  try {
    const moods = await Mood.find()
    if (!moods) {
      throw new NotFound('Emotional crisis! I can\'t locate that mood!')
    }

    res.status(200).json(moods)
  } catch (err) {
    next(err)
  }
} 

async function create(req, res, next) {
  
  req.body.user = req.currentUser

  try {
    const movie = await Movie.findById(req.params.id)
      .populate('user')
      .populate('moods.mood.mood.mood')
    if (!movie) {
      throw new NotFound('Oh dear, I cannot find the movie to add this mood')
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
    const movie = await Movie.findById(movieId)
  
    if (!movie) {
      return res.status(404).json({ message: 'movie not found' })
    }

    const mood = movie.moods.id(moodId)
    if (!mood) {
      throw new NotFound('Feeling moody, mood not found')
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
  index,
}