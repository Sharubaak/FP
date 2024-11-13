var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { 
    title: 'Survey' });
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