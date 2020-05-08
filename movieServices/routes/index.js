const router = require('express').Router()
const MoviesController = require('../controllers')

router.get('/', (req, res) => { res.send("OK BOS!1!1!1! Dari Movies services")})

// movies endpoint
router.post('/movies/', MoviesController.createMovie)
router.get('/movies/', MoviesController.findAllMovies)
router.get('/movies/:id', MoviesController.findMovieById)
router.put('/movies/:id', MoviesController.updateMovieById)
router.delete('/movies/:id', MoviesController.deleteMovieById)

module.exports = router