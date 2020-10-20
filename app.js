/*File Name: app.js
Created by: Cong Wang
Student Number: #301098547
Created on: 10.2.2020*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = require("./routes/index");
const expressLayout = require('express-ejs-layouts');

var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');

var mongoose = require('mongoose');

//db config
var db = require('./config/keys').MongoURI;

//connect to mongodb
mongoose.connect(db, {
  useNewUrlParser: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//passport config
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, './views/'));
app.set('view engine', 'ejs');
app.set('layout', './layouts/layout1', './layouts/layout2');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressLayout);

//express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global middleware
app.use((req,res,next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
})

//open the public folder resources
app.use('/public/', express.static(path.join(__dirname, './public/')));

//open the node_modules folder resources
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(router);

/* the port of the project is 3000 */
app.listen('3000', function () {
  console.log(("Running..."));
})

module.exports = app;
