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
//GET Register Page
router.get('/register',function(req,res,next){
  if(!req.user)
  {
    res.render('auth/register',
    {
      title:'Register',
      message: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName: ''
    })
  }
  else{
    return res.redirect('/home')
  }
})
//POST Registeration
router.post('/register', function(req,res,next){
  let newUser = new User({
    username: req.body.username,
    //password: req.body.password,
    email: req.body.email,
    displayName: req.body.displayName
  })
  User.register(newUser, req.body.password,(err) => {
    if(err)
    {
      console.log("Error in inserting new User");
      if(err.name =='UserExistError')
      {
        req.flash('registerMessage',
        'Registration Error : User already Exist'
      )}
      return res.render('auth/register',
      {
        title:'Register',
        message: req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName:''
      })
    }
    else{
      return passport.authenticate('local')(req,res,()=>{
        res.redirect('/home');
      })
    }
  })
})

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
