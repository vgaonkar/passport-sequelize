const router = require('express').Router();
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
router.post('/login', async (req, res) => {
  try {
    console.log("in Login post");
    res.status(200).redirect('/dashboard');
  } catch (err) {
    res.status(500).redirect('/login');
  }
});

// Post Register
router.post('/register', async (req, res) => {
  try {
    let user = await User.create( {
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
