'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// cargar rutas
var user_routes = require('./rutes/user');

// middlwares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors

// rutas
app.use('/api', user_routes); // "app.use" permite hacer middlewares para que este se ejecute antes de llegar a la peticion del controlador

 // exportar
module.exports = app;