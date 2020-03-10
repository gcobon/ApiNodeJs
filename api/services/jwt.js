'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        nombre: user.nombre,
        email:user.email,
        imagen: user.imagen,
        iat: moment().unix(),
        exp: moment().add(30,'days').unix()
    };

    return jwt.encode(payload,secret);
};