const mongoose = require('mongoose');

require('dotenv').config();

// MongoDB connection URL
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB using Mongoose
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// Export the Mongoose connection
module.exports = mongoose.connection;
