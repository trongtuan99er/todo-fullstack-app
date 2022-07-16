const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//@route  GET api/auth/test
//@desc   test the auth route
//@acess  Public
router.get("/test",(req, res) => {
  res.send("auth route working")
})

//@route  GET api/auth/register
//@desc   Create a new User
//@acess  Public
router.post("/register", async (req, res) => {
  try {
    // hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 12)
    // create new user
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name
    })
    //  save user to db
    const savedUser = await newUser.save()

    // return the new user
    return res.json(savedUser)

  } catch(err) {
    console.log(err);

    res.status(500).send(err.message)
  }
})

module.exports = router;