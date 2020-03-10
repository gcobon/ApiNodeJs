'use strict'

var mysql = require('mysql');
var app = require('./app'); // se importa el modulo app al indexjs
var port = 3800; // puerto del servidor

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '40031412',
    database: 'nodeapi'
})

app.listen(port, () => {
  console.log("servidor corriendo en el puerto 3800");
})

/*
connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }else{
        console.log('connection successful, connected as id ' + connection.threadId);
       
        app.listen(port, () => {
            console.log("servidor corriendo en el puerto 3800");
        })

        //connection.end();
      } 
})
*/





