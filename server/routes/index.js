/*jshint esversion: 8*/
const express = require('express');
const app = express();

app.use('/user', require('./user/user'));
app.use('/', require('./login/login'));
app.use('/event', require('./event/event'));

module.exports = app;