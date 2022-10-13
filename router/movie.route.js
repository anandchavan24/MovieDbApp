module.exports = (app) => {
    let router = require('express').Router();
    let movieController = require('../controller/movieController')
    let jwt = require('../core/jwtAuth');
    router.post('/search', jwt.verifyToken, movieController.search)
    router.get('/getAllMovie', jwt.verifyToken, movieController.getAllMovie)
    router.post('/getMovieById', jwt.verifyToken, movieController.getMovieById)
    app.use('/movie/', router)
}