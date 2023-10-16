const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Create a new comment for a post
exports.createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const newComment = new Comment({
      text,
      creator: req.user._id, // Assuming you store the user's ID in the request
      post: req.params.postId, // Assuming the post ID is in the URL params
    });
    const savedComment = await newComment.save();

    // Update the associated post's comments array
    await Post.findByIdAndUpdate(req.params.postId, {
      $push: { comments: savedComment._id },
    });

    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating a comment' });
  }
};

// Get all comments for a specific post
exports.getCommentsForPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching comments' });
  }
};

// Update a comment by ID
exports.updateCommentById = async (req, res) => {
  try {
    const { text } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      { text },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while updating a comment' });
  }
};

// Delete a comment by ID
exports.deleteCommentById = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndRemove(req.params.commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Remove the comment from the associated post's comments array
    await Post.findByIdAndUpdate(req.params.postId, {
      $pull: { comments: req.params.commentId },
    });

    res.status(200).json(deletedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while deleting a comment' });
  }
};
