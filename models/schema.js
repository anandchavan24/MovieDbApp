const { mongoose } = require('./index')
const { Schema } = mongoose;

const useSchema = new Schema({
    "firstname": { type: String, default: '' },
    "lastname": String,
    "mobile": String,
    "email": String,
    "city": { type: String, value: 'Pune' },
    "country": String,
    "is_delete": Boolean,
    "created_at": Date,
    "updated_at": Date,
    "password": String,
})

const user = mongoose.model('users', useSchema);

const movieSchema = new Schema({
    "Title": String,
    "Year": String,
    "Rated": String,
    "Released": String,
    "Runtime": String,
    "Genre": String,
    "Director": String,
    "Writer": String,
    "Actors": String,
    "Plot": String,
    "Language": String,
    "Country": String,
    "Awards": String,
    "Poster": String,
    "Ratings": [
        {
            "Source": String,
            "Value": String,
        }
    ],
    "Metascore": String,
    "imdbRating": String,
    "imdbVotes": String,
    "imdbID": String,
    "Type": String,
    "DVD": String,
    "BoxOffice": String,
    "Production": String,
    "Website": String,
    "Response": String,
})

const movie = mongoose.model('movies', movieSchema);


module.exports = { user, movie }





