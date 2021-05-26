import axios from 'axios'
//import fs from 'fs'

import initialSeedData from './lib/moviesWithMoods.js'

const baseUrl = 'http://www.omdbapi.com/?apikey=1874d202&plot=full&i='

function format(string) {
  return string.split(',').map(str => str.trim())
}

async function getSeedData() {
  const allFilms = []
  for (const movie of initialSeedData) {
    const { data } = await axios.get(baseUrl + movie.imdb)
    const movieWithMoods = { ...data, ...movie }
    allFilms.push(movieWithMoods)
  }

  const mappedFilms = allFilms.map(film => ({
    imdb: film.imdb,
    title: film.Title,
    year: film.Year,
    rated: film.Rated,
    released: film.Released,
    runtime: film.Runtime,
    genres: format(film.Genre),
    director: format(film.Director),
    actors: format(film.Actors),
    plot: film.Plot,
    language: format(film.Language),
    poster: film.Poster,
    ratings: film.Ratings.map(rating => ({
      source: rating.Source,
      value: rating.Value,
    })),
    moods: film.moods,
  }))

  //fs.writeFileSync('./db/data/movies.json', JSON.stringify(mappedFilms))
  console.log(mappedFilms)
  return mappedFilms
}


export default getSeedData