const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const commentController = require('../controllers/commentController');

// Create a new comment for a specific post (authenticated users only)
router.post('/post/:postId/comments', authMiddleware.isAuthenticated, commentController.createComment);

// Get all comments for a specific post
router.get('/post/:postId/comments', commentController.getCommentsForPost);

// Update a comment by ID (authenticated users only)
router.put('/comments/:commentId', authMiddleware.isAuthenticated, commentController.updateCommentById);

// Delete a comment by ID (authenticated users only)
router.delete('/comments/:commentId', authMiddleware.isAuthenticated, commentController.deleteCommentById);

module.exports = router;
