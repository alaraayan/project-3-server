import Movies from '../models/movie.js'

//* GET ALL MOVIES
async function index(req,res) {
  const moviesList = await Movies.find()
  res.status(200).json(moviesList)
}

//* GET A MOVIE

async function show (req, res, next) {
  try {
    const id = req.params.id
    const movie = await Movies.findById(id)

    res.status(200).json(movie)
  } catch (e) {
    next(e)
  }
}

//* ADD A MOVIE

async function create(req, res, next) {
  req.body.user = req.currentUser
  
  try {
    const newMovie = await Movies.create(req.body)
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

//*SEARCH A MOVIE








export default {
  index,
  create,
  show,
}