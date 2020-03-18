'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlwares/authentication');

api.get('/users', md_auth.ensureAuth,UserController.users);
api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas);
api.get('/user', UserController.userId);
api.post('/users', UserController.saveUser);
api.put('/updateUser/:id', UserController.updateUser);
api.delete('/deleteUser/:id', UserController.deleteUser);
api.post('/login', UserController.logIn);

module.exports = api;