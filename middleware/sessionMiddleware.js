const session = require('express-session');

// Session configuration
const sessionConfig = {
  secret: process.env.SESSION_SECRET, // Use the SESSION_SECRET from .env
  resave: false,
  saveUninitialized: false,
  cookie: {
    // Set session timeout (in milliseconds)
    maxAge: 60 * 60 * 1000, // 1 hour (adjust as needed)
  },
};

// Initialize and use the session middleware
module.exports = session(sessionConfig);
