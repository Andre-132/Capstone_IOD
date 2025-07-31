const User = require("../models/users");

const usersController = {
  createUser: async (req, res) => {
    try {
      const { username, email } = req.body;

      if (!username || !email) {
        return res.status(400).json({
          success: false,
          message: "Username and email are required",
        });
      }

      const user = new User({
        username: username.trim(),
        email: email.trim(),
      });

      await user.save();

      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating user",
        error: error.message,
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();

      res.status(200).json({
        success: true,
        users: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching users",
        error: error.message,
      });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        user: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching user",
        error: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const { username, email } = req.body;

      const updateData = {};
      if (username) updateData.username = username.trim();
      if (email) updateData.email = email.trim();

      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating user",
        error: error.message,
      });
    }
  },
};

module.exports = usersController;
