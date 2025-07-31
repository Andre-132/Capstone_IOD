const express = require("express");
const router = express.Router();
const { likesController } = require("../controllers");

router.post("/:postId", likesController.createLike);

router.get("/post/:postId", likesController.getLikesByPost);

router.get("/author/:authorId", likesController.getLikesByAuthor);

module.exports = router;
