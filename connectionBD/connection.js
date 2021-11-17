'use strict'

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '40031412',
    database: 'nodeapi',
});

module.exports = connection;
