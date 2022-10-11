const { response } = require('express')
const { user, movie } = require('./schema')
const axios = require('axios')

const User = function (user) {
    this.id = user.id //pass uuid    //uniuie required
    this.firstname = user.firstname || null
    this.lastname = user.lastname || null
    this.mobile = user.mobile || null
    this.email = user.email //unique required
    this.city = user.city || null
    this.country = user.country || null
    this.is_delete = false
    this.created_at = new Date();
    this.password = user.password
}

//CURD
User.create = (newUSer, respone) => {
    //create queary
    console.log('new user - :', newUSer)
    let insertQuery = 'INSERT INTO user (id, firstname, lastname,moblie,email,city,country,is_delete,created_at,password) VALUES (?,?,?,?,?,?,?,?,?,?);'
    let { id, firstname, lastname, mobile, email, city, country, is_delete, created_at, password } = newUSer
    sql.query(insertQuery, [id, firstname, lastname, mobile, email, city, country, is_delete, created_at, password], (err, result) => {
        if (err) {
            sql.end()
            respone(err, null);
            return
        }
        console.log("Created user: ", { id: result.insertId, ...newUSer })
        respone(null, { id: result.insertId, ...newUSer })
    })
    //return
}

User.getAllUser = (respone) => {
    //create queary

    sql.query('SELECT * from user', (err, result) => {
        if (err) {
            sql.end()
            respone(err, null);
            return
        }
        console.log("Created user: ", result)
        respone(null, result)
    })
    //return
}

User.login = ({ email, password }, respone) => {
    //create queary
    console.log(email, password);
    sql.query('SELECT * from user where email = ? and password = ?', [email, password], (err, result) => {
        if (err) {
            sql.end()
            respone(err, null);
            return
        }
        if (result && result.length) {
            console.log("login succesfull: ", result)
            respone(null, result)
        } else {
            respone('email or password does not match.', null)
        }

    })
    //return
}

User.signUp = async (newUSer, respone) => {
    let { id, firstname, lastname, mobile, email, city, country, is_delete, created_at, password } = newUSer
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
    // User.save().then(() => console.log('user Created'));

    const isEmailAlreadyExist = await user.findOne({ "$or": [{ email: email }, { mobile: mobile }] });
    // const isEmailAlreadyExist = await user.findOne({ mobile: mobile });
    console.log(isEmailAlreadyExist, "Exists")
    if (!isEmailAlreadyExist) {
        User.save(function (result, err) {
            console.log(result, err)
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate username
                    respone(err, null);
                    //   return res.status(422).send({ succes: false, message: 'User already exist!' });
                }            // Some other error
                // return res.status(422).send(err);
            }
            respone(null, result)
        })
    }
    else {
        respone("Email/Phone already exists", null);
    }

}


User.loginByMongo = ({ email, password }, respone) => {
    //create queary
    console.log(email, password);
    user.findOne({ "$and": [{ email: email }, { password: password }] }, function (err, result) {
        // console.log(result, err)
        if (err) {
            if (err.name === 'MongoError' && err.code === 11000) {
                respone(err, null);
            }
        }
        respone(null, result)
    })
}

User.search = async (movieName, respone) => {
    const result = await movie.findOne({ "Title":  new RegExp(["^", movieName, "$"].join(""), "i")})
    if (result == null) {
        const res = await getUser(movieName)
        if (res.statusCode == 200 && JSON.parse((res.response.Response).toLowerCase())) {
            const Movie = new movie(res.response);
            Movie.save((function (result, err) {
                if (err) {
                    console.log("fail",err);     
                }
                console.log("success",result);     
            }))
        }
        respone(null, (res.statusCode == 200) ? res.response : res.error)
    }
    else {
        console.log("result", result)
        respone(null, result)
    }
}


async function getUser(movieName) {
    try {
        const url = 'http://www.omdbapi.com/?apikey=f34f1e9e&t=' + movieName;
        console.log(url);
        const response = await axios.get(url);
        return { statusCode: response.status, response: response.data }
    } catch (error) {
        return { statusCode: response.status, response: error }
    }
}

module.exports = User;