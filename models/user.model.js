const { response } = require('express')
const { user, movie } = require('./schema')
const axios = require('axios')

const User = function (user) {
    this.firstname = user.firstname || null
    this.lastname = user.lastname || null
    this.mobile = user.mobile || null
    this.email = user.email
    this.city = user.city || null
    this.country = user.country || null
    this.is_delete = false
    this.created_at = new Date();
    this.password = user.password
}


User.signUp = async (newUSer, response) => {
    let { firstname, lastname, mobile, email, city, country, is_delete, created_at, password } = newUSer
    const User = new user({
        "firstname": firstname,
        "lastname": lastname,
        "mobile": mobile,
        "email": email,
        "city": city,
        "country": country,
        "is_delete": is_delete,
        "created_at": created_at,
        "updated_at": created_at,
        "password": password
    });
    const isEmailAlreadyExist = await user.findOne({ email: email });
    if (!isEmailAlreadyExist) {
        User.save(function (result, err) {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    response(err, null);
                }
            }
            response(null, result)
        })
    }
    else {
        response("Email already exists", null);
    }

}


User.loginByMongo = ({ email, password }, respone) => {
    user.findOne({ "$and": [{ email: email }, { password: password }] }, function (err, result) {
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                respone(err, null);
            }
        }
        respone(null, result)
    })
}


User.getAllUser = (respone) => {
    user.find((err, result) => {
        if (err) {
            respone(err, null);
            return
        }
        respone(null, result)
    })
}


User.getAllUser = (respone) => {
    user.find((err, result) => {
        if (err) {
            respone(err, null);
            return
        }
        respone(null, result)
    })
}


module.exports = User;