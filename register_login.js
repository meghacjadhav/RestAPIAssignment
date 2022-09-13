const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const Users = require("./model/user");
const secret = "SECRET";
const bodyparser = require("body-parser");
router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 16 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (err) {
          res.status(400).json({
            status: "failed",
            message: err.message,
          });
        }
        const userdata = await Users.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });
        res.status(200).json({
          status: "success",
          result: userdata,
        });
      });
    } catch (e) {
      res.status(400).json({
        status: "failed",
        message: e.message,
      });
    }
  }
);

router.post("/login", body("email"), body("password"), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        errors: errors.array(),
      });
    }
    const data = await Users.findOne({ email: req.body.email });
    if (!data) {
      return res.status(400).json({
        status: "failed",
        message: "User not registered",
      });
    }
    bcrypt.compare(req.body.password, data.password, (err, result) => {
      if (err) {
        return res.status(400).json({
          status: "failed",
          message: err.message,
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: data._id,
          },
          secret
        );
        res.json({
          status: "Success",
          token,
        });
      }
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});

module.exports = router;
