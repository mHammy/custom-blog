module.exports = {
    // Check if the user is authenticated
    isAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware
      }
      // User is not authenticated, redirect or respond with an error message
      res.status(401).json({ error: 'Unauthorized' });
    },
  
    // Add custom authorization checks if needed
    // For example, check if the user has certain roles or permissions
  };
  