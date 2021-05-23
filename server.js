// ? The server to run express app.

import app from './app.js'
import connectToDb from './db/connectToDb.js'

async function startApp() {
  try {
    await connectToDb()
    console.log('Database has connected!')
    app.listen(4000, () => console.log('Express is now running'))
  } catch (e) {
    console.log('🥺 Something went wrong with running express')
    console.log(e)
  }
}

startApp()