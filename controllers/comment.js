import Movie from '../models/movie.js'


async function create(req, res, next) {
  
  req.body.user = req.currentUser

  try {
    const movie = await Movie.findById(req.params.id)
      .populate('user')
      .populate('comments.user')
      .populate('moods.mood')

    if (!movie) {
      console.log('404 Not Found')
    }
    movie.comments.push(req.body)
    const savedAndUpdatedMovie = await movie.save()

    res.send(savedAndUpdatedMovie)
  } catch (e) {
    next(e)
  }
}

async function remove(req,res, next) {
  try {
    const { movieId, commentId } = req.params
    const isAdmin = req.currentUser.isAdmin
    const movie = await Movie.findById(movieId)
    
    const comment = movie.comments.id(commentId)
    
    if (req.currentUser._id.equals(comment.user) || isAdmin === 'true'){
      comment.remove()
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