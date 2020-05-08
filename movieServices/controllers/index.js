const { Movie } = require('../models')
class MoviesController {
  static createMovie(req, res, next) {
    Movie.createMovie(req.body)
      .then(result => {
        res.status(201).json(result.ops)
      })
      .catch(err => {
        res.status(500).json(err)
      })

  }

  static findAllMovies(req, res, next) {
    Movie.findAllMovies()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static findMovieById(req, res, next) {
    Movie.findMovieById(req.params.id)
      .then(result => {
        if(!result) {
          throw res.status(404).json({message: 'Movie not found'})
        }
        res.status(200).json(result)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static updateMovieById(req, res, next) {
    let {id} = req.params
    Movie.findMovieById(id)
      .then(isFound => {
        if(isFound) {
          return Movie.updateMovieById(id, req.body)
        }
        throw res.status(404).json({message: 'Movie not found'})
      })
      .then(() => {
        return Movie.findMovieById(req.params.id)
      })
      .then(updatedMovie => {
        res.status(200).json(updatedMovie)
      })

      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteMovieById(req, res, next) {
    let {id} = req.params
    Movie.findMovieById(id)
      .then(isFound => {
        if(isFound) {
          return Movie.deleteMovieById(req.params.id)
        }
        throw res.status(404).json({message: 'Movie not found'})
      })
      .then(result => {
        res.status(200).json({message: 'delete successfully'})
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = MoviesController