const express = require("express");
const router = express.Router();
let User = require("../models/user.model");
//For authentication
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", function (req, res) {
  User.find()
    .then((users) => res.send(users))
    .catch((error) => res.status(400).send(error));
});

router.post("/signup", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const newUser = new User(req.body);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser
      .save()
      .then(() => res.status(200).send("User created succesfully!"))
      .catch((error) => res.status(400).send(error));
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in saving");
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  User.findOne({ email: email })
    .then(async (user) => {
      //If user is found, check if password provided and password inside hash matching
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        //if matching, sign a JWT token, create a payload
        const payload = {
          user: {
            id: user._id,
          },
        };
        jwt.sign(
          payload,
          process.env.JWT_STRING,
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).send({ token });
          }
        );
      } else {
        res.status(400).send("User email or password is incorrect");
      }
    })
    .catch((err) =>
      res
        .status(400)
        .send(`Error retrieving user. Password or username mismatch. : ${err}`)
    );
});

module.exports = router;
