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

module.exports = router;
