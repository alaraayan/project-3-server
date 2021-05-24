import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { secret } from '../config/environment.js'

export default function secureRoute(req, res, next) {

  // * 1) Check the token
  const rawToken = req.headers.authorization
  // ? Simple checks to make sure we've got something sensible..
  if (!rawToken || !rawToken.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Unauthorized ' })
  }
  // ? Clean up the token, by removing 'Bearer '
  const token = rawToken.replace('Bearer ', '')
  console.log(token)

  // * 2) Verify the token
  jwt.verify(token, secret, async (err, payload) => {
    // I can write code in here to check if there's an error, and also to look at my payload.
    if (err) {
      return res.status(401).json({ message: 'Unauthorized ' })
    }
    // ? If we get this far, we MUST have a valid token.

    // * 3) Get the user using our payload.userId, and stick the user on the request. (Object level permissions)
    // ? Check this user exists
    const user = await User.findById(payload.userId)
    // ? In no user, unauthorized
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized ' })
    }
    // ? Add the user to our request
    req.currentUser = user

    next()
  })
}