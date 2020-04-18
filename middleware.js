let jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
    }

    if (token) {

        jwt.verify(token, config.secret, (err,decoded) => {

            if (err) {
                
                return res.json({
                    success: false,
                    message: 'Invalid Token'
                });

            } else {

                req.decoded = decoded;
                next();
            }

        });

    } else {

        return res.json({
            success: false,
            message: 'Expected an auth token but none was given'
        });

    };

};

module.exports = {
    checkToken: checkToken
}