var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

// root route
router.get('/', (req, res) => {
  res.render('landing');
});

// show regitser form
router.get('/register', (req, res) => {
  res.render('register');
});

// handle signup logic
router.post('/register', function(req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash('error', err.message);
      res.redirect('/register');
    }
    passport.authenticate('local')(req, res, function() {
      req.flash('error', 'Welcome to YelpCamp' + user.username);
      res.redirect('/campgrounds');
    });
  });
});

// show login form
router.get('/login', (req, res) => {
  res.render('login');
});

// handle login logic
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/campgrounds',
    failureRedirect: '/login'
  }),
  function(req, res) {}
);

//logout route
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Logged you out!');
  res.redirect('/campgrounds');
});

module.exports = router;
