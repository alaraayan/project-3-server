import mongoose from 'mongoose'
import connectToDb from './connectToDb.js'
import User from '../models/user.js'
import usersData from './data/users.js'

async function seedDatabase() {
  try {
    await connectToDb()
    console.log('connected to mongo')

    await mongoose.connection.db.dropDatabase()
    console.log('Removed everything')

    const users = await User.create(usersData)
    console.log(`${users.length} new users created!`)
    console.log(users)

    await mongoose.connection.close()
    console.log('🤖 Disconnected from mongo. All done!')
  } catch (err) {
    console.log('there is an error with seeding')
    console.log(err)
    await mongoose.connection.close()
  }
}

seedDatabase()