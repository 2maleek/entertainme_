const axios = require("axios");
const baseUrl = "http://localhost:3002/tvseries/";

class TvSeriesController {
  static createTvSerie(req, res, next) {
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

  static findAllTvSeries(req, res, next) {
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

  static findTvSerieById(req, res, next) {
    axios({
      method: "get",
      url: baseUrl + req.params.id,
    })
      .then((result) => {
        if (!result) {
          throw res.status(404).json({ message: "Tv Serie not found" });
        }
        res.status(200).json(result.data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static updateTvSerieById(req, res, next) {
    axios({
      method: "put",
      url: baseUrl + req.params.id,
      data: req.body,
    })
      .then((updatedTvSerie) => {
        res.status(200).json(updatedTvSerie.data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static deleteTvSerieById(req, res, next) {
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

module.exports = TvSeriesController;
