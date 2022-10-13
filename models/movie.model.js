const { movie } = require('./schema')
const Movie = () => { }

Movie.findOne =  async (query) => {
    return await movie.findOne(query)
}

Movie.find =  async () => {
    return await movie.find()
}


module.exports = Movie;