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
var FacebookStrategy = require('passport-facebook');

require('dotenv').config();

// Initialize Express
const app = express();

// Session Configuration
app.use(session({
  secret: "OurSecret",
  saveUninitialized: false,
  resave: false
}));

// Flash Messages Middleware
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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.get('./auth/facebook', passport.authenticate('facebook'));

// Flash Messages to Views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const surveyRouter = require('./routes/survey');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/survey', surveyRouter);

// Catch 404 and Render Custom 404 Page
app.use((req, res, next) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error', { title: 'Error' });
});


module.exports = app;

