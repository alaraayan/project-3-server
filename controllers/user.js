import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

async function register(req, res, next) {
  try {
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

    const token = jwt.sign(
      { userId: user._id },
      secret,
      { expiresIn: '12h' }
    )
    console.log('Success')
    res.status(202).json({ message: 'Login successful', token })

  } catch (err) {
    next(err)
  }
}

export default {
  register,
  login,
}