'use strict'

const UserModel = require('../models/user');
var bcrypt = require('bcrypt-nodejs'); // se llama a la libreria de encriptacion
var jwt = require('../services/jwt');

function users(req, res) {
    UserModel.getUsers((err, data) => {
        res.status(200).json(data);
    })
}

function userId(req, res) {
    UserModel.getUserID((err, data) => {
        res.status(200).send(data);
    })
}

function saveUser(req, res) {
    var data = req.body;
    var password;

    if (data.nombre && data.usuario && data.email && data.password) {

        bcrypt.hash(data.password, null, null, (err, hash) => { // se encripta la password

            if (err) {
                console.log('error: ', err);
            } else {
                password = hash;

                const UserData = {
                    // id: null, // si es generado automaticamente no es necesario declararlo
                    nombre: data.nombre,
                    usuario: data.usuario,
                    email: data.email,
                    password: password,
                    imagen: null
                }

                UserModel.saveUser(UserData, (err, data) => {

                    if (err) return res.status(404).send({ 'error': err });

                    if (data && data.insertId) {
                        console.log(data);
                        res.status(200).send({ // lo que devuelve al cliente
                            mensaje: 'Guardado Correctamente',
                            user: UserData
                        })
                    } else {
                        res.status(404).send({
                            mensaje: 'error'
                        })
                    }
                })
            }
        });
    } else {
        res.status(200).send({
            mensaje: 'llene los campos necesarios'
        });
    }
}

function updateUser(req, res) {
    var data = req.body;
    var id = req.params.id;
    var password;

    if (data.nombre && data.usuario && data.password && data.email) {

        UserModel.findEmail(data.email, (err, resp) => {
            if (err) {
                console.log('error', err);
            } else {
                if (resp.existe === 0) {
                    bcrypt.hash(data.password, null, null, (err, hash) => {
                        if (err) {
                            console.log('error', err);
                        } else {
                            password = hash;

                            const UserData = {
                                id: id,
                                nombre: data.nombre,
                                usuario: data.usuario,
                                email: data.email,
                                password: password,
                            }

                            UserModel.updateUser(UserData, (err, resp) => {
                                if (resp && resp.mensaje) {
                                    return res.status(200).send({
                                        mensaje: 'Modificado Correctamente'
                                    })

                                } else {
                                    return res.status(404).send({
                                        mensaje: 'error',
                                        error: err
                                    });
                                }
                            })
                        }
                    });
                } else {
                    return res.status(200).send({
                        mensaje: 'El usuario ya existe'
                    });
                }
            }
        })

    } else {
        res.status(200).send({
            mensaje: 'llene los campos necesarios'
        });
    }
}

function deleteUser(req, res) {
    var id = req.params.id;

    UserModel.deleteUser(id, (err, resp) => {
        if (resp && resp.mensaje === 'deleted') {
            return res.status(200).send({
                success: 'Usuario Eliminado Correctamente',
                resp
            });
        } else if (resp.mensaje === 'not exist') {
            return res.status(200).send({
                msj: 'El Usuario no existe',
                resp
            });
        } else {
            return res.status(500).send({
                error: 'error',
                err
            })
        }
    });
}

function logIn(req, res) {
    var data = req.body;

    if (data.email && data.password) {

        UserModel.logIn(data, (err, user) => {

            if (user.datos[0].email && user.datos[0].password) {
                bcrypt.compare(data.password, user.datos[0].password, (err, check) => { // compara la password obtenida de la bd con la que da el cliente
                    if (check) {

                        if (data.gettoken) { // el metodo gettoken se envia junto al email y password
                            //generar y devolver un token
                            return res.status(200).send({
                                token: jwt.createToken(user.datos[0])
                            });
                        } else {
                            //se devuelven todos los datos al usuario

                            user.datos[0].password = undefined; // elimina la propiedad password del objeto

                            return res.status(200).send({
                                mensaje: 'Usuario identificado',
                                user: user.datos
                            });
                        }

                    } else {
                        return res.status(404).send({
                            mensaje: 'El usuario no pudo identificarse'
                        });
                    }
                })
            }
        });
    }

}

function pruebas(req, res) {
    
    res.status(200).send({
        mensaje: 'accion de prueba nodejs api'
    });
}

module.exports = {
    users,
    pruebas,
    userId,
    saveUser,
    updateUser,
    deleteUser,
    logIn
}