const User = require('../models/User');

// User registration
exports.register = (req, res) => {
  // Stuff
};

// User login
exports.login = (req, res) => {
  // Stuff
};

// User logout
exports.logout = (req, res) => {
  req.logout();
  res.redirect('/');
};
