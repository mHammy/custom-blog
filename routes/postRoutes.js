const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const postController = require('../controllers/postController');

// Create a new post (authenticated users only)
router.post('/posts', authMiddleware.isAuthenticated, postController.createPost);

// Get all posts
router.get('/posts', postController.getAllPosts);

// Get a post by ID
router.get('/posts/:postId', postController.getPostById);

// Update a post by ID (authenticated users only)
router.put('/posts/:postId', authMiddleware.isAuthenticated, postController.updatePostById);

// Delete a post by ID (authenticated users only)
router.delete('/posts/:postId', authMiddleware.isAuthenticated, postController.deletePostById);

module.exports = router;
