const { TvSerie } = require("../models");

class TvSeriesController {
  static createTvSerie(req, res, next) {
    TvSerie.createTvSerie(req.body)
      .then(result => {
        res.status(201).json(result.ops[0]);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }

  static findAllTvSeries(req, res, next) {
    TvSerie.findAllTvSeries()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }

  static findTvSerieById(req, res, next) {
    TvSerie.findTvSerieById(req.params.id)
      .then(result => {
        if (!result) {
          throw res.status(404).json({ message: "Tv Serie not found" });
        }
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }

  static updateTvSerieById(req, res, next) {
    let { id } = req.params;
    TvSerie.findTvSerieById(id)
      .then(isFound => {
        if (isFound) {
          return TvSerie.updateTvSerieById(id, req.body);
        }
        throw res.status(404).json({ message: "Tv Serie not found" });
      })
      .then(() => {
        return TvSerie.findTvSerieById(req.params.id);
      })
      .then(updatedTvSerie => {
        res.status(200).json(updatedTvSerie);
      })

      .catch(err => {
        res.status(500).json(err);
      });
  }

  static deleteTvSerieById(req, res, next) {
    let { id } = req.params;
    let oldData;
    TvSerie.findTvSerieById(id)
      .then(isFound => {
        if (isFound) {
          oldData = isFound;
          return TvSerie.deleteTvSerieById(req.params.id);
        }
        throw res.status(404).json({ message: "Tv Serie not found" });
      })
      .then(result => {
        res.status(200).json(oldData);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
}

module.exports = TvSeriesController;
