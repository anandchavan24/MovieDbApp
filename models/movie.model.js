const { response } = require('express')
const { user, movie } = require('./schema')
const axios = require('axios')
const { movieUrl } = require('../config/movie.config')
const Movie = () => { }

Movie.search = async (movieName, respone) => {
    const result = await movie.findOne({ "Title": new RegExp(["^", movieName, "$"].join(""), "i") })
    if (result == null) {
        const res = await getMovieByName(movieName)
        if (res.statusCode == 200 && JSON.parse((res.response.Response).toLowerCase())) {
            const Movie = new movie(res.response);
            Movie.save()
        }
        respone(null, (res.statusCode == 200) ? res.response : res.error)
    }
    else {
        respone(null, result)
    }
}


Movie.getAllMovie = (respone) => {
    movie.find((err, result) => {
        if (err) {
            respone(err, null);
            return
        }
        respone(null, result)
    })
}

Movie.getMovieById = async (movieId, respone) => {
    const result = await movie.findOne({ "imdbID": movieId })
    if (result == null) {
        const res = await getMovieById(movieId)
        if (res.statusCode == 200 && JSON.parse((res.response.Response).toLowerCase())) {
            const Movie = new movie(res.response);
            Movie.save()
        }
        respone(null, (res.statusCode == 200) ? res.response : res.error)
    }
    else {
        respone(null, result)
    }
}

async function getMovieById(movieId) {
    try {
        const url = movieUrl + '&i=' + movieId;
        const response = await axios.get(url);
        return { statusCode: response.status, response: response.data }
    } catch (error) {
        return { statusCode: response.status, response: error }
    }
}


async function getMovieByName(movieName) {
    try {
        const url = movieUrl + '&t=' + movieName;
        const response = await axios.get(url);
        return { statusCode: response.status, response: response.data }
    } catch (error) {
        return { statusCode: response.status, response: error }
    }
}

module.exports = Movie;