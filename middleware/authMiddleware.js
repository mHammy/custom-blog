module.exports = {
    // Check if the user is authenticated
    isAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) {
        // Check if the user has admin privileges (you should define this logic)
        if (req.user.isAdmin) {
          return next(); // User is authenticated as an admin, proceed to the next middleware
        } else {
          // User is authenticated but not as an admin
          res.status(403).json({ error: 'Forbidden' }); // 403 Forbidden status for non-admin users
        }
      } else {
        // User is not authenticated, respond with a 401 Unauthorized status
        res.status(401).json({ error: 'Unauthorized' });
      }
    },
    
    
  };
  