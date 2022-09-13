const express = require("express");
const router = express.Router();
const Posts = require("./model/post");
const Users = require("./model/user");

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find({ user: req.user });
    res.status(200).json({
      status: "Successfully fetched",
      posts: posts,
    });
  } catch (e) {
    json.status(400).res({
      status: "failed",
      message: e.message,
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const posts = await Posts.create({
      title: req.body.title,
      body: req.body.body,
      image: req.body.image,
      user: req.user,
    });
    res.status(200).json({
      status: "Successfully Created",
      posts: posts,
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const posts = await Posts.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(200).json({
      status: "Successfully Updated",
      posts: posts,
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const posts = await Posts.deleteOne({ _id: req.params.id });
    res.status(200).json({
      status: "Successfully Deleted",
    });
  } catch (e) {
    json.status(400).res({
      status: "failed",
      message: e.message,
    });
  }
});
module.exports = router;
