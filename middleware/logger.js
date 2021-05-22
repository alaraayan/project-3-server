// ? This is our middleware for logging information about requests we get.

export default function logger(req, res, next) {

  console.log(`🤖 Incoming request ${req.method} for url ${req.url}`)

  // ! This will tell express the current middleware has finished.
  // ! Move to next one. If you don't call next then the request will hang
  next()
}