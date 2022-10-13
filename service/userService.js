const User = require('../models/user.model')
const util = require('../core/util')
const jwt = require('../core/jwtAuth')

exports.getAllUser = (response) => {
    User.getAllUser((err, data) => {
        if (err) {
            response(err, null);
        } else {
            response(null, data);
        }

    })

}

exports.getAllMovie = (response) => {
    User.getAllMovie((err, data) => {
        if (err) {
            response(err, null);
        } else {
            response(null, data);
        }

    })

}


exports.signUp = ({ firstname,
    lastname,
    mobile,
    email,
    city,
    country,
    password
}, response) => {
    const encryptedPassword = util.encrypt(password)
    const user = new User({
        firstname,
        lastname,
        mobile,
        email,
        city,
        country,
        password: encryptedPassword
    })

    User.signUp(user, (err, data) => {
        if (err) {
            response(err, null);
        } else {
            response(null, data);
        }

    })

}

exports.loginByMongo = ({ email, password }, response) => {
    const encryptedPassword = util.encrypt(password)
    User.loginByMongo({ email, password: encryptedPassword }, (err, data) => {
        if (err) {
            response(err, null);
        } else {
            if (data) {
                const authToken = jwt.getToken({ email, password })
                data['authToken'] = authToken;
                response(null, data);
            }
            else {
                response(err, null);
            }
        }

    })

}


exports.search = (movieName, response) => {

    User.search(movieName, (err, data) => {
        if (err) {
            response(err, null);
        } else {
            response(null, data);
        }
    })

}

exports.getMovieById = (movieId, response) => {
    User.getMovieById(movieId, (err, data) => {
        if (err) {
            response(err, null);
        } else {
            response(null, data);
        }
    })
}

