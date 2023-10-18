const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express();

// Load environment variables from a .env file using dotenv
require('dotenv').config();

// Import the database connection
const db = require('./config/database');

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Load passport configuration file (config/passport.js)
require('./config/passport')(passport);

// Routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const signupRoutes = require('./routes/signupRoutes');
const loginRoutes = require('./routes/loginRoutes');

app.use('/', signupRoutes);
app.use('/', userRoutes);
app.use('/', postRoutes);
app.use('/', commentRoutes);
app.use('/', loginRoutes);

const exphbs = require('express-handlebars');
const moment = require('moment'); 
const { login } = require('./controllers/userController');

// Create an instance of Handlebars with helpers
const hbs = exphbs.create({
  helpers: {
    formatDate: function (date) {
      return moment(date).format('MMMM D, YYYY');
    },
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Define a route handler for the root URL ("/") that renders "home.handlebars"
app.get('/', (req, res) => {
  res.render('home'); // Assumes you have a "home.handlebars" template
});


// Connect to the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
