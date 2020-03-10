'use strict'

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '40031412',
    database: 'nodeapi'
});

module.exports = connection;
