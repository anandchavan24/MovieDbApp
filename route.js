module.exports = (app) => {
    let router = require('express').Router();
    let userController = require('./controller/userController')
    let jwt = require('./jwtAuth');

    //login api
    router.post('/login', userController.loginByMongo)

    //sign up api
    router.post('/signup', userController.signUp)

    //get all users
    router.get('/getAllUser', jwt.verifyToken, userController.getAllUser)

    //search api
    router.post('/search', jwt.verifyToken, userController.search)

    //get all movie in database
    router.get('/getAllMovie', jwt.verifyToken, userController.getAllMovie)

    //main route
    app.use('/user/', router)
}