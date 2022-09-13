const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/assignment");
const login = require("./register_login");
const express = require("express");
const app = express();
const postRoute = require("./postRoute");
const userRoute = require("./userRoute");
var jwt = require("jsonwebtoken");
const secret = "SECRET";
const Users = require("./model/user");
app.use(express.json());

app.use("/posts", async (req, res, next) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("test ")[1];
    console.log(token);

    jwt.verify(token, secret, async function (err, decoded) {
      if (err) {
        res.status(500).json({
          status: "failed",
          message: "Not Authenticated",
        });
      }
      const user = await Users.findOne({ _id: decoded.data });
      req.user = user._id;
      next();
    });
  } else {
    return res.status(500).json({
      status: "failed",
      message: "Invalid token",
    });
  }
});
app.use("/users", userRoute);
app.use("/", login);
app.use("/posts", postRoute);
app.get("*", (req, res) => {
  res.status(404).json({
    status: "Failed",
    message: "API NOT FOUND",
  });
});
app.listen(3000, () => {
  console.log("Server is running");
});
