var express = require('express');
var passport = require('passport'); // Ensure Passport is required
var router = express.Router();

// GET login page
router.get('/', (req, res) => {
  if (!req.user) {
    res.render('auth/login', {
      title: 'Welcome to SKC Surveys - Home Page',
      message: req.flash('loginMessage'), // Flash message for errors
      displayName: '' // No user logged in
    });
  } else {
    res.redirect('/home'); // Redirect logged-in users
  }
});

// POST login (Authentication)
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/survey', // Redirect to survey on success
    failureRedirect: '/', // Redirect back to login on failure
    failureFlash: true // Enable flash messages for errors
  })
);

// GET Register page
router.get('/register', (req, res) => {
  res.render('auth/register', {
    title: 'Register to access our Survey',
    displayName: req.user ? req.user.displayName : ''
  });
});

// GET home page
router.get('/home', (req, res) => {
  res.render('home', {
    title: 'Welcome to SKC Surveys - Home Page',
    displayName: req.user ? req.user.displayName : '' // Include display name if user is logged in
  });
});

// GET about page
router.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Our Survey',
    displayName: req.user ? req.user.displayName : ''
  });
});

// GET surveys page
router.get('/survey', (req, res) => {
  res.render('survey', {
    title: 'Survey',
    displayName: req.user ? req.user.displayName : ''
  });
});

// GET contact page
router.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact Us',
    displayName: req.user ? req.user.displayName : ''
  });
});

// GET logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err); // Handle errors during logout
    res.redirect('/'); // Redirect to login page
  });
});

module.exports = router;
