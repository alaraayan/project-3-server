import Movie from '../models/movie.js'


async function create(req, res, next) {
  
  req.body.user = req.currentUser

  try {
    const movie = await Movie.findById(req.params.id)
      .populate('user')
      .populate('comments.user')

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
    console.log('grabbing params', movieId, commentId)
    const movieWithComment = await Movie.findById(movieId)
    console.log(movieWithComment)
    if (!movieWithComment) {
      return res.status(404).json({ message: 'movie not found' })
    }

    const comment = movieWithComment.comments.id(commentId)
    if (!comment) {
      return res.status(404).json({ message: 'comment not found' })
    }
    if (req.currentUser._id.equals(comment.user) || isAdmin === 'true'){
      comment.remove()
      await movieWithComment.save()
      
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