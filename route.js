module.exports = (app) => {
    let router = require('express').Router();
    let userController = require('./controller/userController')
    let jwt = require('./jwtAuth');

    //create user
    router.post('/', userController.createUser)

    //get all users
    router.get('/', jwt.verifyToken, userController.getAllUser)

    //login api
    router.post('/login', userController.loginByMongo)

    //sign up api
    router.post('/signup', userController.signUp)

    //search api
    router.post('/search', jwt.verifyToken,userController.search)

    //main route
    app.use('/user/', router)
}