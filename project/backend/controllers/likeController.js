const Like = require("../models/likes");

const likesController = {
  createLike: async (req, res) => {
    try {
      const { postId, authorId } = req.body;

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

  deleteLike: async (req, res) => {
    try {
      const { likeId } = req.params;
      const like = await Like.findByIdAndDelete(likeId);
      if (!like) {
        return res.status(404).json({
          success: false,
          message: "Like not found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Like deleted successfully",
        like: like,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting like",
        error: error.message,
      });
    }
  },
};

module.exports = likesController;
