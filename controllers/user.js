import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'
import { UsernameExists, EmailExists, PasswordsNotMatching, UserInfoMissing } from '../lib/errors.js'

async function register(req, res, next) {
  try {
    const existingUsername = await User.findOne({ username: req.body.username })
    if (existingUsername){
      throw new UsernameExists
    }
    const existingEmail = await User.findOne({ email: req.body.email })
    if (existingEmail){
      throw new EmailExists
    }
    if (req.body.password !== req.body.passwordConfirmation) {
      throw new PasswordsNotMatching
    }
    if (!req.body.username || !req.body.email || !req.body.password || !req.body.passwordConfirmation) {
      throw new UserInfoMissing
    }
    const user = await User.create(req.body)

    res.status(201).json(user)
    console.log(user)

  } catch (err) {
    next(err)
  }
}

async function login(req, res, next) {
  try {
    
    const user = await User.findOne({ email: req.body.email })

    console.log(user)

    if (!user) {
      throw new Error
    }
    const isValidPassword = user.validatePassword(req.body.password)
    if (!isValidPassword) {
      throw new Error
    }
    const isAdmin = user.isAdmin
    const token = jwt.sign(
      { userId: user._id },
      secret,
      { expiresIn: '12h' }
    )
    console.log('Success')
    res.status(202).json({ message: 'Login successful', token, isAdmin })

  } catch (e) {
    next(encodeURIComponent)
  }
}

export default {
  register,
  login,
}