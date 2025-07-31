const express = require("express");
const router = express.Router();
const { commentsController } = require("../controllers");

router.post("/:postId", commentsController.createComment);

router.get("/post/:postId", commentsController.getCommentsByPost);

router.get("/author/:authorId", commentsController.getCommentsByAuthor);

router.put("/:commentId", commentsController.updateComment);

module.exports = router;
