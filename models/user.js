import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = new  Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
})

// ! To add: Password hashing/encryption
// ! password validation
// ! password confirmation

// 

export default mongoose.model('User', userSchema)