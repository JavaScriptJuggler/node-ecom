var jwt = require('jsonwebtoken');
require('dotenv').config()

/* sign token */
const signToken = (data, callback) => {
    jwt.sign({ data }, process.env['JWT_SECRECT'], { expiresIn: 300 }, (err, token) => {
        if (err) throw err;
        return callback(token);

    })
}
/* verify token */
const tokenVerify = (req, res, next) => {
    token = req.headers['authorization'];
    jwt.verify(token, process.env['JWT_SECRECT'], function (err, decoded) {
        if (err) {
            res.send({
                message: 'Unauthenticated',
            })
        } else {
            res.locals.post = decoded;
            next();
        }
    });
}
module.exports = {
    signToken,
    tokenVerify
}

