const express = require("express");
const router = express.Router();
const { postsController } = require("../controllers");

router.post("/", postsController.createPost);

router.get("/", postsController.getAllPosts);

router.get("/:postId", postsController.getPostById);

router.get("/author/:authorId", postsController.getPostsByAuthor);

router.put("/:postId", postsController.updatePost);

module.exports = router;
