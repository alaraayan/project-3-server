import axios from 'axios'
//import fs from 'fs'

import initialSeedData from './lib/moviesWithMoods.js'

const baseUrl = 'http://www.omdbapi.com/?apikey=1874d202&plot=full&i='

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
    genres: film.Genre,
    director: film.Director,
    actors: film.Actors,
    plot: film.Plot,
    language: film.Language,
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