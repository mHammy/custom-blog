const User = require('../models/User');
const passport = require('passport');

// User registration
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();

    req.login(newUser, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error during login' });
      }
      return res.status(201).json({ message: 'Registration successful', user: newUser });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

// User login
exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Server error during login' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    req.login(user, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error during login' });
      }
      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
};

// User logout
exports.logout = (req, res) => {
  req.logout();
  res.status(200).json({ message: 'Logout successful' });
};
