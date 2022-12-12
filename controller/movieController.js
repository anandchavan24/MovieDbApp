let movieService = require('../service/movieService');

exports.getAllMovie = (req, res) => {
    movieService.getAllMovie((err, data) => {
        if (err) {
            res.status(500).send({
                message: err
            });
        } else {
            res.status(200).send({
                message: 'success',
                data: data
            });
        }
    })
}

exports.search = (req, res) => {
    console.log(req.body)
    if (!req.body.movieName) {
        res.status(404).send({
            message: 'movie name is required'
        })
        return;
    }
    movieService.search(req.body.movieName, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err,
                statusCode:500,
                data:null
            });
        } else {
            res.status(200).send({
                message: 'success',
                data: data,
                statusCode:200
            });
        }
    })
}

exports.getMovieById = (req, res) => {
    if (!req.body.movieId) {
        res.status(404).send({
            message: 'movie id  is required'
        })
        return;
    }
    movieService.getMovieById(req.body.movieId, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err
            });
        } else {
            res.status(200).send({
                message: 'success',
                data: data
            });
        }
    })
}
