const jwt = require('jsonwebtoken');
const config = require('../config.js');
const error = require('../utils/error');

const secret = config.jwt.secret

function sign(data) {
    return jwt.sign(data, secret)
}

function verify(token) {
    return jwt.verify(token, secret)
}

const check = {
    own: function (req, owner) {
        const decoded = decodeHeader(req);

        //comprobar si es o no propio
        if (decoded.id != owner) {
            throw error('You do not have permisions', 401)
        }
    },
    logged: function (req) {
        decodeHeader(req);
    }
}

function getToken(authorization) {
    // Bearer Token
    if (!authorization) {
        throw error('No token', 500);
    }

    if (authorization.indexOf('Bearer ') == -1) {
        throw error('Invalid format', 500);
    }

    let token = authorization.replace('Bearer ', '');
    return token
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    return decoded;
}

module.exports = {
    sign,
    check
}
