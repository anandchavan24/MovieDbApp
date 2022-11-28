const Movie = require('../models/movie.model')
const Function = require('../models/function')
const { movie } = require('../models/schema')

exports.getAllMovie = async (response) => {
    const result = await Movie.find()
    if (result == null) {
        response(err, null);
    }
    else {
        response(null, result);
    }
}

exports.search = async (movieName, response) => {
    const result = await Movie.findOne({ "Title": new RegExp(["^", movieName, "$"].join(""), "i") });
    if (result == null) {
        const res = await Function.getMovieDetails(movieName)
        if (res && res.statusCode == 200 && JSON.parse((JSON.parse(JSON.stringify(res.response)).Response).toLowerCase())) {
            const Movie = new movie(res.response);
            Movie.save()
        }
        response(null, (res.statusCode == 200) ? res.response : res.error)
    }
    else {
        response(null, result)
    }
}

exports.getMovieById = async (movieId, response) => {
    const result = await Movie.findOne({ "imdbID": movieId })
    if (result == null) {
        const res = await Function.getMovieDetails(movieId)
        if (res.statusCode == 200 && JSON.parse((res.response.Response).toLowerCase())) {
            const Movie = new movie(res.response);
            Movie.save()
        }
        response(null, (res.statusCode == 200) ? res.response : res.error)
    }
    else {
        response(null, result)
    }
}


