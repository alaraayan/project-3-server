import express from 'express'
import userController from '../controllers/user.js'


const router = express.Router()





// ! User routes

// * Register 
router.route('/register')
  .post(userController.register)


// * Login
router.route('/login')
  .post(userController.login)


export default router