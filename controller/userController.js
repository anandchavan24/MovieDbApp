//creteUser
let userService = require('../service/userService');
const jwt = require('../jwtAuth')

exports.createUser = (req,res)=>{
    //Validate req
    if(!req.body.email){
        res.status(404).send({
            message : 'email is required'
        })
        return;
    }

    userService.createUser(req.body,(err,data)=>{
        if(err){
            res.status(500).send({
                message : err
            });
        }else{
            res.status(200).send({
                message : 'success',
                data : data
            });
        }  
    })
}

exports.getAllUser = (req,res)=>{
    userService.getAllUser((err,data)=>{
        if(err){
            res.status(500).send({
                message : err
            });
        }else{
            res.status(200).send({
                message : 'success',
                data : data
            });
        }  
    })
}

exports.getAllMovie = (req,res)=>{
    userService.getAllMovie((err,data)=>{
        if(err){
            res.status(500).send({
                message : err
            });
        }else{
            res.status(200).send({
                message : 'success',
                data : data
            });
        }  
    })
}

// exports.login = (req,res)=>{
//     //Validate req
//     if(!req.body.email){
//         res.status(404).send({
//             message : 'email is required'
//         })
//         return;
//     }
//     if(!req.body.password){
//         res.status(404).send({
//             message : 'password is required'
//         })
//         return;
//     }
//     userService.login(req.body,(err,data)=>{
//         if(err){
//             res.status(500).send({
//                 message : err
//             });
//         }else{
//             res.status(200).send({
//                 message : 'success',
//                 data :  {
//                     id : data[0].id,
//                     firstname : data[0].id,
//                     lastname  : data[0].lastname,
//                     authToken : data[0].authToken
//                 }
//             });
            
//         }  
//     })
// }

exports.signUp = (req,res)=>{
    //Validate req
    if(!req.body.email){
        res.status(404).send({
            message : 'email is required'
        })
        return;
    }

    userService.signUp(req.body,(err,data)=>{
        if(err){
            res.status(500).send({
                message : err
            });
        }else{
            res.status(200).send({
                message : 'success',
                data : data
            });
        }  
    })
}


exports.loginByMongo = (req,res)=>{
    //Validate req
    if(!req.body.email){
        res.status(404).send({
            message : 'email is required'
        })
        return;
    }
    if(!req.body.password){
        res.status(404).send({
            message : 'password is required'
        })
        return;
    }
    userService.loginByMongo(req.body,(err,data)=>{
        if(err){
            res.status(500).send({
                message : err
            });
        }else{
            if(data){
                res.status(200).send({
                    message : 'success',
                    data :  {
                        id : data.id,
                        firstname : data.firstname,
                        lastname  : data.lastname,
                        authToken : data.authToken
                    }
                });
            }
            else{
                res.status(500).send({
                    message : "Please enter valid credential"
                });
            }
        }  
    })
}

exports.search = (req,res)=>{
    //Validate req
     
    // if(jwt.verifyToken())

    if(!req.body.movieName){
        res.status(404).send({
            message : 'email is required'
        })
        return;
    }

    userService.search(req.body.movieName,(err,data)=>{
        if(err){
            res.status(500).send({
                message : err
            });
        }else{
            res.status(200).send({
                message : 'success',
                data : data
            });
        }  
    })
}
