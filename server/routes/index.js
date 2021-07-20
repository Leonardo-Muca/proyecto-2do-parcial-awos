/*jshint esversion: 8*/
const express = require('express');
const app = express();

app.use('/user', require('./user/user'));
// app.use('/visit', require('./visit/visit'));
// app.use('/waiting', require('./waiting/waiting'));

module.exports = app;