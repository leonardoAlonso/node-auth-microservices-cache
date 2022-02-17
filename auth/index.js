const jwt = require('jsonwebtoken');
const config = require('../config.js')

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
        console.log(decoded)

        //comprobar si es o no propio
        if (decoded.id != owner) {
            throw new Error('You do not have permisions')
        }
    }
}

function getToken(authorization) {
    // Bearer Token
    if (!authorization) {
        throw new Error('No token');
    }

    if (authorization.indexOf('Bearer ') == -1) {
        throw new Error('Invalid format');
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
