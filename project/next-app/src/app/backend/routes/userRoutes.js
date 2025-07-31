const express = require("express");
const router = express.Router();
const { usersController } = require("../controllers");

router.post("/", usersController.createUser);

router.get("/", usersController.getAllUsers);

router.get("/:userId", usersController.getUserById);

router.put("/:userId", usersController.updateUser);

module.exports = router;
