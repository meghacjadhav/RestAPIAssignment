const express = require("express");
const User = require("./model/user");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json({
    status: "Success",
    users,
  });
});

router.put("/:id", async (req, res) => {
  try {
    console.log(req.query);
    const users = await User.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.json({
      status: "Success",
      users,
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
    const users = await User.deleteOne({ _id: req.params.id });
    res.json({
      status: "Success",
      users,
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});

module.exports = router;
