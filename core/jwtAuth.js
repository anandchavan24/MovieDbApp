var jwt = require('jsonwebtoken');
var privateKey = 'bgkjrwfoewih435445';

exports.getToken = (userData) => {
    var token = jwt.sign(userData, privateKey);
    return token;
}

exports.verifyToken = (req, res, next) => {
    var authToken = req.rawHeaders[1]
    var decoded = jwt.verify(authToken, privateKey);
    if (decoded) {
        next();
    } else {
        res.status(401).send({
            message: "Aerruth fail"
        });
    }
}
