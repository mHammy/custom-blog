const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const commentController = require('../controllers/commentController');
const Comment = require('../models/Comment'); // Import your Comment model

// Create a new comment for a specific post (authenticated users only)
router.post('/post/:postId/comments', authMiddleware.isAuthenticated, commentController.createComment);

// Get all comments for a specific post
router.get('/post/:postId/comments', async (req, res) => {
  try {
    const postId = req.params.postId;

    // Use Mongoose to find comments that match the postId
    const comments = await Comment.find({ postId });

    // Render the 'comments' template with the retrieved comments
    res.render('comments', { comments, postId });
  } catch (error) {
    console.error('Error fetching comments:', error);
    // Handle the error and render an error page or return an error response
    res.status(500).send('Internal Server Error'); // Example: Send a 500 status code
  }
});

// Update a comment by ID (authenticated users only)
router.put('/comments/:commentId', authMiddleware.isAuthenticated, commentController.updateCommentById);

// Delete a comment by ID (authenticated users only)
router.delete('/comments/:commentId', authMiddleware.isAuthenticated, commentController.deleteCommentById);

module.exports = router;
