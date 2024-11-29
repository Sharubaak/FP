let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// Initialize Express
let app = express(); // Move this line to the top before using `app`

// Connect to MongoDB (add your connection code here)

// Set up Express session
app.use(session({
  secret: "OurSecret",
  saveUninitialized: false,
  resave: false
}));

// Initialize flash
app.use(flash());

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Create a user model instance
let userModel = require('./models/user');
let user = userModel.User;

// Serialize and deserialize the user information
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

// Routers
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// Use routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
