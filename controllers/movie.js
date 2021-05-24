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
    const movie = await Movies.findById(id).populate('user')
    console.log(movie)
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

async function update(req, res, next) {

  try {
    const isAdmin = req.currentUser.isAdmin
    const movie = await Movies.findById(req.params.id)

    if (!movie) {
      console.log('404 Movie not found')
    }

    if (isAdmin === 'false' ) {
      return res.status(401).json({ message: 'Only admin users can edit a movie' })
    }

    movie.set(req.body)
    movie.save()

    res.status(202).json(movie)
  } catch (e) {
    next(e)
  }
}

//* DELETE A MOVIE

async function remove(req, res, next) {
  try {
    const isAdmin = req.currentUser.isAdmin
    // console.log('isAdmin', isAdmin)
    const movie = await Movies.findById(req.params.id)

    if (!movie) {
      console.log('404 Movie not found')
    }

    if (isAdmin === 'false' ) {
      return res.status(401).json({ message: 'Only admin users can remove a movie' })
    }
    await movie.deleteOne()

    res.status(204).json(isAdmin)

  } catch (e) {
    next(e)
  }
}

//* ADD A MOOD

//* GET ALL MOVIES WITH SAME MOOD

//* SEARCH A MOOD

//*SEARCH A MOVIE








export default {
  index,
  create,
  show,
  remove,
  update,
}