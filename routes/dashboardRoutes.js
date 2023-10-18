// Create a route for the dashboard page
router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
      // Render the dashboard template for authenticated users
      res.render('dashboard');
    } else {
      // Redirect unauthenticated users to the login page
      res.redirect('/login');
    }
  });

  module.exports = router;
  