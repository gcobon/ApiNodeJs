'use strict'

const express = require('express');
const UserController = require('../controllers/user');

const api = express.Router();
const md_auth = require('../middlwares/authentication');

api.get('/users', UserController.users);
api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas);
api.get('/user', UserController.userId);
api.post('/users', UserController.saveUser);
api.put('/updateUser/:id', UserController.updateUser);
api.delete('/deleteUser/:id', UserController.deleteUser);
api.post('/login', UserController.logIn);

module.exports = api;