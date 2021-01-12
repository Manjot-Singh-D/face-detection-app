const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/register", function (req, res) {
  User.find({ email: req.body.email }, async (err, foundUser) => {
    if (foundUser.length === 0) {
      const uuid = uuidv4();
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        uuid: uuid,
      });

      newUser.save();
      res.send({ valid: "success", user: uuid });
    } else {
      res.send({ valid: "User Already Registered" });
    }
  });
});
router.post("/login", (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  User.findOne({ email: email }, async (err, foundUser) => {
    if (foundUser) {
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (isMatch) {
        const payload = {
          id: foundUser.id,
          uuid: foundUser.uuid,
        };
        jwt.sign(
          payload,
          process.env.SECRET_OR_KEY,
          { expiredIn: 300 },
          (err, token) => {
            res.send({
              found: "success",
              user: foundUser.uuid,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        res.send({ found: "incorrect password" });
      }
    } else {
      res.send({ found: "user not found" });
    }
  });
});
router.get("/:uuid", (req, res) => {
  User.find({ uuid: req.params.uuid }, (err, foundUser) => {
    res.status(200).send(foundUser);
  });
});

module.exports = router;
