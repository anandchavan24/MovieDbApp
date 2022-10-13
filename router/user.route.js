module.exports = (app) => {
    let router = require('express').Router();
    let userController = require('../controller/userController')
    let jwt = require('../core/jwtAuth');
    router.post('/login', userController.loginByMongo)
    router.post('/signup', userController.signUp)
    router.get('/getAllUser', jwt.verifyToken, userController.getAllUser)
    app.use('/user/', router)
}