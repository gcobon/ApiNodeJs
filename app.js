'use strict'

const express = require('express');
const { json } = require('express');
const app = express();

const connection = require('./connectionBD/connection');

connection.connect();


// cargar rutas
const user_routes = require('./rutes/user');

// middlwares
app.use(json());

// cors

// rutas
app.use('/api', user_routes); // "app.use" permite hacer middlewares para que este se ejecute antes de llegar a la peticion del controlador

// exportar
module.exports = app;