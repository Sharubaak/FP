var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('auth/login', {
    title: 'Welcome to SKC Surveys - Home Page',
    message: req.flash('message')  // Pass flash message
  });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { 
    title: 'Welcome to SKC Surveys - Home Page' });
});

/* GET about me page. */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'about our Survey' });
});

/* GET projects page. */
router.get('/survey', function(req, res, next) {
  res.render('survey', { title: 'Survey' });
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact Us' });
});

module.exports = router;