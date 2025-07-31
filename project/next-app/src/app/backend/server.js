require("./dbConnect");
const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my MongoDB blog lab." });
});

const postRoutes = require("./routes/postRoutes");
app.use("/api/posts", postRoutes);

const likeRoutes = require("./routes/likeRoutes");
app.use("/api/likes", likeRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const commentRoutes = require("./routes/commentRoutes");
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
