const Comment = require("../models/comments");

const commentsController = {
  createComment: async (req, res) => {
    try {
      const { content } = req.body;
      const { postId } = req.params;
      const authorId = req.user.id;

      if (!content || content.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Comment content is required",
        });
      }

      const comment = new Comment({
        content: content.trim(),
        post: postId,
        author: authorId,
      });

      await comment.save();

      res.status(201).json({
        success: true,
        message: "Comment created successfully",
        comment: comment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating comment",
        error: error.message,
      });
    }
  },

  getCommentsByPost: async (req, res) => {
    try {
      const { postId } = req.params;

      const comments = await Comment.find({ post: postId })
        .populate("author", "username email")
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        comments: comments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching comments",
        error: error.message,
      });
    }
  },

  getCommentsByAuthor: async (req, res) => {
    try {
      const { authorId } = req.params;

      const comments = await Comment.find({ author: authorId })
        .populate("post", "title content description image")
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        comments: comments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching comments",
        error: error.message,
      });
    }
  },

  updateComment: async (req, res) => {
    try {
      const { commentId } = req.params;
      const { content } = req.body;

      if (!content || content.trim() === "") {
        return res.status(400).json({
          success: false,
          message: "Comment content is required",
        });
      }

      const comment = await Comment.findByIdAndUpdate(
        commentId,
        { content: content.trim() },
        { new: true }
      );

      if (!comment) {
        return res.status(404).json({
          success: false,
          message: "Comment not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Comment updated successfully",
        comment: comment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating comment",
        error: error.message,
      });
    }
  },
};

module.exports = commentsController;
