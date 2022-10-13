const Movie = require('../models/movie.model')

exports.getAllMovie = (response) => {
    Movie.getAllMovie((err, data)=>{
        if(err){
            response(err,null);
        }else{
            response(null,data);
        }
        
    })

}

exports.search = (movieName,response) => {

    Movie.search(movieName, (err, data)=>{
        if(err){
            response(err,null);
        }else{
            response(null,data);
        }    
    })

}

exports.getMovieById = (movieId,response) =>{
    Movie.getMovieById(movieId,(err, data)=>{
        if(err){
            response(err,null);
        }else{
            response(null,data);
        }
    })
}

