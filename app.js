let app = require('express');
let express = app();
let cors = require('cors')
const args  = process.argv.splice(2)
const port = args[1].split('=')[1];
const env = args[0]

//middleware
express.use(cors())

//using body parser to parse post request

express.use(app.json())

express.use((req,res,next)=>{
    console.log('Request Type: ',req.method)
    next();
})
express.use((req,res,next)=>{
    console.log('Request Type: ',req.method)
    req['user'] = 'Josh'
    next()
})
express.get('/',(req,res)=>{
    
    res.send('Welcome to movie db app '+ req.user);

})

require('./route')(express)

express.listen(port || 3000,()=>{
    console.log('server listning at port 3000')
});

