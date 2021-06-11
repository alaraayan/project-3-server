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
    movie.moods.push(req.body)
    await movie.save()

    res.status(202).json(movie)

  } catch (e){
    console.log(e)
  }
  
}

async function remove(req, res, next) {
  
  
  try {
    const { movieId, moodId } = req.params
    console.log('movideID', movieId)
    console.log('moodId', moodId)
    
    const movie = await Movie.findById(movieId)
    
    const mood = movie.moods.id(moodId)
    console.log('mood object', mood)
    // console.log('isAdmin', isAdmin)
    // if (req.currentUser._id.equals(mood.user) || isAdmin === 'true'){
    mood.remove()
    await movie.save()
    console.log('movie new', movie)
    res.sendStatus(204)
  } catch (e) {
    console.log(e)  
  }
}

export default {
  create,
  remove,
  index,
}

