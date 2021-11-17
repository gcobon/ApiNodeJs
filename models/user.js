'use strict'

var connection = require('../connectionBD/connection');

let userModel = {};

userModel.getUsers = (callback) => {
    if (connection) {
        console.log(connection.threadId); // mira el numero de conexion
        connection.query('SELECT * FROM usuarios ORDER BY id',
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            });
    }
}

userModel.getUserID = (callback) => {
    if (connection) {
        console.log(connection.threadId);
        connection.query('SELECT * FROM usuarios WHERE id = 1',
            (err, row) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, row);
                }
            });
    }
}

userModel.saveUser = (userData, callback) => {
    if (connection) {
        console.log(connection.threadId);
        connection.query(
            'INSERT INTO usuarios SET ?', userData,
            (err, result) => {
                if (err) {
                    console.log('error:', err);
                    throw err;
                } else {
                    callback(null, {
                        'insertId': result.insertId,
                    })
                }
            });
    }
}

userModel.updateUser = (userData, callback) => {
    if (connection) {
        console.log(connection.threadId);
        const sql = `
        UPDATE usuarios SET 
        nombre = ${connection.escape(userData.nombre)},
        usuario = ${connection.escape(userData.usuario)},
        email = ${connection.escape(userData.email)},
        password = ${connection.escape(userData.password)}
        WHERE id = ${connection.escape(userData.id)}
        `

        connection.query(sql, (err, result) => {
            if (err) {
                console.log('error:', err);
                throw err;
            } else {
                callback(null, {
                    'mensaje': 'success',
                    'result': result
                })
            }
        });
    }
}

userModel.deleteUser = (id, callback) => {
    if (connection) {
        console.log(connection.threadId);
        let sql = `SELECT * FROM usuarios WHERE id = ${connection.escape(id)}`;

        connection.query(sql, (err, row, campos) => {
            if (row.length >= 1) {
                console.log('d', row);
                let sql = `DELETE FROM usuarios WHERE id = ${connection.escape(id)}`;

                connection.query(sql, (err, result) => {
                    if (err) {
                        console.log('error: ', err);
                        throw err;
                    } else {
                        callback(null, {
                            'mensaje': 'deleted',
                            'resutl': result,
                            'campos': campos,
                            'row': row
                        })
                    }
                });
            } else {
                callback(null, {
                    'mensaje': 'not exist',
                })
            }
        })
    }

}

userModel.findEmail = (email, callback) => {
    if (connection) {
        connection.query('SELECT COUNT(email) AS existe FROM usuarios WHERE email = ?', email,
            (err, result) => {
                if (err) {
                    console.log('error:', err);
                    throw err;
                } else {
                    callback(null, {
                        'existe':result[0].existe
                    });
                }
            })
    }
}

userModel.logIn = (userData,callback) =>{
    if(connection){
        let sql = `SELECT * FROM usuarios WHERE 
                    email = ${connection.escape(userData.email)}`;

        connection.query(sql, (err, resp, campos) => {
            if(err){
                console.log('error', err);
                throw err;
            }else{
                callback(null,{
                    datos:resp
                });
            }
        });
    }
}

module.exports = userModel;