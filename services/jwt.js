'use strict'

const jwt = require('jsonwebtoken');
const moment = require('moment');
const secret = 'clave_secreta';

exports.createToken = function (user) {
    const payload = {
        sub: user._id,
        nombre: user.nombre,
        email: user.email,
        imagen: user.imagen,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };

    return jwt.sign(payload, secret);
};