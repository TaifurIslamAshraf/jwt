const router = require("express").Router();
const User = require("../models/users.model");
const SECRET_KEY = require("../config/config").SECRET_KEY;

const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

//register router
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (user) return res.status(401).send("user already exists");

    bcrypt.hash(password, 10, async (err, hash) => {
      const newUser = new User({
        username: username,
        password: hash,
      });
      await newUser
        .save()
        .then((user) => {
          res.status(200).send({
            success: true,
            message: "user is created",
            user: {
              id: user._id,
              username: user.username,
            },
          });
        })
        .catch((err) => {
          res.status(401).send({
            success: false,
            message: "user is not created",
            errorMessage: err.message,
          });
          console.log(err.message);
        });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      errorMessage: error.message,
    });
  }
});

//login router
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });

  if (!user) {
    return res.status(401).send("user not found");
  }
  if (!bcrypt.compare(password, user.password)) {
    return res.status(401).send("Password incorrect");
  }

  const payload = {
    id: user._id,
    username: user.username,
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "2d",
  });

  return res.status(200).send({
    success: true,
    message: "User login successfully",
    token: "Bearer " + token,
  });
});

module.exports = router;
