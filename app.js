
// ? This file is for setting my express app before I run it.
// ? With everything it needs. (Create and setup my express app)

import express from 'express'
import router from './views/router.js'

// ? The middleware
import logger from './middleware/logger.js' 
import errorHandler from './middleware/errorHandler.js'

// ! This lets express handle json POSTs
const app = express()

app.use(logger)

// ? Adding new routes to express
app.use(express.json())  // the parser that understand what json is and translates it to JS so that node can work with it
app.use('/api', router)
app.use(errorHandler)


export default app