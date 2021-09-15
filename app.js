var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
import user from './public/models/User'

let mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect("mongodb://21017/local", {useNewUrlParser: true, useUnifiedTopology: true}, (error) => {
  console.log(error);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);


export const User = mongoose.model("User", user);

module.exports = app;
