import mongoose from 'mongoose'
import { dbURL } from '../config/environment.js'

// Do the connecting
export default function connectToDb() {
//giving mongoose some options that we don't really care about
// they remove the warnings
  const options = {
    newUserParser: true,
    useCreate: true,
    useUnifiedTopology: true,
  }
  // This is a really important line:
  // mongoose.connect returns a PROMISE
  return mongoose.connect(dbURL, options)

}