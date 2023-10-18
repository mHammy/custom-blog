const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
  // Configure the LocalStrategy for user authentication
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        // Find a user by username in your database
        const user = await User.findOne({ username: username });

        if (!user) return done(null, false, { message: 'Invalid username' });

        // Assuming validatePassword is an async function
        const isValidPassword = await user.validatePassword(password);
        if (!isValidPassword) {
          return done(null, false, { message: 'Invalid password' });
        }

        // Authentication successful, return the user
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  // Serialize the user object to store in the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize the user object from the session
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
