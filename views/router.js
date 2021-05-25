import express from 'express'
import userController from '../controllers/user.js'
import movieController from '../controllers/movie.js'
import commentController from '../controllers/comment.js'
import moodController from '../controllers/mood.js'
import secureRoute from '../middleware/secureRoute.js'


const router = express.Router()

// ! Movie routes
// * Get movies, add a movie 
router.route('/movies')
  .get(movieController.index)
  .post(secureRoute, movieController.create)


// * Get/Delete/Edit a single movie
router.route('/moods/:moodId')
  .get(movieController.showMoviesByMood)

router.route('/movies/search')
  .get(movieController.search)
    
router.route('/movies/:id')
  .get(movieController.show)
  .delete(secureRoute, movieController.remove)
  .put(secureRoute, movieController.update)


// ! Mood routes
// * Add a mood
router.route('/movies/:id/mood')
  .post(secureRoute, moodController.create)

// * Delete a mood
router.route('/movies/:movieId/mood/:moodId')
  .delete(secureRoute, moodController.remove)


// ! User routes
// * Register 
router.route('/register')
  .post(userController.register)

// * Login
router.route('/login')
  .post(userController.login)

// ! Comment routes
// * Add a comment
router.route('/movies/:id/comment')
  .post(secureRoute, commentController.create)

// * Delete a comment
router.route('/movies/:movieId/comment/:commentId')
  .delete(secureRoute, commentController.remove)

  
export default router