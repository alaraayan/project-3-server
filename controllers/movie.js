
import Movie from '../models/movie.js'
import Mood from '../models/moods.js'

//* GET ALL MOVIES
async function index(req,res) {
  const moviesList = await Movie.find()
  res.status(200).json(moviesList)
}

//* GET A MOVIE

async function show (req, res, next) {
  try {
    const id = req.params.id
    const movie = await Movie.findById(id)

    res.status(200).json(movie)
  } catch (e) {
    next(e)
  }
}

//* ADD A MOVIE

async function create(req, res, next) {
  try {
    req.body.moods = await Promise.all(req.body.moods.map(async (moodString) => {
      const matchedMood = await Mood.findOne({ mood: moodString })
    
      return { 
        mood: matchedMood,
        user: req.currentUser,
      }
    }))
  
    const newMovie = await Movie.create(req.body)
    res.status(201).json(newMovie)
  } catch (e) {
    next(e)
  }
}


//* UPDATE A MOVIE

//* DELETE A MOVIE

//* ADD A MOOD

//* GET ALL MOVIES WITH SAME MOOD


//* SEARCH A MOOD

//* SEARCH A MOVIE
async function search(req, res, next) {
  try {
    const searchParams = { 
      ...req.query, 
      title: new RegExp(req.query.title, 'i'),
      director: new RegExp(req.query.director, 'i'),
      genres: new RegExp(req.query.genres, 'i'),
      actors: new RegExp(req.query.actors, 'i'),
      language: new RegExp(req.query.language, 'i'),
      plot: new RegExp(req.query.plot, 'i'),
    } 

    const movieList = await Movie.find(searchParams)
    console.log(searchParams)
    res.status(200).json(movieList)
  } catch (e) {
    next(e)
  }
}








export default {
  index,
  create,
  show,
  search,
}