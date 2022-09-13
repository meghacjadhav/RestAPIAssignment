const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true, unique: true },
  image: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});

const post = mongoose.model("post", postSchema);

module.exports = post;
