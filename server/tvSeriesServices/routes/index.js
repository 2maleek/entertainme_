const router = require('express').Router()
const TvSeriesController = require('../controllers')

router.get('/', (req, res) => { res.send("OK BOS!1!1!1! Dari Tv Series services")})

//tvseries endpoint
router.post('/tvseries/', TvSeriesController.createTvSerie)
router.get('/tvseries/', TvSeriesController.findAllTvSeries)
router.get('/tvseries/:id', TvSeriesController.findTvSerieById)
router.put('/tvseries/:id', TvSeriesController.updateTvSerieById)
router.delete('/tvseries/:id', TvSeriesController.deleteTvSerieById)

module.exports = router