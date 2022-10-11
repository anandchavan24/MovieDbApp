const User = require('../models/user.model')
const util = require('../util')
const jwt = require('../jwtAuth')
exports.createUser = ({firstname ,
    lastname ,
    mobile,
    email,
    city ,
    country,
    password
},response) => {
    //call db model method
    const { v4: uuidv4 } = require('uuid');
    const encryptedPassword = util.encrypt(password)
    const user = new User({
        id : uuidv4(), //pass uuid    //uniuie required,
        firstname ,
        lastname ,
        mobile,
        email, //unique required
        city ,
        country,
        password : encryptedPassword
    })

    User.create(user, (err, data)=>{
        if(err){
            response(err,null);
        }else{
            response(null,data);
        }
        
    })

}

exports.getAllUser = (response) => {
    User.getAllUser((err, data)=>{
        if(err){
            response(err,null);
        }else{
            response(null,data);
        }
        
    })

}

exports.login = ({email,password},response) => {
    const encryptedPassword = util.encrypt(password)
    User.login({email,password:encryptedPassword},(err, data)=>{
        if(err){
            response(err,null);
        }else{
            const authToken = jwt.getToken({email,password})
            data[0]['authToken'] = authToken;
            response(null,data);
        }
        
    })

}

exports.signUp = ({firstname ,
    lastname ,
    mobile,
    email,
    city ,
    country,
    password
},response) => {
    //call db model method
    const { v4: uuidv4 } = require('uuid');
    const encryptedPassword = util.encrypt(password)
    const user = new User({
        id : uuidv4(), //pass uuid    //uniuie required,
        firstname ,
        lastname ,
        mobile,
        email, //unique required
        city ,
        country,
        password : encryptedPassword
    })

    User.signUp(user, (err, data)=>{
        if(err){
            response(err,null);
        }else{
            response(null,data);
        }
        
    })

}

exports.loginByMongo = ({email,password},response) => {
    const encryptedPassword = util.encrypt(password)
    User.loginByMongo({email,password:encryptedPassword},(err, data)=>{
        console.log("Response",data)
        if(err){
            response(err,null);
        }else{
            if(data){
                const authToken = jwt.getToken({email,password})
                data['authToken'] = authToken;
                response(null,data);
            }
            else{
                response(err,null);
            }
        }
        
    })

}


exports.search = (movieName,response) => {

    User.search(movieName, (err, data)=>{
        if(err){
            response(err,null);
        }else{
            response(null,data);
        }
        
    })

}

