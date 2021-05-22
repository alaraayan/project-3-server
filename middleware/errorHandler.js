export default function errorHandler(err, req, res, next) {
  console.log('🔥There was an error🔥')
  console.log(err.name)
  console.log(err)

  res.sendStatus(500)
  
  next(err)
}