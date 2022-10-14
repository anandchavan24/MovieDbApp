let app = require('express');
let express = app();
let cors = require('cors')
const args  = process.argv.splice(2)
const port = args[1].split('=')[1];
const env = args[0]
express.use(cors())
express.use(app.json())
fs = require('fs')

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger/swagger-output.json')

express.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

express.get('/',(req,res)=>{
    res.send('Welcome to movie db app '+ req.user);
})
require('./router/movie.route')(express)
require('./router/user.route')(express)

express.listen(port || 3000,()=>{
    console.log('server listning at port 3000')
});

