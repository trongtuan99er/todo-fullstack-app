const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/registerValdation")
const jwt = require("jsonwebtoken");
const requireAuth = require("../middleware/permission");

//@route  GET api/auth/test
//@desc   test the auth route
//@acess  Public
router.get("/test",(req, res) => {
  res.send("auth route working")
});

//@route  POST api/auth/register
//@desc   Create a new User
//@acess  Public
router.post("/register", async (req, res) => {
  try {
    // valdata register
    const { errors, isValid } = validateRegisterInput(req.body)
    if(!isValid) {
      return res.status(400).json(errors);
    }
    // check existing user 
    const existingEmail = await User.findOne({
      // check type of email
      email: new RegExp("^" + req.body.email + "$", "i")
    });

    if(existingEmail) {
      return res.status(400).json({error: "Email đăng ký đã tồn tại"})
    }
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

    const userReturn = { ...savedUser._doc}
    delete userReturn.password;
    // return the new user
    return res.json(userReturn)
    
  } catch(err) {
    console.log(err);

    res.status(500).send(err.message)
  }
});

//@route  POST api/auth/login
//@desc   User Login and return acess token
//@acess  Public

router.post("/login", async (req, res) => {
  try {
    // check user existing
    const user = await User.findOne({
      // check type of email
      email: new RegExp("^" + req.body.email + "$", "i")
    });

    if(!user) {
      return res.status(400).json({error: "Đăng nhập thất bại, email chưa được đăng ký!"})
    }
    // check password login 
    const passWordMatch = await bcrypt.compare(req.body.password, user.password)

    if(!passWordMatch) {
      return res.status(400).json({error: "Đăng nhập thất bại, mật khẩu sai!"})
    }

    const payload = {userId: user._id}
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d"
    })

    res.cookie("acess-token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    })

    const userToReturn = { ...user._doc };
    delete userToReturn.password;

    return res.json({
      token: token,
      user: userToReturn
    })
  } catch(err) {
    console.log(err);

    res.status(500).send(err.message)
  }
});
//@route  GET api/auth/current
//@desc   Return the currently authed user
//@acess  Private

router.get("/current",requireAuth, (req, res) => {
  if(!req.user){
    return res.status(401).send("unauthoriz ed ")
  }
  return res.json(req.user)
})
module.exports = router;