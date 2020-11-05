const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")

//routes of authentication
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'user created',
            result: result
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err
          });
        })
    })
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(
      user => {
        if (!user) {
          return res.status(401).json({
            message: "Auth failed1"
          })
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password)
      })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, "My_Very_long_secert_string", { expiresIn: "1h" });
      res.status(200).json({
        token: token
      })
    })
    .catch(err => {
      console.log(err)
      return res.status(401).json({
        message: "Auth failed11",
        err: err
      })
    })
})

router.get("/", (req, res, next) => {
  User.find().then(
    User => {
      return res.status(200).json(User);
    }
  )
})

module.exports = router;
