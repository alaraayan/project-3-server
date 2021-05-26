// ? The error handling middleware that catches any errors.

// ? Error handling has an additional first arg, for the error
export default function errorHandler(err, req, res, next) {
  console.log('🔥There was an error🔥')
  console.log(err.name)
  console.log(err)

  // ? Specific error handling, for certain kinds of errors.
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid parameter given' })
  }
  // ? Not found errors..
  if (err.name === 'NotFound' || err.name === 'UnableToDelete') {
    return res.status(404).json({ message: 'Not found' })
  }

  if (err.name === 'AlreadyExists') {
    return res.status(400).json({ message: 'This movie already exists in the Moodflix database' })
  }

  // ? Is valid errors..
  if (err.name === 'NotValid' || err.name === 'NotOwner') {
    return res.status(400).json({ message: 'There was a problem.' })
  }
  
  // ? A bit of logic for returning nice validation errors
  if (err.name === 'ValidationError') {
    console.log(err.name)
    const errors = {}
  
    for (const key in err.errors) {
      errors[key] = err.errors[key].message
    }
  
    return res.status(422).json({
      message: 'Form Validation Error',
      errors,
    })
  }
  
  // ? 500 means internal server error
  res.sendStatus(500)
  // ? call the next function
  next(err)
}