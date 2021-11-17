'use strict'

const jwt = require('jsonwebtoken');
const moment = require('moment');
const secret = 'clave_secreta';

exports.ensureAuth = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({
            message: 'La peticion no tiene la cabecera de autenticacion'
        });
    }

    const token = req.headers.authorization.replace(/['"]+/g, ''); // expresion regular que remplaza comillas simples o dobles por nada

    try {
        const payload = jwt.verify(token, secret);

        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                message: 'El token ha expirado'
            });
        } else {
            req.user = payload;
            next();
        }
    } catch (ex) {
        return res.status(404).send({
            message: 'El token no es valido'
        });
    }
}