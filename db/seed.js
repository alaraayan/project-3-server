import mongoose from 'mongoose'
import connectToDb from './connectToDb.js'
// ? import the models
import User from '../models/user.js'
import Movie from '../models/movie.js'

// ? import the data
import userData from './data/users.js'

// ? import fs (file system) from node.js
import fs from 'fs'



async function seedDatabase() {

  try {
    // waiting for the connection to mongoDB
    await connectToDb()
    console.log('Successfully connected to mongo')

    // clear the database every time it's seeded
    await mongoose.connection.db.dropDatabase()


    // taking the data from movies.json, using fs.readFileSync and parsing it to JS
    const seedDataBuffer = fs.readFileSync('./db/data/movies.json')
    const seedData = JSON.parse(seedDataBuffer)
    const movies = await Movie.create(seedData)
    console.log(`🤖 ${movies.length} movies added to the database!`)
  

    // Seed with users
    const users = await User.create(userData)
    console.log(`🤖 ${users.length} users created!`)
    console.log(users)

    await mongoose.connection.close()
    console.log('🤖 Disconnected from mongo. All done!')

  } catch (e) {
    console.log('🤖 Something went wrong')
    console.log(e)
    await mongoose.connection.close()
  }

}
seedDatabase()