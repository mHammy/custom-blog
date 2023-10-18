const express = require('express');
const router = express.Router();
const passport = require('passport');

// Render the sign-in page
router.get('/login', (req, res) => {
  res.render('signin');
});

// Handle user authentication (POST request) using Passport.js
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true 
}));

module.exports = router;
