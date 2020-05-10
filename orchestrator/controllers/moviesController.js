const axios = require("axios");
const baseUrl = "http://localhost:3001/movies/";

class MoviesController {
  static createMovie(req, res, next) {
    axios({
      method: "post",
      url: baseUrl,
      data: req.body,
    })
      .then((result) => {
        res.status(201).json(result.data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static findAllMovies(req, res, next) {
    axios({
      method: "get",
      url: baseUrl,
    })
      .then((result) => {
        res.status(200).json(result.data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static findMovieById(req, res, next) {
    axios({
      method: "get",
      url: baseUrl + req.params.id,
    })
      .then((result) => {
        if (!result) {
          throw res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(result.data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static updateMovieById(req, res, next) {
    axios({
      method: "put",
      url: baseUrl + req.params.id,
      data: req.body,
    })
      .then((updatedMovie) => {
        res.status(200).json(updatedMovie.data);
      })

      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static deleteMovieById(req, res, next) {
    axios({
      method: "delete",
      url: baseUrl + req.params.id,
    })
      .then((result) => {
        res.status(200).json({ message: "delete successfully" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = MoviesController;
