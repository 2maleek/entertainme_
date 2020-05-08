const router = require('express').Router()
const {MoviesController, TvSeriesController } = require('../controllers')

router.get('/', (req, res) => { res.send("OK BOS!1!1!1!")})

// movies endpoint
router.post('/movies/', MoviesController.createMovie)
router.get('/movies/', MoviesController.findAllMovies)
router.get('/movies/:id', MoviesController.findMovieById)
router.put('/movies/:id', MoviesController.updateMovieById)
router.delete('/movies/:id', MoviesController.deleteMovieById)

//tvseries endpoint
router.post('/tvseries/', TvSeriesController.createTvSerie)
router.get('/tvseries/', TvSeriesController.findAllTvSeries)
router.get('/tvseries/:id', TvSeriesController.findTvSerieById)
router.put('/tvseries/:id', TvSeriesController.updateTvSerieById)
router.delete('/tvseries/:id', TvSeriesController.deleteTvSerieById)

module.exports = router