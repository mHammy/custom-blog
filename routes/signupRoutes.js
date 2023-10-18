const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Import your User model

// Render the sign-up page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Handle user registration (POST request)
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the username is already taken
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            // Username already exists, handle this case (e.g., show an error message)
            return res.render('signup', { error: 'Username already taken' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user account
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        // Redirect the user to the login page after successful registration
        res.redirect('/login');
    } catch (error) {
        console.error('Error registering user:', error);
        // Handle the error and render an error page or return an error response
        res.status(500).send('Internal Server Error'); // Example: Send a 500 status code
    }
});

module.exports = router;
