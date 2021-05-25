import express from 'express'
import userController from '../controllers/user.js'
import movieController from '../controllers/movie.js'
import secureRoute from '../middleware/secureRoute.js'

const router = express.Router()

// ! Movie routes

router.route('/movies')
  .get(movieController.index)
  .post(secureRoute, movieController.create)
  
router.route('/movies/search')
  .get(movieController.search)
    
router.route('/movies/:id')
  .get(movieController.show)
  .delete(secureRoute, movieController.remove)
  .put(secureRoute, movieController.update)


// ! User routes

// * Register 
router.route('/register')
  .post(userController.register)

// * Login
router.route('/login')
  .post(userController.login)


export default router