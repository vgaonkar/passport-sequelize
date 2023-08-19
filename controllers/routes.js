const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');
const {checkAuthenticated, checkNotAuthenticated} = require('../passport-config');

// Render home page
router.get('/', checkNotAuthenticated, async (req, res) => {
  try {
    res.render('home');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Render dashboard page
router.get('/dashboard', checkAuthenticated, async (req, res) => {
  try {
    res.render('dashboard', {user: req.user});
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Render login page
router.get('/login', checkNotAuthenticated, async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Render register page
router.get('/register', checkNotAuthenticated, async (req, res) => {
  try {
    res.render('register');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Post Login
router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

// Post Register
router.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    await User.create( {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    });
    res.status(200).redirect('/login');
  } catch (err) {
    res.status(500).redirect('/register');
  }
});

// Logout
router.delete('/logout', checkAuthenticated, (req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

module.exports = router;
