const Like = require("../models/likes");

const likesController = {
  createLike: async (req, res) => {
    try {
      const { postId } = req.params;
      const authorId = req.user.id;

      const existingLike = await Like.findOne({
        author: authorId,
        post: postId,
      });

      if (existingLike) {
        return res.status(400).json({
          success: false,
          message: "You have already liked this post",
        });
      }

      const like = new Like({
        author: authorId,
        post: postId,
      });

      await like.save();

      res.status(201).json({
        success: true,
        message: "Like created successfully",
        like: like,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating like",
        error: error.message,
      });
    }
  },

  getLikesByPost: async (req, res) => {
    try {
      const { postId } = req.params;

      const likes = await Like.find({ post: postId })
        .populate("author", "username email")
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        likes: likes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching likes",
        error: error.message,
      });
    }
  },

  getLikesByAuthor: async (req, res) => {
    try {
      const { authorId } = req.params;

      const likes = await Like.find({ author: authorId })
        .populate("post", "title content description image")
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        likes: likes,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching likes",
        error: error.message,
      });
    }
  },
};

module.exports = likesController;
