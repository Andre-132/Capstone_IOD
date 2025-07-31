const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
});

module.exports = mongoose.model("User", usersSchema);
