import app from './app.js'
import connectToDb from './db/connectToDb.js'


async function startApp() {
  try {
    await connectToDb()
    console.log('Database has connected!')
    app.listen(4000, () => console.log('Express is now running'))
  } catch (err) {
    console.log('🥺 Something went wrong')
    console.log(err)
  }
}

startApp()