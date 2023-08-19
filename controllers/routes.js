const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');

// Render home page
router.get('/', async (req, res) => {
  try {
    res.render('home');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Render dashboard page
router.get('/dashboard', async (req, res) => {
  try {
    res.render('dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Render login page
router.get('/login', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Render register page
router.get('/register', async (req, res) => {
  try {
    res.render('register');
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Post Login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

// Post Register
router.post('/register', async (req, res) => {
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

module.exports = router;
