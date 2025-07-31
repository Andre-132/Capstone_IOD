const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const postsSchema = new Schema({
  title: { type: String, trim: true, required: true },
  content: { type: String, trim: true, required: true },
  description: { type: String, trim: true, required: true },
  image: { type: String, trim: true, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postsSchema);
