<<<<<<< HEAD
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const localStrategy = passportLocal.Strategy;
const flash = require('connect-flash');
const createError = require('http-errors');

// Initialize Express
const app = express();


// Session Configuration
app.use(session({
  secret: "OurSecret",
  saveUninitialized: false,
  resave: false
}));

// Flash Messages
app.use(flash());

// Passport Initialization
app.use(passport.initialize());
app.use(passport.session());

// User Model
const userModel = require('./models/user');
const user = userModel.User;
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// Set View Engine
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Middleware
=======
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const surveyRouter = require('./routes/survey');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

>>>>>>> 359defea52fb82faba939b220ad5de9b09e4f084
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
<<<<<<< HEAD

// Pass Flash Messages to Views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and Forward to Error Handler
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Error Handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
=======
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/survey', surveyRouter);

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
>>>>>>> 359defea52fb82faba939b220ad5de9b09e4f084
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
<<<<<<< HEAD
=======
  
>>>>>>> 359defea52fb82faba939b220ad5de9b09e4f084
