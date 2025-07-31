const Post = require("../models/posts");

const postsController = {
  createPost: async (req, res) => {
    try {
      const { title, content, description, image } = req.body;
      const authorId = req.user.id;

      if (!title || !content || !description || !image) {
        return res.status(400).json({
          success: false,
          message: "Title, content, description, and image are required",
        });
      }

      const post = new Post({
        title: title.trim(),
        content: content.trim(),
        description: description.trim(),
        image: image.trim(),
        author: authorId,
      });

      await post.save();

      res.status(201).json({
        success: true,
        message: "Post created successfully",
        post: post,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating post",
        error: error.message,
      });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find()
        .populate("author", "username email")
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        posts: posts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching posts",
        error: error.message,
      });
    }
  },

  getPostById: async (req, res) => {
    try {
      const { postId } = req.params;

      const post = await Post.findById(postId).populate(
        "author",
        "username email"
      );

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      res.status(200).json({
        success: true,
        post: post,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching post",
        error: error.message,
      });
    }
  },

  getPostsByAuthor: async (req, res) => {
    try {
      const { authorId } = req.params;

      const posts = await Post.find({ author: authorId })
        .populate("author", "username email")
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        posts: posts,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching posts",
        error: error.message,
      });
    }
  },

  updatePost: async (req, res) => {
    try {
      const { postId } = req.params;
      const { title, content, description, image } = req.body;

      const updateData = {};
      if (title) updateData.title = title.trim();
      if (content) updateData.content = content.trim();
      if (description) updateData.description = description.trim();
      if (image) updateData.image = image.trim();

      const post = await Post.findByIdAndUpdate(postId, updateData, {
        new: true,
      });

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Post updated successfully",
        post: post,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating post",
        error: error.message,
      });
    }
  },
};

module.exports = postsController;
