const { getDatabase } = require('../config/config')
const Movies = getDatabase().collection('Movies')
const { ObjectId } = require('mongodb')

class Movie {
  static createMovie(newMovie) {
    return Movies.insertOne(newMovie)
  }

  static findAllMovies() {
    return Movies.find().toArray()
  }

  static findMovieById(movieId) {
    return Movies.findOne({_id: ObjectId(movieId)})
  }

  static updateMovieById(movieId, newData) {
    return Movies.updateOne({ _id: ObjectId(movieId) }, { $set: newData })
  }

  static deleteMovieById(movieId) {
    return Movies.deleteOne({ _id: ObjectId(movieId) })
  }
}

module.exports = Movie