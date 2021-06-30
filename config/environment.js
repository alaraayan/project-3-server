// ? Environment variables, that I want to use in different places.

// ? Here is my database URL:
// ? Luckily I don't need the port number! I can do this..
// export const dbURL = 'mongodb://localhost/moodflixdb'

// export const secret = 'stringofrandomwords'

import dotenv from 'dotenv'
dotenv.config()

export const dbURI =
  process.env.DB_URI || 'mongodb://localhost/moodflixdb'
export const port = process.env.PORT || 4000
export const secret = process.env.SECRET || 'stringofrandomwords'