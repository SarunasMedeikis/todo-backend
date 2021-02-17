const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  title: String,
  date: String,
  completed: Boolean,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
