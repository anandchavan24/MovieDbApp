const { movieUrl } = require('../config/movie.config')
const axios = require('axios')
const Functions = () => { }

exports.getMovieDetailsById =  async (param) => {
    try {
        const url = movieUrl + '&i=' + param;
        console.log(url);
        const response = await axios.get(url);
        console.log("response")
        return { statusCode: response.status, response: response.data }
    } catch (error) {
        console.log("error")
        return { statusCode: error.status, response: error }
    }
}

exports.getMovieDetailsByName =  async (param) => {
    try {
        const url = movieUrl + '&t=' + param;
        console.log(url);
        const response = await axios.get(url);
        console.log("response")
        return { statusCode: response.status, response: response.data }
    } catch (error) {
        console.log("error")
        return { statusCode: error.status, response: error }
    }
}
