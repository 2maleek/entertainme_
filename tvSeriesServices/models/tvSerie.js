const { getDatabase } = require('../config/config')
const TvSeries = getDatabase().collection('TvSeries')
const { ObjectId } = require('mongodb')

class TvSerie {
  static createTvSerie(newTvSerie) {
    return TvSeries.insertOne(newTvSerie)
  }

  static findAllTvSeries() {
    return TvSeries.find().toArray()
  }

  static findTvSerieById(tvSerieId) {
    return TvSeries.findOne({_id: ObjectId(tvSerieId)})
  }

  static updateTvSerieById(tvSerieId, newData) {
    return TvSeries.updateOne({ _id: ObjectId(tvSerieId) }, { $set: newData })
  }

  static deleteTvSerieById(tvSerieId) {
    return TvSeries.deleteOne({ _id: ObjectId(tvSerieId) })
  }
}

module.exports = TvSerie