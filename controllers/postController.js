const Post = require('../models/Post');

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, contents } = req.body;
    const newPost = new Post({
      title,
      contents,
      creator: req.user._id, // Assuming you store the user's ID in the request
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating a post' });
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ dateCreated: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching posts' });
  }
};

// Get a single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching a post' });
  }
};

// Update a post by ID
exports.updatePostById = async (req, res) => {
  try {
    const { title, contents } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, contents },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while updating a post' });
  }
};

// Delete a post by ID
exports.deletePostById = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndRemove(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.status(200).json(deletedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while deleting a post' });
  }
};
