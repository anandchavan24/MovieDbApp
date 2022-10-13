const { movieUrl } = require('../config/movie.config')
const axios = require('axios')
const Functions = () => { }

Functions.getMovieDetails =  async (param) => {
    try {
        const url = movieUrl + '&i=' + param;
        const response = await axios.get(url);
        return { statusCode: response.status, response: response.data }
    } catch (error) {
        console.log(error)
        return { statusCode: error.status, response: error }
    }
}
    