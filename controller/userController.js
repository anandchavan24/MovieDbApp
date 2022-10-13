let userService = require('../service/userService');
let {emailRegexp} = require('../config/movie.config')

exports.getAllUser = (req, res) => {
    userService.getAllUser((err, data) => {
        if (err) {
            res.status(500).send({
                message: err
            });
        } else {
            res.status(200).send({
                message: 'success',
                data: data
            });
        }
    })
}


exports.signUp = (req, res) => {
    if (!req.body.email) {
        res.status(404).send({
            message: 'email is required'
        })
        return;
    }
    if(!emailRegexp.test(req.body.email)){
        res.status(404).send({
            message: 'Please enter valid email address'
        })
        return;
    }
    userService.signUp(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err
            });
        } else {
            res.status(200).send({
                message: 'success',
                data: data
            });
        }
    })
}


exports.loginByMongo = (req, res) => {
    if (!req.body.email) {
        res.status(404).send({
            message: 'email is required'
        })
        return;
    }
    if (!req.body.password) {
        res.status(404).send({
            message: 'password is required'
        })
        return;
    }
    userService.loginByMongo(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err
            });
        } else {
            if (data) {
                res.status(200).send({
                    message: 'success',
                    data: {
                        id: data.id,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        authToken: data.authToken
                    }
                });
            }
            else {
                res.status(500).send({
                    message: "Please enter valid credential"
                });
            }
        }
    })
}
